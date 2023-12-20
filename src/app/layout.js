"use client";
import React from "react";
import { styled, alpha } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import Link from "next/link";
import { useRouter } from "next/navigation";
import SouthIcon from "@mui/icons-material/South";

import {
  BottomNavigation,
  InputBase,
  Typography,
  Toolbar,
  Box,
  Button,
  AppBar,
} from "@mui/material";

const CustomBox = styled(Box)(({ theme }) => ({
  margin: "0 2em",
  [theme.breakpoints.down("sm")]: {
    margin: "0",
  },
}));

const CustomBannerBox = styled(Box)(({ theme }) => ({
  color: "white",
  padding: "6em 3em",
  display: "flex",
  flexDirection: "column",
  gap: "2em",
  background: `linear-gradient(rgba(0,0,0,.5),rgba(0,0,0,.5),rgba(0,0,0,.5)), url('https://eleks.com/wp-content/uploads/calculator-header.jpg')`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundPosition: "center",
  [theme.breakpoints.down("sm")]: {
    padding: "4em 1em",
  },
}));
const CustomTypography = styled(Typography)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    fontSize: "3em",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "2em",
  },
}));

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
  const route = useRouter();

  return (
    <html lang="en" style={{ scrollBehavior: "smooth" }}>
      <body style={{ margin: "0" }}>
        <Box
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            scrollBehavior: "smooth",
          }}
        >
          <AppBar
            position="static"
            sx={{
              color: "#000",
              backgroundColor: "#fff",
              minHeight: 80,
              display: "flex",
              justifyContent: "center",
            }}
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
                onClick={() => route.push("/cost-estimation-calculator")}
                sx={{
                  flexGrow: 1,
                  fontSize: 13,
                  display: { xs: "none", md: "none", lg: "block" },
                  my: 2,
                  color: "#000",
                  textTransform: "capitalize",
                  fontWeight: 500,
                }}
              >
                Home
              </Button>
              <Button
                sx={{
                  flexGrow: 1,
                  fontSize: 13,
                  display: { xs: "none", md: "none", lg: "block" },
                  my: 2,
                  color: "#000",
                  textTransform: "capitalize",
                  fontWeight: 500,
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
                  textTransform: "capitalize",
                  fontWeight: 500,
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
                  textTransform: "capitalize",
                  fontWeight: 500,
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
                  textTransform: "capitalize",
                  fontWeight: 500,
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
                  textTransform: "capitalize",
                  fontWeight: 500,
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
                  textTransform: "capitalize",
                  fontWeight: 500,
                }}
              >
                Pricing
              </Button>
              <Search
                sx={{
                  display: { xs: "none", sm: "block" },
                  border: "1px solid #dfdfdf",
                  borderRadius: "2em",
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

          <CustomBannerBox>
            <CustomTypography
              variant="h3"
              style={{
                maxWidth: 800,
                "@media (max-width: 600px)": {
                  padding: "0",
                },
              }}
            >
              Estimate the cost of your Software Project
            </CustomTypography>
            <Typography sx={{ maxWidth: 600 }}>
              Answer five simple questions, and you’ll receive an instant cost
              estimation to help you get your project moving. Don't let cost
              uncertainties hold you back. Define your budget effortlessly with
              just a few clicks.
            </Typography>

            <Link
              style={{
                textDecoration: "none",
                color: "#fff",
                display: "flex",
                gap: "1em",
                alignItems: "center",
              }}
              href="#scroll-down"
            >
              <Typography
                sx={{
                  backgroundColor: "hsla(3, 1%, 0%, 0.1)",
                  padding: "1em .5em",
                }}
              >
                Take the next Step for your Project
              </Typography>
              <SouthIcon
                sx={{
                  fontSize: 20,
                  borderRadius: "50%",
                  padding: ".3em",
                  backgroundColor: "rgb(0, 69, 230)",
                  ":hover": {
                    cursor: "pointer",
                    backgroundColor: "#fff",
                    color: "#000",
                  },
                }}
              />
            </Link>
          </CustomBannerBox>

          <CustomBox
            id="scroll-down"
            sx={{
              flexGrow: 1,
              minHeight: "100vh",
            }}
          >
            {children}
          </CustomBox>
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
