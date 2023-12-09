import React from "react";
import { Box } from "@mui/material";

import QuestionsComponent from "@/app/components/Questions";
import ShowOption from "@/app/components/ShowOption";

const page = () => {
  return (
    <Box sx={{ margin: "2em" }}>
      <QuestionsComponent  />
      <ShowOption />
    </Box>
  );
};

export default page;
