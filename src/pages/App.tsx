import React from 'react';
import { Box } from "@mui/material"
import { makeStyles } from "@mui/styles"
import { Route, Routes } from 'react-router';
import Main from './main/main';

const useStyles = makeStyles((theme) => ({
  root: {
    width: "550px",
    height: "100vh"
  },
}));

function App() {
  const classes = useStyles()

  return (
    <Box display="flex" justifyContent="center">
      <Box className={classes.root} display="flex" flexDirection="column">
        <Routes>
          <Route path="/" element={<Main />} />
        </Routes>
      </Box>
    </Box>

  );
}

export default App;
