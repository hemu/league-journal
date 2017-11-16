export const intValidationWrapper = callback => {
  return (event, data) => {
    if (data.value !== "") {
      const asNum = parseInt(data.value, 10);
      callback(asNum ? asNum : 0);
    }
  };
};
