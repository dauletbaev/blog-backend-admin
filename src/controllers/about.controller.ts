import type { RequestHandler } from 'express';
import { sanitizeHTML } from '../utils/sanitize-html';
import { HttpError } from '../errors';
import supabase from '../utils/supabase';

const supportedLanguages = ['en', 'kaa'];

export const setAbout: RequestHandler = async (req, res, next) => {
  const { content, lang } = req.body;
  try {
    if (!content) throw new HttpError(400, 'Missing required fields');

    if (!supportedLanguages.includes(lang))
      throw new HttpError(
        400,
        `Invalid language lang must be one of ${supportedLanguages.toString()}`
      );

    const sanitezedContent = sanitizeHTML(content);

    const content_lang = lang === 'en' ? 'content_en' : 'content_kaa';

    const { error } = await supabase
      .from('about')
      .upsert({ [content_lang]: sanitezedContent })
      .eq('id', 1);

    if (error) throw new HttpError(500, error.message);

    res.status(200).json({ ok: true });
  } catch (error) {
    console.log(error);

    next(error);
  }
};

export const getAbout: RequestHandler = async (req, res, next) => {
  const { lang = 'en' } = req.query;
  try {
    const select = lang === 'en' ? 'content_en' : 'content_kaa';
    const { data, error } = await supabase
      .from('about')
      .select(select)
      .eq('id', 1);

    if (error) throw new HttpError(500, error.message);

    res.status(200).json({ content: data[0][select] });
  } catch (error) {
    next(error);
  }
};
