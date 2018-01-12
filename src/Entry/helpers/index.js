import { actions } from 'react-redux-form';

export const baseFormModel = 'forms.entry';

export function formModel(modelPath) {
  return `${baseFormModel}${modelPath}`;
}

export const handleDropdownChange = ({ model, dispatch }, options = {}) => (
  event,
  data,
) => dispatch(actions.change(model, event.target.innerText, options));

export function toNumParser(value) {
  const tryInt = parseInt(value, 10);
  return Number.isNaN(tryInt) ? value : tryInt;
}

export function toFloatParser(value) {
  const tryFloat = parseFloat(value, 10);
  return Number.isNaN(tryFloat) ? value : tryFloat;
}
