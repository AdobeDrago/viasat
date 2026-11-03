import optimizeImages from '../../scripts/optimize.js';

export default function decorate(block) {
  optimizeImages(block);
  block.querySelector('a')?.classList.add('button');
}
