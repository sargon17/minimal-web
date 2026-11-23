// One entry per website. Each rule hides the elements that match its selector,
// or adds its own `css` when it changes the layout instead.
// `on` is the default; the popup saves your own choice per rule.
// To add a website: add an entry here and add its URL to "matches" in manifest.json.
const SITES = {
  // X moved to a new page in November 2026: no more data-testid or r-* classes.
  // The rules use roles, labels, links, data-* attributes and X's own CSS variables (--x-*).
  x: {
    name: "X",
    hosts: ["x.com", "twitter.com"],
    rules: [
      // The menu column is the sticky block that holds [data-rail-overflow] (the links and the post button).
      { id: "logo", label: "X logo", on: true, selector: ':has(> [data-rail-overflow]) > div:has(> a[aria-label="X"][href="/home"])' },
      { id: "explore", label: "Explore link", on: false, selector: 'nav[aria-label="Primary"] a[href="/explore"]' },
      { id: "notifications", label: "Notifications link", on: false, selector: 'nav[aria-label="Primary"] a[href="/notifications"]' },
      { id: "messages", label: "Chat (messages) link", on: false, selector: 'nav[aria-label="Primary"] :is(a[href="/i/chat"], a[href="/messages"])' },
      { id: "grokNav", label: "Grok link", on: true, selector: 'nav[aria-label="Primary"] a[href="/i/grok"]' },
      { id: "premium", label: "Premium link", on: true, selector: 'nav[aria-label="Primary"] a[href="/i/premium_sign_up"]' },
      { id: "verifiedOrgs", label: "Verified Orgs link", on: true, selector: 'nav[aria-label="Primary"] a[href="/i/verified-orgs-signup"]' },
      { id: "communities", label: "Communities link", on: true, selector: 'nav[aria-label="Primary"] a[href$="/communities"]' },
      { id: "jobs", label: "Jobs link", on: true, selector: 'nav[aria-label="Primary"] a[href="/jobs"]' },
      { id: "lists", label: "Lists link", on: false, selector: 'nav[aria-label="Primary"] a[href$="/lists"]' },
      { id: "bookmarks", label: "Bookmarks link", on: false, selector: 'nav[aria-label="Primary"] a[href="/i/bookmarks"]' },
      { id: "calls", label: "Calls link", on: true, selector: 'nav[aria-label="Primary"] a[href*="/calls"]' },
      { id: "creatorStudio", label: "Creator Studio link", on: true, selector: 'nav[aria-label="Primary"] :is(a[href*="creator" i], a[href="/i/account_analytics"])' },
      { id: "postButton", label: "post button in menu", on: false, selector: 'div:has(> #sidebar-compose-post)' },
      // Home: the composer block above the timeline. Post page: the reply box inside the post.
      {
        id: "composer",
        label: "post and reply composer",
        on: true,
        selector: 'main [data-media-upload-dropzone]:has(> form), main article div:has(> [data-media-upload-dropzone] > form)',
      },
      // Only the header of the home timeline; other pages keep their tabs.
      { id: "homeTabs", label: "home tab bar (For you, Following, pinned)", on: true, selector: 'main:has([id^="urt:home"]) header[data-page-header]' },
      { id: "chatDrawer", label: "floating chat button", on: true, selector: '[data-slot="xds-dock-window"]:has(> [data-slot="xds-dock-panel"][aria-label="Chat"])' },
      // The menu sits in a page block that X caps at 1280px and centers; let the block fill the window.
      {
        id: "menuLeft",
        label: "Move the menu to the left edge",
        on: true,
        css: 'body > div:has(main) { max-width: none !important; margin-left: 0 !important; margin-right: 0 !important; }',
      },
      {
        id: "menuSmall",
        label: "Make the menu items and account smaller",
        on: true,
        css: 'nav[aria-label="Primary"] { zoom: 0.8; } :has(> [data-rail-overflow]) button[aria-label="Account menu"] { zoom: 0.65; }',
      },
      { id: "noColumnLines", label: "Remove the lines beside the timeline", on: true, css: 'body > div:has(main) main { border-left-width: 0 !important; border-right-width: 0 !important; }' },
      // X sizes the column and the timeline inside it with these two variables.
      {
        id: "wideColumn",
        label: "Make the timeline wider",
        on: true,
        css: 'body > div:has(main) { --x-main-column-width: 750px !important; } main { --x-timeline-max-width: 750px !important; }',
      },
      // X draws a divider (border-b) only after a post that is not connected to the next one in a thread.
      // Swap that divider for space, so threads stay joined and separate posts get room.
      {
        id: "postGaps",
        label: "Replace the lines between posts with space",
        on: true,
        css: 'main ul > li [data-navigation-stop].border-b { border-bottom-width: 0 !important; margin-bottom: 56px !important; }',
      },
      // The dark theme paints its background with --x-bg-primary (#000); the sticky headers mix it with transparency.
      {
        id: "softBlack",
        label: "Make the background less dark",
        on: true,
        css: '[data-theme="dark"] { --x-bg-primary: #121212 !important; } html[data-theme="dark"], html[data-theme="dark"] body { background-color: #121212 !important; }',
      },
      // Hidden but kept in the page, so the search box inside it can still show in the menu.
      // With the sidebar gone, a right margin as wide as the menu keeps the timeline in the middle of the window.
      {
        id: "sidebar",
        label: "Hide the right sidebar (trends, who to follow)",
        on: true,
        css: [
          'body > div:has(main) aside { visibility: hidden !important; position: absolute !important; width: 0 !important; height: 0 !important; }',
          'body > div:has(main) div:has(> main):has(> aside) { grid-template-columns: minmax(0, 1fr) !important; max-width: none !important; }',
          '@media (min-width: 1280px) { body > div:has(main) div:has(> main):has(> aside) { margin-right: 256px !important; } }',
        ].join(" "),
      },
      // Move the sidebar search box to the top of the menu, styled like the YouTube one.
      // CSS anchor positioning pins it to the menu links, so it also fits when the X logo shows.
      // The search page has its own box in the timeline, so the sidebar has none there.
      {
        id: "searchInMenu",
        label: "Move the search box into the menu",
        on: true,
        css: [
          // Below 1280px X shrinks the menu to icons, too narrow for the box.
          '@media (min-width: 1280px) {',
          '[data-rail-overflow] { anchor-name: --minimal-web-menu; }',
          'body:has(aside form[role="search"]) [data-rail-overflow] { padding-top: 50px !important; }',
          'aside div:has(> form[role="search"]) { visibility: visible !important; position: fixed !important; position-anchor: --minimal-web-menu; top: calc(anchor(top) + 12px) !important; left: calc(anchor(left) + 12px) !important; width: calc(anchor-size(width) - 24px) !important; z-index: 30 !important; background: transparent !important; }',
          '}',
          'aside [data-slot="xds-combobox-input-group"] { height: 32px !important; min-height: 0 !important; padding: 0 10px !important; background: rgba(255, 255, 255, 0.06) !important; border: 0 !important; border-radius: 8px !important; box-shadow: none !important; }',
          'aside [data-slot="xds-combobox-input-group"]:focus-within { background: rgba(255, 255, 255, 0.1) !important; }',
          'aside [data-slot="xds-combobox-input-group"] > svg[data-icon="icon-search"] { display: none !important; }',
          'aside [data-slot="xds-combobox-input"] { font-size: 13px !important; }',
        ].join(" "),
      },
      {
        id: "grokPosts",
        label: "Grok buttons on posts",
        on: true,
        selector: 'span:has(> button[aria-label="Explain this post"]), [data-slot="xds-dock-window"]:has(> [data-slot="xds-dock-panel"][aria-label="Grok"])',
      },
      { id: "views", label: "view counts", on: true, selector: '[role="group"] a[href$="/analytics"]' },
      {
        id: "counts",
        label: "reply, repost and like counts",
        on: false,
        selector: ["reply", "retweet", "like"]
          .map((action) => `[role="group"] [data-engagement-action="${action}"] span:has(> .x-animated-count-visual)`)
          .join(", "),
      },
    ],
  },
  youtube: {
    name: "YouTube",
    hosts: ["youtube.com"],
    rules: [
      // The menu column must shrink with the zoom (240px × 0.85), or a gap stays before the videos.
      {
        id: "menuSmall",
        label: "Make the menu items smaller",
        on: true,
        // The menu items then fill the column at 12px from each side, the same as the search bar.
        css: [
          "ytd-guide-renderer { zoom: 0.85; width: 240px !important; }",
          "ytd-app { --ytd-persistent-guide-width: 204px !important; } #guide { --app-drawer-width: 204px !important; }",
          "ytd-guide-section-renderer { padding-left: 14px !important; padding-right: 14px !important; }",
          "ytd-guide-entry-renderer, ytd-guide-collapsible-entry-renderer { width: auto !important; }",
        ].join(" "),
      },
      { id: "menuButton", label: "menu button (☰)", on: true, selector: "#masthead #start #guide-button" },
      // Places the search bar at the top of the menu and removes its inner margins so it fits 180px.
      {
        id: "searchInMenu",
        label: "Move the search bar into the menu",
        on: true,
        // Only while the menu is docked; on the watch page the search stays in the top bar.
        css: [
          "#masthead #center { position: fixed; top: 60px; left: 12px; width: 180px; height: 36px; margin: 0; }",
          "#masthead #center yt-searchbox { margin-left: 0 !important; padding: 0 !important; }",
          "#masthead #center .ytSearchboxComponentInputWrapper { flex: 1 !important; }",
          "#masthead #center .ytSearchboxComponentInputContainer { flex: 1 !important; }",
          "#masthead #center .ytSearchboxComponentInputBox { margin-left: 0 !important; }",
          "#masthead #center .ytSearchboxComponentSearchButton { width: 40px !important; }",
          "#guide-inner-content { padding-top: 48px !important; }",
        ]
          .map((rule) => `ytd-app[guide-persistent-and-visible] ${rule}`)
          .join(" "),
      },
      // Arc-like search: one soft rounded field, no border, no search button (Enter searches), smaller clear button.
      {
        id: "minimalSearch",
        label: "Make the search bar minimal",
        on: true,
        css: [
          "#masthead #center .ytSearchboxComponentInputBox { background: rgba(255, 255, 255, 0.06) !important; border: 0 !important; border-radius: 8px !important; height: 32px !important; padding: 0 10px !important; box-shadow: none !important; }",
          "#masthead #center .ytSearchboxComponentInputBox:focus-within { background: rgba(255, 255, 255, 0.1) !important; }",
          "#masthead #center .ytSearchboxComponentInput { font-size: 13px !important; }",
          "#masthead #center .ytSearchboxComponentInputContainer { align-items: center !important; }",
          "#masthead #center .ytSearchboxComponentSearchButton, #masthead #center .ytSearchboxComponentInnerSearchIcon { display: none !important; }",
          "#masthead #center .ytSearchboxComponentClearButton { width: 24px !important; height: 24px !important; }",
          "#masthead #center .ytSearchboxComponentClearButton .ytIconWrapperHost, #masthead #center .ytSearchboxComponentClearButton .yt-icon-shape { width: 16px !important; height: 16px !important; }",
        ].join(" "),
      },
      // Shrinks the top bar to the menu column and starts the page at the top.
      // Only while the menu is docked, so the watch page keeps its normal top bar.
      {
        id: "noTopBar",
        label: "Remove the empty top bar",
        on: true,
        css: [
          "ytd-app[guide-persistent-and-visible] #masthead-container { width: 204px !important; }",
          "ytd-app[guide-persistent-and-visible] ytd-page-manager { margin-top: 0 !important; }",
          "ytd-app[guide-persistent-and-visible] #frosted-glass { display: none !important; }",
          // Lines the logo up with the menu icons at 22px; the logo icon keeps 16px of space for the hidden menu button.
          "ytd-app[guide-persistent-and-visible] #masthead #start { padding-left: 6px !important; }",
          "ytd-app[guide-persistent-and-visible] #masthead #start #logo-icon { padding-left: 0 !important; }",
        ].join(" "),
      },
      // Not tested live: the test account had no members-only shelf, so this matches several badge markers.
      {
        id: "membersShelf",
        label: "members-only video shelves",
        on: true,
        selector: 'ytd-rich-section-renderer:has(.badge-style-type-members-only, [class*="members-only"], [class*="membership"], [class*="commerce"])',
      },
      { id: "subscriptions", label: "Subscriptions link", on: true, selector: 'ytd-guide-entry-renderer:has(a[href="/feed/subscriptions"])' },
      { id: "youHeading", label: '"You" heading in the menu', on: true, selector: 'ytd-guide-entry-renderer:has(a[href="/feed/you"])' },
      { id: "noMenuDividers", label: "Remove the lines in the menu", on: true, css: "ytd-guide-section-renderer { border-bottom-width: 0 !important; }" },
      // YouTube sets these variables inline on the grid; !important wins over inline styles.
      {
        id: "denseGrid",
        label: "Show 5 videos per row",
        on: true,
        css: "ytd-rich-grid-renderer { --ytd-rich-grid-items-per-row: 5 !important; --ytd-rich-grid-item-margin: 12px !important; --ytd-rich-grid-row-margin: 20px !important; }",
      },
      { id: "create", label: "Create button", on: true, selector: "#masthead #end #buttons > ytd-button-renderer" },
      { id: "voiceSearch", label: "voice search button", on: true, selector: "#voice-search-button" },
      { id: "notifications", label: "notifications bell", on: true, selector: "ytd-notification-topbar-button-renderer" },
      {
        id: "chips",
        label: "topic filter bar on Home",
        on: true,
        selector: "ytd-feed-filter-chip-bar-renderer",
      },
      // The blurred bar behind the masthead is twice as tall when the filter bar shows.
      { id: "chipsSpace", label: "Remove the space of the topic filter bar", on: true, css: "#frosted-glass.with-chipbar { height: 56px !important; }" },
      // The masthead has a transform, so `fixed` is relative to it; 100vh still reaches the window bottom.
      // The masthead must sit above the menu (z-index 2021) or the menu catches the clicks.
      {
        id: "avatarBottom",
        label: "Move the account button to the bottom left",
        on: true,
        // Only while the menu is docked; on the watch page it would cover the comments.
        css: "ytd-app[guide-persistent-and-visible] #masthead-container { z-index: 2022 !important; } ytd-app[guide-persistent-and-visible] #masthead #end ytd-topbar-menu-button-renderer { position: fixed; left: 8px; top: calc(100vh - 64px); }",
      },
      {
        id: "shorts",
        label: "all Shorts",
        on: true,
        selector: [
          "ytd-rich-section-renderer:has([is-shorts])",
          "ytd-reel-shelf-renderer",
          'grid-shelf-view-model:has(a[href^="/shorts/"])',
          'ytd-rich-item-renderer:has(a[href^="/shorts/"])',
          'ytd-video-renderer:has(a[href^="/shorts/"])',
          // The menu entry and the channel tab have no link, only an English title.
          'ytd-guide-entry-renderer:has(a[title="Shorts"])',
          'ytd-mini-guide-entry-renderer:has(a[title="Shorts"])',
          'yt-tab-shape[tab-title="Shorts"]',
        ].join(", "),
      },
      // In theater mode the chat gets its own column; give that space back to the video.
      // should-stamp-chat limits this to live pages, so other side panels (transcript) still work elsewhere.
      {
        id: "liveChat",
        label: "live chat",
        on: true,
        selector: [
          "ytd-live-chat-frame",
          "ytd-watch-flexy[should-stamp-chat][fixed-panels] #panels-full-bleed-container",
        ].join(", "),
      },
      {
        id: "liveChatSpace",
        label: "Give the live chat space to the video",
        on: true,
        css: "ytd-watch-flexy[should-stamp-chat][fixed-panels] #player-full-bleed-container { width: 100% !important; }",
      },
      { id: "moreFromYouTube", label: "More from YouTube", on: true, selector: 'ytd-guide-section-renderer:has(a[href="/premium"])' },
      { id: "explore", label: "Explore", on: true, selector: 'ytd-guide-section-renderer:has(a[href^="/feed/storefront"])' },
      { id: "reportHistory", label: "Report history", on: true, selector: 'ytd-guide-section-renderer:has(a[href="/reporthistory"])' },
      { id: "footer", label: "menu footer links", on: true, selector: "ytd-guide-renderer #footer" },
    ],
  },
};
