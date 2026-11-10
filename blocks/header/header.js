import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/**
 * loads and decorates the header
 * @param {Element} block The header block element
 */
async function inlineIcons(root) {
  await Promise.all([...root.querySelectorAll('.icon')].map(async (icon) => {
    const name = [...icon.classList].find((c) => c.startsWith('icon-'))?.slice(5);
    if (!name) return;
    const resp = await fetch(`/icons/${name}.svg`);
    if (resp.ok) icon.innerHTML = await resp.text();
  }));
}

export default async function decorate(block) {
  const navMeta = getMetadata('nav');
  const navPath = navMeta ? new URL(navMeta, window.location).pathname : '/nav';
  const fragment = await loadFragment(navPath);

  block.textContent = '';
  const nav = document.createElement('nav');
  nav.id = 'nav';
  while (fragment.firstElementChild) nav.append(fragment.firstElementChild);

  const classes = ['primary', 'secondary', 'sub'];
  classes.forEach((c, i) => {
    const section = nav.children[i];
    if (section) section.classList.add(`nav-${c}`);
  });

  nav.querySelectorAll('li > a').forEach((a) => {
    const span = document.createElement('span');
    span.append(...a.childNodes);
    a.style.setProperty('--n', span.textContent.length);
    a.append(span);
  });

  const tools = document.createElement('div');
  tools.className = 'nav-tools';
  tools.innerHTML = '<a href="https://www.viasat.com/search/" aria-label="Search"><span class="icon icon-search"></span></a>';
  nav.querySelector('.nav-secondary')?.append(tools);

  const brand = document.createElement('a');
  brand.className = 'nav-brand';
  brand.href = 'https://www.viasat.com/';
  brand.setAttribute('aria-label', 'Viasat');
  brand.innerHTML = '<span class="icon icon-viasat-logo"></span>';
  nav.querySelector('.nav-sub')?.prepend(brand);

  const wrapper = document.createElement('div');
  wrapper.className = 'nav-wrapper';
  wrapper.append(nav);
  block.append(wrapper);
  await inlineIcons(block);
}
