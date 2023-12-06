import * as React from "react";
import Link from "next/link";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import HomeIcon from "@mui/icons-material/Home";
import AccountTree from "@mui/icons-material/AccountTree";
import Groups from "@mui/icons-material/Groups";

export const metadata = {
  title: "Next.js App Router + Material UI v5",
  description: "Next.js App Router + Material UI v5",
};


const LINKS = [
  { text: "Home", href: "/", icon: HomeIcon },
  {
    text: "Project",
    href: "/cost-estimation-calculator/project",
    icon: AccountTree,
  },
  { text: "Staff", href: "/cost-estimation-calculator/staff", icon: Groups },
];

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            bgcolor: "background.default",
            p: 3,
          }}
        >
          {children}
        </Box>
      </body>
    </html>
  );
}
