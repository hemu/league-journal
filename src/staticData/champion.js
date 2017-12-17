import champList from "./champList";

const champMapByKey = {};
const champMapByName = {};

champList.forEach(champ => {
  champMapByKey[champ.key] = champ.name;
  champMapByName[champ.name] = champ;
});

export function getChampByKey(key) {
  return champMapByKey[key];
}

export function getChampByName(champName) {
  if (!champName || !(champName in champMapByName)) {
    return champMapByName["Aatrox"];
  }
  return champMapByName[champName];
}
