export default function decorate(block) {
  if (!block.classList.contains('viasat')) return;
  const content = block.children[1]?.firstElementChild;
  if (!content) return;
  const [eyebrow, price, street, apt, cta, disclaimer] = [...content.querySelectorAll('p')];
  eyebrow.className = 'hero-eyebrow';
  price.className = 'hero-price';
  disclaimer.className = 'hero-disclaimer';
  const form = document.createElement('form');
  form.className = 'hero-form';
  form.setAttribute('role', 'search');
  form.addEventListener('submit', (e) => e.preventDefault());
  const field = (label, cls, required) => {
    const wrap = document.createElement('label');
    wrap.className = cls;
    const text = document.createElement('span');
    text.textContent = label.textContent;
    if (required) {
      const star = document.createElement('i');
      star.textContent = '*';
      text.append(star);
    }
    const input = document.createElement('input');
    input.type = 'text';
    wrap.append(text, input);
    return wrap;
  };
  cta.className = 'hero-cta';
  form.append(field(street, 'hero-street', true), field(apt, 'hero-apt', false), cta);
  street.remove();
  apt.remove();
  disclaimer.before(form);
}
