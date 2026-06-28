/* ============================================
   STREAMIFY — catalog.js
   Single source of truth for titles shown across the
   dashboard. Centralizing this means each row can pull a
   genuinely different slice instead of repeating the
   same nine posters under nine headings, and the detail
   modal can pull copy from one place instead of being
   hand-written per card.
   ============================================ */

const CATALOG = [
  {
    id: "squid", title: "Squid Game", tag: "Thriller", type: "Series",
    year: 2021, seasons: "2 Seasons", maturity: "16+",
    img: "img/squid.jpg", wide: false,
    desc: "Hundreds of cash-strapped players accept a strange invitation to compete in children's games — with deadly stakes and a massive cash prize on the line.",
  },
  {
    id: "friends", title: "Friends", tag: "Comedy", type: "Series",
    year: 1994, seasons: "10 Seasons", maturity: "13+",
    img: "img/friends.jpg", wide: false,
    desc: "Six twenty-somethings navigate love, work, and life in New York City — leaning on each other through every breakup, job change, and cup of coffee.",
  },
  {
    id: "demon", title: "Demon Slayer", tag: "Anime", type: "Series",
    year: 2019, seasons: "4 Seasons", maturity: "16+",
    img: "img/demon.jpg", wide: false,
    desc: "After his family is slaughtered and his sister turned into a demon, a young swordsman joins an order of demon slayers to find a cure and avenge his family.",
  },
  {
    id: "tvd", title: "The Vampire Diaries", tag: "Drama", type: "Series",
    year: 2009, seasons: "8 Seasons", maturity: "16+",
    img: "img/tvd.jpg", wide: false,
    desc: "A small-town teenager falls for a centuries-old vampire, pulling her into a world of vampires, witches, and werewolves fighting for control of her town.",
  },
  {
    id: "aot", title: "Attack on Titan", tag: "Anime", type: "Series",
    year: 2013, seasons: "4 Seasons", maturity: "18+",
    img: "img/aot.jpg", wide: false,
    desc: "Humanity lives walled in against man-eating giants — until a young soldier vows to wipe them all out after a titan breaches his home.",
  },
  {
    id: "harry", title: "Harry Potter", tag: "Fantasy", type: "Movie",
    year: 2001, seasons: "2h 32m", maturity: "U/A",
    img: "img/harry.jpg", wide: false,
    desc: "An orphaned boy discovers he's a wizard on his eleventh birthday and enrolls at a school of magic, where an old enemy is waiting for his return.",
  },
  {
    id: "witcher", title: "The Witcher", tag: "Fantasy", type: "Series",
    year: 2019, seasons: "3 Seasons", maturity: "16+",
    img: "img/witcher.jpg", wide: false,
    desc: "A solitary monster hunter struggles to find his place in a world where people often prove more wicked than beasts, as his destiny intertwines with a young princess.",
  },
  {
    id: "darkknight", title: "The Dark Knight", tag: "Action", type: "Movie",
    year: 2008, seasons: "2h 32m", maturity: "16+",
    img: "img/darkknight.jpg", wide: false,
    desc: "Batman raises the stakes in his war on crime, but a brilliant and chaotic new criminal emerges to plunge Gotham into anarchy.",
  },
  {
    id: "dark", title: "Dark", tag: "Sci-Fi", type: "Series",
    year: 2017, seasons: "3 Seasons", maturity: "18+",
    img: "img/dark.jpg", wide: false,
    desc: "A missing child sets four families on edge as secrets among them are unearthed, leading to a mystery that spans generations and bends time itself.",
  },
  {
    id: "squid2", title: "Squid Game 2", tag: "Thriller", type: "Series",
    year: 2024, seasons: "Final Season", maturity: "16+",
    img: "img/YourNextWatch/SquidGame2.jpg", wide: true,
    desc: "With nothing to lose, Seong Gi-hun accepts a strange invitation to compete once more — for a chance to win 45.6 billion won and finally end the games.",
  },
  {
    id: "marcos", title: "Marco's", tag: "Drama", type: "Series",
    year: 2023, seasons: "1 Season", maturity: "16+",
    img: "img/YourNextWatch/Marcos.jpg", wide: true,
    desc: "A character-driven drama following one family's struggle to hold things together when everything around them threatens to fall apart.",
  },
  {
    id: "moneyheist", title: "Money Heist", tag: "Thriller", type: "Series",
    year: 2017, seasons: "5 Parts", maturity: "16+",
    img: "img/YourNextWatch/MoneyHeist.jpg", wide: true,
    desc: "An unusual group of robbers attempt to carry out the biggest heist in recorded history — stealing 2.4 billion euros from the Royal Mint of Spain.",
  },
  {
    id: "peaky", title: "Peaky Blinders", tag: "Drama", type: "Series",
    year: 2013, seasons: "6 Seasons", maturity: "18+",
    img: "img/YourNextWatch/PeakyBlinders.jpg", wide: true,
    desc: "A notorious gang in 1919 Birmingham, England, is led by the ambitious Thomas Shelby, a crime boss set on moving up in the world by any means necessary.",
  },
  {
    id: "stranger", title: "Stranger Things", tag: "Sci-Fi", type: "Series",
    year: 2016, seasons: "4 Seasons", maturity: "16+",
    img: "img/YourNextWatch/StrangerThings.jpg", wide: true,
    desc: "When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces, and one strange little girl.",
  },
  {
    id: "boys", title: "The Boys", tag: "Action", type: "Series",
    year: 2019, seasons: "4 Seasons", maturity: "18+",
    img: "img/YourNextWatch/TheBoys.jpg", wide: true,
    desc: "A group of vigilantes set out to take down corrupt superheroes who abuse their powers, hidden behind the polished image their corporate owners sell the public.",
  },
  {
    id: "crown", title: "The Crown", tag: "Drama", type: "Series",
    year: 2016, seasons: "6 Seasons", maturity: "13+",
    img: "img/YourNextWatch/TheCrown.jpg", wide: true,
    desc: "Following the political rivalries and romance of Queen Elizabeth II's reign and the events that shaped the second half of the twentieth century.",
  },
  {
    id: "witcher2", title: "The Witcher: Season 2", tag: "Fantasy", type: "Series",
    year: 2021, seasons: "Season 2", maturity: "16+",
    img: "img/YourNextWatch/TheWitcher.jpg", wide: true,
    desc: "Convinced Yennefer's life was lost at the Battle of Sodden, Geralt of Rivia brings Princess Cirilla to the safest place he knows: his childhood home.",
  },
  {
    id: "bb", title: "Breaking Bad", tag: "Drama", type: "Series",
    year: 2008, seasons: "5 Seasons", maturity: "18+",
    img: "img/YourNextWatch/BreakingBad.jpg", wide: true,
    desc: "A struggling high school chemistry teacher turns to manufacturing methamphetamine after a cancer diagnosis, partnering with a former student to secure his family's future.",
  },
];

