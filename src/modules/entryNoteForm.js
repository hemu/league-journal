import { SystemNoteTypeIds } from '../const';

export const entryNoteFormInitialState = {
  [SystemNoteTypeIds.Mistake]: [],
  [SystemNoteTypeIds.Lesson]: [{ text: '' }],
};
