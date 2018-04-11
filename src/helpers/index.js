import { LOCAL_ID_PREFIX } from '../const';

export function isLocalId(id) {
  return id === LOCAL_ID_PREFIX;
}

export function isLocalEntry(entryId) {
  return entryId.startsWith(LOCAL_ID_PREFIX);
}

