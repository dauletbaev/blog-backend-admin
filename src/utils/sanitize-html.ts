import sanitize from 'sanitize-html';

export const sanitizeHTML = (html: string) =>
  sanitize(html, {
    selfClosing: [
      'img',
      'br',
      'hr',
      'area',
      'base',
      'basefont',
      'input',
      'link',
      'meta',
    ],
    allowedClasses: {},
  });
