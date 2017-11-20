import champList from "./champList";

const champMap = {};
champList.forEach(champ => (champMap[champ.key] = champ.name));

export function getChampByKey(key) {
  return champMap[key];
}
