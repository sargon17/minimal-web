const root = document.getElementById("sites");

chrome.storage.sync.get(null).then((saved) => {
  for (const [key, site] of Object.entries(SITES)) {
    const settings = saved[key] ?? {};
    const fieldset = document.createElement("fieldset");
    const legend = document.createElement("legend");
    legend.textContent = `Hide on ${site.name}`;
    fieldset.append(legend);

    for (const rule of site.rules) {
      const label = document.createElement("label");
      const input = document.createElement("input");
      input.type = "checkbox";
      input.checked = settings[rule.id] ?? rule.on;
      input.addEventListener("change", () => {
        settings[rule.id] = input.checked;
        chrome.storage.sync.set({ [key]: settings });
      });
      label.append(input, rule.label);
      fieldset.append(label);
    }
    root.append(fieldset);
  }
});
