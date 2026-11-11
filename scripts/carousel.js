/**
 * Adds previous/next buttons and position dots to a horizontally scrolling track
 * @param {Element} track The scrolling list
 * @param {string} prefix Class prefix for the controls (e.g. 'news' gives news-controls)
 * @returns {Element} The controls element, to place after the track
 */
export default function carouselControls(track, prefix) {
  const items = [...track.children];
  const step = () => {
    const [first, second] = items;
    return second ? second.offsetLeft - first.offsetLeft : track.clientWidth;
  };
  const controls = document.createElement('div');
  controls.className = `${prefix}-controls`;
  const button = (cls, label, delta) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = `${prefix}-${cls}`;
    b.setAttribute('aria-label', label);
    b.addEventListener('click', () => track.scrollBy({ left: delta * step(), behavior: 'smooth' }));
    return b;
  };
  const dots = document.createElement('div');
  dots.className = `${prefix}-dots`;
  items.forEach((_, i) => {
    const d = document.createElement('span');
    if (i === 0) d.className = 'active';
    dots.append(d);
  });
  track.addEventListener('scroll', () => {
    const index = Math.round(track.scrollLeft / step());
    [...dots.children].forEach((d, i) => d.classList.toggle('active', i === index));
  }, { passive: true });
  controls.append(button('prev', 'Previous', -1), button('next', 'Next', 1), dots);
  return controls;
}
