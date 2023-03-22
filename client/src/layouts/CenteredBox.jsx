import React from "react";
import { Box } from "@mui/material";

const CenteredBox = ({ children }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
      }}
    >
      {children}
    </Box>
  );
};

export default CenteredBox;
