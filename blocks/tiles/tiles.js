export default function decorate(block) {
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    const [pic, label] = row.children;
    const link = label.querySelector('a');
    const a = document.createElement('a');
    a.href = link?.href || '#';
    pic.className = 'tile-image';
    const caption = document.createElement('span');
    caption.className = 'tile-label';
    caption.textContent = link?.textContent || label.textContent;
    a.append(pic, caption);
    li.append(a);
    ul.append(li);
  });
  block.replaceChildren(ul);
}
