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
      { id: "postSpacing", label: "Add more space between posts", on: true, css: 'article[data-testid="tweet"] { padding-top: 12px !important; padding-bottom: 12px !important; }' },
      { id: "softDividers", label: "Make the lines between posts fainter", on: true, css: '[data-testid="cellInnerDiv"] > div { border-bottom-color: rgba(255, 255, 255, 0.07) !important; }' },
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
      { id: "menuSmall", label: "Make the menu items smaller", on: true, css: "ytd-guide-renderer { zoom: 0.85; }" },
      { id: "create", label: "Create button", on: true, selector: "#masthead #end #buttons > ytd-button-renderer" },
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
