# Minimal Web

A Chrome extension that hides the parts of websites you do not need.

It starts with X (Twitter). You can add more websites with a few lines.

## Install

1. Clone this repo.
2. Open `chrome://extensions` and turn on **Developer mode**.
3. Click **Load unpacked** and select the repo folder.
4. Open x.com. Click the extension icon to choose what to hide.

## How it works

- `sites.js` has one entry for each website. Each rule has a label, a CSS selector and a default.
- `content.js` hides the elements of each active rule with CSS. Changes apply at once.
- The popup shows one checkbox for each rule. Your choices sync through your Chrome account.

## Add a website

1. Add an entry to `SITES` in `sites.js`.
2. Add its URL to `content_scripts.matches` in `manifest.json`.
3. Reload the extension in `chrome://extensions`.

## Note

Websites change their markup often. If an element is not hidden, its selector is probably out of date. Pull requests are welcome.

## License

MIT
