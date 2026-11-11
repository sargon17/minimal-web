const host = location.hostname;
const entry = Object.entries(SITES).find(([, site]) =>
  site.hosts.some((h) => host === h || host.endsWith(`.${h}`))
);

if (entry) {
  const [key, site] = entry;
  const style = document.createElement("style");
  document.documentElement.append(style);

  // One CSS block per rule, so a bad selector breaks only its own rule.
  const apply = (settings = {}) => {
    style.textContent = site.rules
      .filter((rule) => settings[rule.id] ?? rule.on)
      .map((rule) => `${rule.selector} { display: none !important; }`)
      .join("\n");
  };

  apply();
  chrome.storage.sync.get(key).then((saved) => apply(saved[key]));
  chrome.storage.onChanged.addListener((changes, area) => {
    if (area === "sync" && changes[key]) apply(changes[key].newValue);
  });
}
