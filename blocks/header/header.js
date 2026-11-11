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
  // a section subnav fragment holds only that section's sub-links and replaces the default ones
  const subnavMeta = getMetadata('subnav');
  // a utility fragment adds right-aligned account links to the sub bar
  const utilityMeta = getMetadata('utility');
  const optional = (meta) => (meta ? loadFragment(new URL(meta, window.location).pathname) : null);
  const [fragment, subnav, utility] = await Promise.all([
    loadFragment(navPath),
    optional(subnavMeta),
    optional(utilityMeta),
  ]);

  block.textContent = '';
  const nav = document.createElement('nav');
  nav.id = 'nav';
  while (fragment.firstElementChild) nav.append(fragment.firstElementChild);

  const classes = ['primary', 'secondary', 'sub'];
  classes.forEach((c, i) => {
    const section = nav.children[i];
    if (section) section.classList.add(`nav-${c}`);
  });

  const subList = subnav?.querySelector('ul');
  if (subList) nav.querySelector('.nav-sub ul')?.replaceWith(subList);

  const utilityList = utility?.querySelector('ul');
  if (utilityList) {
    utilityList.className = 'nav-utility';
    nav.querySelector('.nav-sub')?.append(utilityList);
  }

  nav.querySelectorAll('li > a').forEach((a) => {
    const span = document.createElement('span');
    span.append(...a.childNodes);
    a.style.setProperty('--n', span.textContent.length);
    a.append(span);
  });

  const section = window.location.pathname.split('/')[1];
  if (section) {
    nav.querySelectorAll('.nav-primary a').forEach((a) => {
      if (new URL(a.href).pathname.split('/')[1] === section) a.setAttribute('aria-current', 'page');
    });
  }
  if (subList) block.classList.add('header-section-nav');

  const tools = document.createElement('div');
  tools.className = 'nav-tools';
  tools.innerHTML = '<a href="https://www.viasat.com/search/" aria-label="Search"><span class="icon icon-search"></span></a>';
  nav.querySelector('.nav-secondary')?.append(tools);

  const brand = document.createElement('a');
  brand.className = 'nav-brand';
  brand.href = '/';
  brand.setAttribute('aria-label', 'Viasat');
  brand.innerHTML = '<span class="icon icon-viasat-logo"></span>';
  nav.querySelector('.nav-sub')?.prepend(brand);

  const wrapper = document.createElement('div');
  wrapper.className = 'nav-wrapper';
  wrapper.append(nav);
  block.append(wrapper);
  await inlineIcons(block);
}
