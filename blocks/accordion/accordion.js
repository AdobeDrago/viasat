/**
 * Turns each two-cell row (question, answer) into a details/summary pair
 * @param {Element} block The accordion block element
 */
export default function decorate(block) {
  [...block.children].forEach((row) => {
    const [label, body] = row.children;
    const details = document.createElement('details');
    details.className = 'accordion-item';
    const summary = document.createElement('summary');
    summary.className = 'accordion-item-label';
    const text = document.createElement('span');
    text.append(...label.childNodes);
    summary.append(text);
    body.className = 'accordion-item-body';
    details.append(summary, body);
    row.replaceWith(details);
  });
}
