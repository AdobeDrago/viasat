import optimizeImages from '../../scripts/optimize.js';

export default function decorate(block) {
  optimizeImages(block);
  [...block.children].forEach((row, i) => {
    row.className = `solution ${i % 2 ? 'solution-offset' : ''}`.trim();
    const [media, body] = row.children;
    media?.classList.add('solution-image');
    body?.classList.add('solution-body');
    body?.querySelector('a')?.classList.add('button');
  });
}
