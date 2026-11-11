// One entry per website. Each rule hides the elements that match its selector.
// `on` is the default; the popup saves your own choice per rule.
// To add a website: add an entry here and add its URL to "matches" in manifest.json.
const SITES = {
  x: {
    name: "X",
    hosts: ["x.com", "twitter.com"],
    rules: [
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
      { id: "sidebar", label: "Right sidebar (trends, who to follow)", on: true, selector: '[data-testid="sidebarColumn"]' },
      { id: "grokPosts", label: "Grok buttons on posts", on: true, selector: 'button[aria-label="Grok actions"], [data-testid="GrokDrawer"]' },
      { id: "views", label: "View counts", on: true, selector: '[role="group"] a[href$="/analytics"]' },
      {
        id: "counts",
        label: "Reply, repost and like counts",
        on: false,
        selector: ["reply", "retweet", "unretweet", "like", "unlike"]
          .map((id) => `[data-testid="${id}"] [data-testid="app-text-transition-container"]`)
          .join(", "),
      },
    ],
  },
};
