import optimizeImages from '../../scripts/optimize.js';

export default function decorate(block) {
  optimizeImages(block);
  block.querySelector('picture')?.closest('p')?.classList.add('feature-card-media');
  block.querySelector('a')?.classList.add('button');
}
