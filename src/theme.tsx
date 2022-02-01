import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#202020",
      paper: "#303030",
    },
  },
});

export const wordleColours = {
  normal: {
    correct: "#618B55",
    nearly: "#B29F4D"
    
  },
  colourBlind: {
    correct: "#E5804A",
    nearly: "#93BEF4"
  }
}

export default theme;