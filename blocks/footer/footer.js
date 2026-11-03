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
  footer.className = 'footer-content';
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
  if (logo) logo.innerHTML = '<span class="icon icon-viasat-logo-white"></span>';
  columns.querySelectorAll('p > strong').forEach((s) => { s.parentElement.textContent = s.textContent; });
  footer.append(columns);
  bottom?.querySelectorAll('li').forEach((li) => {
    if (li.querySelector('img')) return;
    const a = li.querySelector('a');
    const target = a || li;
    const span = document.createElement('span');
    span.append(...target.childNodes);
    target.append(span);
  });
  if (bottom) {
    const list = bottom.querySelector('ul');
    const a11y = document.createElement('li');
    a11y.className = 'footer-a11y';
    a11y.innerHTML = '<a href="https://www.essentialaccessibility.com/viasat" aria-label="Accessibility tools"><span class="icon icon-accessibility"></span></a>';
    list.append(a11y);
    const region = bottom.querySelector('p');
    const flag = document.createElement('span');
    flag.className = 'icon icon-flag-us';
    region?.prepend(flag);
    await Promise.all([...bottom.querySelectorAll('.icon')].map(async (icon) => {
      const name = [...icon.classList].find((c) => c.startsWith('icon-')).slice(5);
      const resp = await fetch(`/icons/${name}.svg`);
      if (resp.ok) icon.innerHTML = await resp.text();
    }));
    footer.append(bottom);
  }

  block.append(footer);
}
