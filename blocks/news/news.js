import optimizeImages from '../../scripts/optimize.js';
import carouselControls from '../../scripts/carousel.js';

export default function decorate(block) {
  optimizeImages(block);
  const track = document.createElement('ul');
  track.className = 'news-track';
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    const [pic, body] = row.children;
    const [cat, date, title, tags] = body.children;
    pic.className = 'news-image';
    if (cat.textContent.trim()) {
      const badge = document.createElement('span');
      badge.className = 'news-category';
      badge.textContent = cat.textContent;
      pic.append(badge);
    }
    const info = document.createElement('div');
    info.className = 'news-body';
    const time = document.createElement('p');
    time.className = 'news-date';
    time.textContent = date.textContent;
    const heading = document.createElement('div');
    heading.className = 'news-title';
    heading.append(title.querySelector('a') || title);
    const tagList = document.createElement('div');
    tagList.className = 'news-tags';
    tags.textContent.split(',').forEach((t) => {
      const s = document.createElement('span');
      s.textContent = t.trim();
      tagList.append(s);
    });
    info.append(time, heading, tagList);
    li.append(pic, info);
    track.append(li);
  });
  const controls = carouselControls(track, 'news');
  block.replaceChildren(track, controls);
}
