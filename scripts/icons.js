/**
 * Fetches each .icon's /icons/<name>.svg and inlines it, so CSS (e.g. fill: currentColor,
 * sizing) can style the icon directly. Shared by any block that uses `icon-<name>` spans.
 * @param {Element} root Element to search for `.icon` spans within
 */
export default async function inlineIcons(root) {
  await Promise.all([...root.querySelectorAll('.icon')].map(async (icon) => {
    const name = [...icon.classList].find((c) => c.startsWith('icon-'))?.slice(5);
    if (!name) return;
    const resp = await fetch(`/icons/${name}.svg`);
    if (resp.ok) icon.innerHTML = await resp.text();
  }));
}
