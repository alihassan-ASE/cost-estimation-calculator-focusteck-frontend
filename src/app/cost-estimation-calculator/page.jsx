import React from "react";
import Link from "next/link";
import {
  Typography,
  Box,
  Stack,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Icon,
} from "@mui/material";
import AccountTree from "@mui/icons-material/AccountTree";
import Groups from "@mui/icons-material/Groups";

const LINKS = [
  {
    text: "Project",
    href: "/cost-estimation-calculator/project",
    icon: AccountTree,
  },
  { text: "Staff", href: "/cost-estimation-calculator/staff", icon: Groups },
];

const page = () => {
  return (
    <Box>
      <Stack pt={5}>
        {LINKS.map(({ text, href, icon: Icon }) => (
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

export default page;
