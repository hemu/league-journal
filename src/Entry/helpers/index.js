export const baseFormModel = "forms.entry";

export function formModel(modelPath) {
  return `${baseFormModel}${modelPath}`;
}