// Curated rows: each pulls a different slice of the catalog by tag
// or hand-picked id list, so no two rows look the same.
const DASHBOARD_ROWS = [
  { title: "Your Next Watch", filter: (m) => ["squid2", "moneyheist", "boys", "stranger", "witcher2"].includes(m.id) },
  { title: "Trending Now", filter: (m) => ["squid", "darkknight", "bb", "peaky", "dark"].includes(m.id) },
  { title: "Thrillers & Crime", filter: (m) => ["squid", "squid2", "moneyheist", "darkknight"].includes(m.id) },
  { title: "Fantasy & Adventure", filter: (m) => ["harry", "witcher", "witcher2", "demon", "aot"].includes(m.id) },
  { title: "Anime", filter: (m) => m.tag === "Anime" },
  { title: "Acclaimed Dramas", filter: (m) => ["tvd", "marcos", "peaky", "crown", "bb"].includes(m.id) },
  { title: "Sci-Fi & Mystery", filter: (m) => ["dark", "stranger", "aot"].includes(m.id) },
  { title: "Action & Adrenaline", filter: (m) => ["darkknight", "boys", "aot", "demon"].includes(m.id) },
  { title: "Comfort Watches", filter: (m) => ["friends", "tvd", "marcos"].includes(m.id) },
];