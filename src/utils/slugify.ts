import Slugify from 'slugify';

export const slugify = (text: string) =>
  Slugify(text, {
    replacement: '-',
    remove: /[*+~.()'"!:@]/g,
    lower: true,
  });
