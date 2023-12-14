"use client";
import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import {
  BottomNavigation,
  InputBase,
  Typography,
  Toolbar,
  Box,
  Button,
  AppBar,
} from "@mui/material";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: "0" }}>
        <Box
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <AppBar
            position="static"
            sx={{ color: "#000", backgroundColor: "#fff" }}
          >
            <Toolbar>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ flexGrow: 1, color: "#0069d9", fontWeight: 500 }}
              >
                Cost Estimation Calculator
              </Typography>
              <Button
                sx={{
                  flexGrow: 1,
                  fontSize: 13,
                  display: { xs: "none", md: "none", lg: "block" },
                  my: 2,
                  color: "#000",
                }}
              >
                About Us
              </Button>
              <Button
                sx={{
                  flexGrow: 1,
                  fontSize: 13,
                  display: { xs: "none", md: "none", lg: "block" },
                  my: 2,
                  color: "#000",
                }}
              >
                Services
              </Button>
              <Button
                sx={{
                  flexGrow: 1,
                  fontSize: 13,
                  display: { xs: "none", md: "none", lg: "block" },
                  my: 2,
                  color: "#000",
                }}
              >
                Industries & Expertise
              </Button>
              <Button
                sx={{
                  flexGrow: 1,
                  fontSize: 13,
                  display: { xs: "none", md: "none", lg: "block" },
                  my: 2,
                  color: "#000",
                }}
              >
                Clients
              </Button>
              <Button
                sx={{
                  flexGrow: 1,
                  fontSize: 13,
                  display: { xs: "none", md: "none", lg: "block" },
                  my: 2,
                  color: "#000",
                }}
              >
                Blog
              </Button>
              <Button
                sx={{
                  flexGrow: 1,
                  fontSize: 13,
                  display: { xs: "none", md: "none", lg: "block" },
                  my: 2,
                  color: "#000",
                }}
              >
                Pricing
              </Button>
              <Search
                sx={{
                  display: { xs: "none", sm: "block" },
                  backgroundColor: "#dfdfdf",
                  border: "1px solid #dfdfdf",
                }}
              >
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ "aria-label": "search" }}
                />
              </Search>
            </Toolbar>
          </AppBar>
          <Box sx={{ flexGrow: 1, padding: "0 1em" }}>{children}</Box>
          <BottomNavigation
            sx={{
              flexShrink: 0,
              padding: ".5em 2em",
              boxShadow: "-3px -3px 9px rgba(0, 0, 0, 0.2)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="body1" sx={{ fontSize: 13 }}>
              © Focusteck, All rights reserved
            </Typography>
            <Box
              sx={{
                gap: "2em",
                display: { xs: "none", sm: "flex" },
              }}
            >
              <Typography variant="body1" sx={{ fontSize: 13 }}>
                Privacy Policy
              </Typography>
              <Typography variant="body1" sx={{ fontSize: 13 }}>
                Terms of use
              </Typography>
              <Typography variant="body1" sx={{ fontSize: 13 }}>
                Site Map
              </Typography>
            </Box>
          </BottomNavigation>
        </Box>
      </body>
    </html>
  );
}
