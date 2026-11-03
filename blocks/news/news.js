export default function decorate(block) {
  const track = document.createElement('ul');
  track.className = 'news-track';
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    const [pic, body] = row.children;
    const [cat, date, title, tags] = [body.children[0], body.children[1], body.children[2], body.children[3]];
    pic.className = 'news-image';
    const badge = document.createElement('span');
    badge.className = 'news-category';
    badge.textContent = cat.textContent;
    pic.append(badge);
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
  const controls = document.createElement('div');
  controls.className = 'news-controls';
  const mk = (cls, label, delta) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = cls;
    b.setAttribute('aria-label', label);
    b.addEventListener('click', () => track.scrollBy({ left: delta * 392, behavior: 'smooth' }));
    return b;
  };
  const dots = document.createElement('div');
  dots.className = 'news-dots';
  [...block.children].forEach((_, i) => {
    const d = document.createElement('span');
    if (i === 0) d.className = 'active';
    dots.append(d);
  });
  controls.append(mk('news-prev', 'Previous', -1), mk('news-next', 'Next', 1), dots);
  block.replaceChildren(track, controls);
}
