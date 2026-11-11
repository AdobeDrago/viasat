import optimizeImages from '../../scripts/optimize.js';
import carouselControls from '../../scripts/carousel.js';
import inlineIcons from '../../scripts/icons.js';

/**
 * Builds one tile. The label cell supports three authoring shapes:
 * - just a link: the whole tile becomes that link (default, home/industries grid)
 * - a <p> badge followed by a link: the badge renders as a chip, whole tile is the link
 * - a plain label followed by a link whose text is an icon token (":name:"): the label
 *   stays plain text and only the icon becomes a small corner link (solutions carousel)
 * @param {Element} row The tiles block's row (picture cell, label cell)
 * @returns {Element} The <li> for this tile
 */
function buildTile(row) {
  const li = document.createElement('li');
  const [pic, body] = row.children;
  pic.className = 'tile-image';
  const link = body.querySelector('a');
  // the framework wraps loose text in <p>, including the link itself, so a badge
  // (perspectives carousel) is only present when there's a *second* paragraph before it
  const paragraphs = [...body.querySelectorAll('p')];
  const badge = paragraphs.length > 1 ? paragraphs[0] : null;
  const isIconLink = link && /^:[a-z-]+:$/.test(link.textContent.trim());

  const caption = document.createElement('span');
  caption.className = 'tile-label';
  caption.textContent = isIconLink
    ? body.textContent.trim()
    : (link?.textContent || body.textContent);

  if (isIconLink) {
    const name = link.textContent.trim().slice(1, -1);
    link.className = 'tile-arrow';
    link.textContent = '';
    const icon = document.createElement('span');
    icon.className = `icon icon-${name}`;
    link.append(icon);
    li.append(pic, caption, link);
  } else {
    const a = document.createElement('a');
    a.href = link?.href || '#';
    if (badge) {
      const chip = document.createElement('span');
      chip.className = 'tile-badge';
      chip.textContent = badge.textContent;
      a.append(chip);
    }
    a.append(pic, caption);
    li.append(a);
  }
  return li;
}

export default async function decorate(block) {
  optimizeImages(block);
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => ul.append(buildTile(row)));
  block.replaceChildren(ul);
  if (block.classList.contains('carousel')) block.append(carouselControls(ul, 'tiles'));
  await inlineIcons(block);
}
