import Link from "next/link";
import React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AccountTree from "@mui/icons-material/AccountTree";
import Groups from "@mui/icons-material/Groups";
import { Box, Typography, Stack } from "@mui/material";

const LINKS = [
  {
    text: "Project",
    href: "/cost-estimation-calculator/project",
    icon: AccountTree,
  },
  { text: "Staff", href: "/cost-estimation-calculator/staff", icon: Groups },
];

const MainRoute = () => {
  return (
    <Box>
      <Typography variant="h4" style={{ textAlign: "center" }} sx={{ m: 2 }}>
        SOFTWARE DEVELOPMENT COST CALCULATOR
      </Typography>

      <Typography variant="h5" style={{ textAlign: "center" }}>
        Answer a few questions and get an immediate report
      </Typography>

      <Stack pt={5}>
        {LINKS.map(({ text, href, icon: Icon }) => (
          // <Typography variant="h6" key={href} component={Link} href={href}>
          //   <Icon />
          //   {text}
          // </Typography>
          <ListItem key={href} style={{ width: 300 }}>
            <ListItemButton color="black" component={Link} href={href}>
              <ListItemIcon>
                <Icon sx={{ p: 0 }} />
              </ListItemIcon>
              <ListItemText
                primary={text}
                primaryTypographyProps={{ sx: { color: "black" } }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </Stack>
    </Box>
  );
};
export default MainRoute;

