import championList from "./championList";

export const rankOptions = [
  "Bronze",
  "Silver",
  "Gold",
  "Platinum",
  "Diamond"
].reduce((r, a) => {
  return r.concat(
    ...["5", "4", "3", "2", "1"].map(division => ({
      key: `${a[0]}${division}`,
      text: `${a} ${division}`,
      value: `${a} ${division}`
    }))
  );
}, []);

export const outcomeOptions = [
  {
    text: "W",
    value: "W"
  },
  {
    text: "L",
    value: "L"
  }
];

export const roleOptions = [
  {
    text: "Top",
    value: "Top"
  },
  {
    text: "Jungle",
    value: "Jungle"
  },
  {
    text: "Mid",
    value: "Mid"
  },
  {
    text: "Bottom",
    value: "Bottom"
  },
  {
    text: "Support",
    value: "Support"
  }
];

export const champOptions = championList.map(champ => ({
  text: champ.name,
  value: champ.name
  // image: champ.img
}));
