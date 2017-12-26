import { actions } from 'react-redux-form';

export const baseFormModel = 'forms.entry';

export function formModel(modelPath) {
  return `${baseFormModel}${modelPath}`;
}

export const intValidationWrapper = callback => (event, data) => {
  if (data.value !== '') {
    const asNum = parseInt(data.value, 10);
    callback(asNum || 0);
  }
};

export const handleDropdownChange = ({ model, dispatch }, options = {}) => (
  event,
  data,
) => dispatch(actions.change(model, event.target.innerText, options));

export function toNumParser(value) {
  return parseInt(value, 10) || '';
}

export function toFloatParser(value) {
  return parseFloat(value) || '';
}
