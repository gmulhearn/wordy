import React from 'react';
import { Box } from "@mui/material"
import { Route, Routes } from 'react-router';
import Main from './main/main';

const styles = {
  root: {
    width: "400px",
    minHeight: "90vh",
    // border: 1
  },
};

function App() {

  return (
    <Box sx={{ minHeight: "100%" }} display="flex" justifyContent="center">
      <Box sx={styles.root} display="flex" flexDirection="column">
        <Routes>
          <Route path="/" element={<Main />} />
        </Routes>
      </Box>
    </Box>

  );
}

export default App;
