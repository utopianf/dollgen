import { createStitches } from "@stitches/react";

export const { styled } = createStitches({
  theme: {
    colors: {
      default: "#FFFFFF",
      basicblack: "#022222",
      darkgray: "#464646",
      lightgray: "#B1B1B1",
      superlightgray: "#D5D5D5",
      ultralightgray: "#FAFAFA",
      red: "#FF7C65",
      yellow: "#F8E750",
      green: "#BCE92A",
    },
    fontSizes: {
      lg: "18px",
      md: "16px",
      sm: "14px",
    },
    lineHeights: {
      lg: "22px",
      md: "16px",
      sm: "17px",
    },
  },
});
