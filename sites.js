// One entry per website. Each rule hides the elements that match its selector,
// or adds its own `css` when it changes the layout instead.
// `on` is the default; the popup saves your own choice per rule.
// To add a website: add an entry here and add its URL to "matches" in manifest.json.
const SITES = {
  x: {
    name: "X",
    hosts: ["x.com", "twitter.com"],
    rules: [
      { id: "logo", label: "X logo", on: true, selector: 'header h1:has(a[href="/home"])' },
      { id: "explore", label: "Explore link", on: true, selector: 'header nav a[data-testid="AppTabBar_Explore_Link"]' },
      { id: "notifications", label: "Notifications link", on: false, selector: 'header nav a[data-testid="AppTabBar_Notifications_Link"]' },
      { id: "messages", label: "Messages link", on: false, selector: 'header nav a[data-testid="AppTabBar_DirectMessage_Link"]' },
      { id: "grokNav", label: "Grok link", on: true, selector: 'header nav a[href="/i/grok"]' },
      { id: "premium", label: "Premium link", on: true, selector: 'header nav a[href="/i/premium_sign_up"], header nav a[data-testid="premium-signup-tab"]' },
      { id: "verifiedOrgs", label: "Verified Orgs link", on: true, selector: 'header nav a[href="/i/verified-orgs-signup"]' },
      { id: "communities", label: "Communities link", on: true, selector: 'header nav a[href$="/communities"]' },
      { id: "jobs", label: "Jobs link", on: true, selector: 'header nav a[href="/jobs"]' },
      { id: "lists", label: "Lists link", on: false, selector: 'header nav a[href$="/lists"]' },
      { id: "bookmarks", label: "Bookmarks link", on: false, selector: 'header nav a[href="/i/bookmarks"]' },
      { id: "calls", label: "Calls link", on: true, selector: 'header nav a[href*="/calls"]' },
      { id: "creatorStudio", label: "Creator Studio link", on: true, selector: 'header nav a[href*="creator" i], header nav a[href="/i/account_analytics"]' },
      { id: "postButton", label: "post button in menu", on: true, selector: 'header a[data-testid="SideNav_NewTweet_Button"]' },
      // The outermost block around a composer that does not also wrap the timeline or a post.
      // On a single post page the reply box shares a block with the post itself.
      { id: "composer", label: "post and reply composer", on: true, selector: '[data-testid="primaryColumn"] div:has([data-testid="tweetTextarea_0"]):not(:has(section, article))' },
      // The sticky header above the timeline. Posts can contain tab lists too, so match only direct children.
      { id: "homeTabs", label: "home tab bar (For you, Following, pinned)", on: true, selector: '[aria-label="Home timeline"] > div:has(nav [role="tablist"]):not(:has(section))' },
      { id: "chatDrawer", label: "floating chat button", on: true, selector: '[data-testid="chat-drawer-root"]' },
      // X pushes the menu to the right end of a wide header and adds a left margin; remove both.
      {
        id: "menuLeft",
        label: "Move the menu to the left edge",
        on: true,
        css: 'header[role="banner"] { align-items: flex-start !important; } header[role="banner"] > div { margin-left: 0 !important; }',
      },
      {
        id: "menuSmall",
        label: "Make the menu items and account smaller",
        on: true,
        css: 'header[role="banner"] nav { zoom: 0.8; } header[role="banner"] [data-testid="SideNav_AccountSwitcher_Button"] { zoom: 0.65; }',
      },
      { id: "noColumnLines", label: "Remove the lines beside the timeline", on: true, css: '[data-testid="primaryColumn"] { border-left-width: 0 !important; border-right-width: 0 !important; }' },
      // r-1ye8kvj is the class X uses to cap the timeline content at 600px.
      {
        id: "wideColumn",
        label: "Make the timeline wider",
        on: true,
        css: '[data-testid="primaryColumn"], [data-testid="primaryColumn"] .r-1ye8kvj { max-width: 750px !important; }',
      },
      // X draws a divider (r-qklmqi) only after a post that is not connected to the next one in a thread.
      // Swap that divider for space, so threads stay joined and separate posts get room.
      {
        id: "postGaps",
        label: "Replace the lines between posts with space",
        on: true,
        css: '[data-testid="cellInnerDiv"] > .r-qklmqi { border-bottom-width: 0 !important; padding-bottom: 32px !important; }',
      },
      // In the "Lights out" theme X uses r-kemksi for black and r-5zmot for the see-through sticky headers.
      {
        id: "softBlack",
        label: "Make the background less dark",
        on: true,
        css: 'body, .r-kemksi { background-color: #121212 !important; } .r-5zmot { background-color: rgba(18, 18, 18, 0.65) !important; }',
      },
      { id: "sidebar", label: "right sidebar (trends, who to follow)", on: true, selector: '[data-testid="sidebarColumn"]' },
      { id: "grokPosts", label: "Grok buttons on posts", on: true, selector: 'button[aria-label="Grok actions"], [data-testid="GrokDrawer"]' },
      { id: "views", label: "view counts", on: true, selector: '[role="group"] a[href$="/analytics"]' },
      {
        id: "counts",
        label: "reply, repost and like counts",
        on: false,
        selector: ["reply", "retweet", "unretweet", "like", "unlike"]
          .map((id) => `[data-testid="${id}"] [data-testid="app-text-transition-container"]`)
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
        css: "ytd-guide-renderer { zoom: 0.85; } ytd-app { --ytd-persistent-guide-width: 204px !important; } #guide { --app-drawer-width: 204px !important; }",
      },
      // Places the search bar at the top of the menu and removes its inner margins so it fits 180px.
      {
        id: "searchInMenu",
        label: "Move the search bar into the menu",
        on: true,
        css: [
          "#masthead #center { position: fixed; top: 60px; left: 12px; width: 180px; height: 36px; margin: 0; }",
          "#masthead #center yt-searchbox { margin-left: 0 !important; }",
          "#masthead #center .ytSearchboxComponentInputWrapper, #masthead #center .ytSearchboxComponentInputContainer { flex: 1 !important; }",
          "#masthead #center .ytSearchboxComponentInputBox { margin-left: 0 !important; }",
          "#masthead #center .ytSearchboxComponentSearchButton { width: 40px !important; }",
          "#guide-inner-content { padding-top: 48px !important; }",
        ].join(" "),
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
        css: "#masthead-container { z-index: 2022 !important; } #masthead #end ytd-topbar-menu-button-renderer { position: fixed; left: 20px; top: calc(100vh - 64px); }",
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
      { id: "moreFromYouTube", label: "More from YouTube", on: true, selector: 'ytd-guide-section-renderer:has(a[href="/premium"])' },
      { id: "explore", label: "Explore", on: true, selector: 'ytd-guide-section-renderer:has(a[href^="/feed/storefront"])' },
      { id: "reportHistory", label: "Report history", on: true, selector: 'ytd-guide-section-renderer:has(a[href="/reporthistory"])' },
      { id: "footer", label: "menu footer links", on: true, selector: "ytd-guide-renderer #footer" },
    ],
  },
};
