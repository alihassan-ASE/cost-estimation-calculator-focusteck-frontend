import * as React from "react";
import Link from "next/link";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import HomeIcon from "@mui/icons-material/Home";
import StarIcon from "@mui/icons-material/Star";
import ChecklistIcon from "@mui/icons-material/Checklist";
import AccountTree from "@mui/icons-material/AccountTree";
import Groups from "@mui/icons-material/Groups";
import SettingsIcon from "@mui/icons-material/Settings";
import SupportIcon from "@mui/icons-material/Support";
import LogoutIcon from "@mui/icons-material/Logout";
import ThemeRegistry from "@/components/ThemeRegistry/ThemeRegistry";

export const metadata = {
  title: "Next.js App Router + Material UI v5",
  description: "Next.js App Router + Material UI v5",
};

const DRAWER_WIDTH = 300;

const LINKS = [
  { text: "Home", href: "/", icon: HomeIcon },
  { text: "Project", href: "/calculator/project", icon: AccountTree },
  { text: "Staff", href: "/calculator/staff", icon: Groups },
];

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          <AppBar position="fixed" sx={{ zIndex: 2000 }}>
            <Toolbar sx={{ backgroundColor: "background.paper" }}>
              <DashboardIcon
                sx={{ color: "#444", mr: 2, transform: "translateY(-2px)" }}
              />
              <Typography variant="h6" noWrap component="div" color="black">
                Cost Estimation Calculator
              </Typography>

              {/* <Box>
                <Link href="/">
                  <Typography variant="h6" noWrap component="div" color="black">
                    <HomeIcon
                      sx={{
                        color: "#444",
                        mr: 2,
                        transform: "translateY(-2px)",
                      }}
                    />{" "}
                    Home
                  </Typography>
                </Link>
                <Typography variant="h6" noWrap component="div" color="black">
                  <Link href="/calculator/project">
                    <AccountTree
                      sx={{
                        color: "#444",
                        mr: 2,
                        transform: "translateY(-2px)",
                      }}
                    />{" "}
                    Project
                  </Link>
                </Typography>
                <Typography variant="h6" noWrap component="div" color="black">
                  <Link href="/calculator/staff">
                    <Groups
                      sx={{
                        color: "#444",
                        mr: 2,
                        transform: "translateY(-2px)",
                      }}
                    />{" "}
                    Staff
                  </Link>
                </Typography>
              </Box> */}

              {LINKS.map(({ text, href, icon: Icon }) => (
                // <Typography variant="h6" key={href} component={Link} href={href}>
                //   <Icon />
                //   {text}
                // </Typography>
                <ListItem key={href} disablePadding>
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
            </Toolbar>
          </AppBar>

          <Box
            component="main"
            sx={{
              flexGrow: 1,
              bgcolor: "background.default",
              ml: `${DRAWER_WIDTH}px`,
              mt: ["48px", "56px", "64px"],
              p: 3,
            }}
          >
            {children}
          </Box>
        </ThemeRegistry>
      </body>
    </html>
  );
}
