import { colorsInfo } from "../../themes/color.themes";

const initialState = {
  colorInfo: colorsInfo.light,
};

const Theme = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default Theme;
