import { actions } from "react-redux-form";

export const baseFormModel = "forms.entry";

export function formModel(modelPath) {
  return `${baseFormModel}${modelPath}`;
}

export const intValidationWrapper = callback => {
  return (event, data) => {
    if (data.value !== "") {
      const asNum = parseInt(data.value, 10);
      callback(asNum ? asNum : 0);
    }
  };
};

export const handleDropdownChange = ({ model, dispatch }, options = {}) => (
  event,
  data
) => dispatch(actions.change(model, event.target.innerText, options));
