import type { RequestHandler } from 'express';
import { HttpError } from '../errors';
import supabase from '../utils/supabase';
import { slugify } from '../utils/slugify';
import { sanitizeHTML } from '../utils/sanitize-html';

export const getPosts: RequestHandler = async (req, res, next) => {
  try {
    const { limit = 10, offset = 0 } = req.query;

    const { count: postsTotal } = await supabase
      .from('posts')
      .select('*', { count: 'exact' });

    const { data, error } = await supabase
      .from('posts')
      .select()
      .order('created_at', { ascending: true })
      .range(Number(offset), Number(limit));

    if (error) throw new HttpError(500, error.message);

    res.json({ posts: data, total: postsTotal });
  } catch (error) {
    next(error);
  }
};

export const getPostById: RequestHandler = async (req, res, next) => {
  const { slug } = req.params;

  try {
    if (!slug) throw new HttpError(400, 'Missing slug.');

    const { data, error } = await supabase
      .from('posts')
      .select()
      .eq('slug', slug);

    if (error) throw new HttpError(500, error.message);

    if (!data.length) throw new HttpError(404, 'Post not found.');

    res.json({ ...data[0] });
  } catch (error) {
    next(error);
  }
};

export const createPost: RequestHandler = async (req, res, next) => {
  try {
    if (!req.body.title || !req.body.content)
      throw new HttpError(400, 'Missing title or content.');

    const title = req.body.title.trim();
    const content = sanitizeHTML(req.body.content);

    const slug = slugify(title);
    const excerpt = content.substring(0, 120).trim();

    const { data, error } = await supabase
      .from('posts')
      .insert([{ title, slug, excerpt, content }]);

    if (error) throw new HttpError(500, error.message);

    res.json({ ...data[0] });
  } catch (error) {
    next(error);
  }
};

export const putPost: RequestHandler = async (req, res, next) => {
  try {
    if (!req.body.title || !req.body.content || !req.params.slug)
      throw new HttpError(400, 'Missing title, content or slug.');

    const title = req.body.title.trim();
    const content = sanitizeHTML(req.body.content);

    const slug = slugify(title);
    const excerpt = content.substring(0, 120).trim();

    const { data, error } = await supabase
      .from('posts')
      .update({ title, slug, excerpt, content })
      .match({ slug: req.params.slug });

    if (error) throw new HttpError(500, error.message);

    res.json({ ...data[0] });
  } catch (error) {
    next(error);
  }
};

export const patchPost: RequestHandler = async (req, res, next) => {
  try {
    if (!req.params.slug) throw new HttpError(400, 'Missing slug.');

    const preparedData = {
      title: req.body.title,
      content: req.body.content,
      slug: '',
      excerpt: '',
    };

    if (!req.body.title) {
      Reflect.deleteProperty(preparedData, 'title');
      Reflect.deleteProperty(preparedData, 'slug');
    }

    if (!req.body.content) {
      Reflect.deleteProperty(preparedData, 'content');
      Reflect.deleteProperty(preparedData, 'excerpt');
    }

    if (Reflect.has(preparedData, 'title')) {
      preparedData.title = preparedData.title.trim();
      preparedData.slug = slugify(preparedData.title);
    }

    if (Reflect.has(preparedData, 'content')) {
      preparedData.content = sanitizeHTML(preparedData.content);
      preparedData.excerpt = preparedData.content.substring(0, 120).trim();
    }

    const { data, error } = await supabase
      .from('posts')
      .update(preparedData)
      .match({ slug: req.params.slug });

    if (error) throw new HttpError(500, error.message);

    res.json({ ...data[0] });
  } catch (error) {
    next(error);
  }
};

export const deletePost: RequestHandler = async (req, res, next) => {
  try {
    if (!req.params.slug) throw new HttpError(400, 'Missing slug.');

    const { data, error } = await supabase
      .from('posts')
      .delete()
      .match({ slug: req.params.slug });

    if (error) throw new HttpError(500, error.message);

    res.json({ ...data[0] });
  } catch (error) {
    next(error);
  }
};
