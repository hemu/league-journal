import { LOCAL_ID_PREFIX } from "../const";

export function isLocalEntry(entryId) {
  return entryId.startsWith(LOCAL_ID_PREFIX);
}
