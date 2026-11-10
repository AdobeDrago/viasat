import { createOptimizedPicture } from './aem.js';

/**
 * Replaces each plain picture in a block with responsive renditions
 * @param {Element} block The block element
 */
export default function optimizeImages(block) {
  block.querySelectorAll('picture > img').forEach((img) => {
    const { src, alt } = img;
    if (!src || src.startsWith('about:')) return;
    const { width, height } = img;
    const pic = createOptimizedPicture(src, alt, false, [{ media: '(min-width: 600px)', width: '2000' }, { width: '750' }]);
    const next = pic.querySelector('img');
    if (width && height) {
      next.width = width;
      next.height = height;
    }
    img.closest('picture').replaceWith(pic);
  });
}
