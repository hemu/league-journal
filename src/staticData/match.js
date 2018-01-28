export function roleToLane(role, lane) {
  if (lane.indexOf('BOT') !== -1) {
    return role === 'DUO_SUPPORT' ? 'Support' : 'Bottom';
  }
  if (lane.indexOf('MID') !== -1) {
    return 'Mid';
  }
  const lowerCasedLane = lane.toLowerCase();
  return lowerCasedLane[0].toUpperCase() + lowerCasedLane.slice(1);
}

export function isPartnerRole(targetRole, role, lane) {
  switch (targetRole) {
    case 'Top':
      return lane === 'JUNGLE';
    case 'Jungle':
      return lane === 'TOP';
    case 'Mid':
      return lane === 'JUNGLE';
    case 'Bottom':
      return lane === 'BOTTOM' && role === 'DUO_SUPPORT';
    case 'Support':
      return lane === 'BOTTOM' && (role === 'DUO' || role === 'DUO_CARRY');
    default:
      return false;
  }
}

export const seasonMap = {
  0: 'Pre-season 3',
  1: 'Season 3',
  2: 'Pre-season 2014',
  3: 'Season 2014',
  4: 'Pre-season 2015',
  5: 'Season 2015',
  6: 'Pre-season 2016',
  7: 'Season 2016',
  8: 'Pre-season 2017',
  9: 'Season 2017',
  10: 'Pre-season 2018',
  11: 'Season 2018',
};

export function getQueue(queueId) {
  switch (queueId) {
    case 400:
      return 'Normal';
    case 420:
      return 'Ranked';
    default:
      return 'Other';
  }
}

const queueMap = {
  72: 'Howling Abyss	1v1 Snowdown Showdown games',
  73: 'Howling Abyss	2v2 Snowdown Showdown games',
  75: "Summoner's Rift	6v6 Hexakill games",
  76: "Summoner's Rift	Ultra Rapid Fire games",
  78: "Summoner's Rift	Mirrored One for All",
  83: "Summoner's Rift	Co-op vs AI Ultra Rapid Fire games",
  96: 'Crystal Scar	Ascension games',
  98: 'Twisted Treeline	6v6 Hexakill games',
  100: "Butcher's Bridge	5v5 ARAM games",
  300: 'Howling Abyss	King Poro games',
  310: "Summoner's Rift	Nemesis games",
  313: "Summoner's Rift	Black Market Brawlers games",
  317: 'Crystal Scar	Definitely Not Dominion games',
  318: "Summoner's Rift	All Random URF games",
  325: "Summoner's Rift	All Random games",
  400: "Summoner's Rift	5v5 Draft Pick games",
  420: "Summoner's Rift	5v5 Ranked Solo games",
  430: "Summoner's Rift	5v5 Blind Pick games",
  440: "Summoner's Rift	5v5 Ranked Flex games",
  450: 'Howling Abyss	5v5 ARAM games',
  460: 'Twisted Treeline	3v3 Blind Pick games',
  470: 'Twisted Treeline	3v3 Ranked Flex games',
  600: "Summoner's Rift	Blood Hunt Assassin games",
  610: 'Cosmic Ruins	Dark Star games',
  800: 'Twisted Treeline	Co-op vs. AI Intermediate Bot games',
  810: 'Twisted Treeline	Co-op vs. AI Intro Bot games',
  820: 'Twisted Treeline	Co-op vs. AI Beginner Bot games',
  830: "Summoner's Rift	Co-op vs. AI Intro Bot games",
  840: "Summoner's Rift	Co-op vs. AI Beginner Bot games",
  850: "Summoner's Rift	Co-op vs. AI Intermediate Bot games",
  940: "Summoner's Rift	Nexus Siege games",
  950: "Summoner's Rift	Doom Bots games /w difficulty voting",
  960: "Summoner's Rift	Doom Bots games",
  980: 'Valoran City Park	Star Guardian Invasion: Normal games',
  990: 'Valoran City Park	Star Guardian Invasion: Onslaught games',
};
