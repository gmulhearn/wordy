import React from 'react';
import { Box } from "@mui/material"
import { makeStyles } from "@mui/styles"
import { Route, Routes } from 'react-router';
import Main from './main/main';

const styles = {
  root: {
    width: "400px",
    height: "95vh",
    border: 1
  },
};

function App() {

  return (
    <Box display="flex" justifyContent="center">
      <Box sx={styles.root} display="flex" flexDirection="column">
        <Routes>
          <Route path="/" element={<Main />} />
        </Routes>
      </Box>
    </Box>

  );
}

export default App;
