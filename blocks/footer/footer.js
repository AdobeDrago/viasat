import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  const footerMeta = getMetadata('footer');
  const footerPath = footerMeta ? new URL(footerMeta, window.location).pathname : '/footer';
  const fragment = await loadFragment(footerPath);

  block.textContent = '';
  const footer = document.createElement('div');
  footer.className = 'footer';
  while (fragment.firstElementChild) footer.append(fragment.firstElementChild);

  const [social, ...rest] = footer.children;
  social?.classList.add('footer-social');
  social?.querySelectorAll('.icon').forEach((icon) => {
    const name = [...icon.classList].find((c) => c.startsWith('icon-'))?.slice(5);
    if (name) icon.innerHTML = `<img src="/icons/${name}.svg" alt="" loading="lazy">`;
  });

  const bottom = rest.pop();
  const columns = document.createElement('div');
  columns.className = 'footer-columns';
  rest.forEach((c) => {
    c.classList.add('footer-col');
    columns.append(c);
  });
  columns.querySelectorAll('.footer-col').forEach((c) => { c.style.position = 'static'; c.style.flex = '0 0 auto'; });
  bottom?.classList.add('footer-bottom');
  const logo = bottom?.querySelector('li a');
  if (logo) logo.innerHTML = '<img src="/icons/viasat-logo-white.svg" alt="Viasat" width="90" height="30">';
  footer.append(columns);
  if (bottom) footer.append(bottom);

  block.append(footer);
}
