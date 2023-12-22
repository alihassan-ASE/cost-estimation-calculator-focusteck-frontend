"use client";
import React, { useState, useRef, useEffect } from "react";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

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

const CustomStartButton = styled(Button)(({ theme }) => ({
  width: "300px",
  margin: "0 .5em",
  height: "50px",
  backgroundColor: "#0045e6",
  padding: 0,
  fontFamily: ["Poppins", "Helvetica", "Arial", "Lucida", "sans-serif"].join(
    ","
  ),

  "&:hover": {
    backgroundColor: "#fff",
    boxShadow: "none",
    color: "#000",
    "& #start": {
      marginLeft: "30px",
      transition: "margin-left 0.2s ease-in-out",
    },
    "& svg": {
      opacity: 1,
      marginLeft: "15px",
      transition: "margin-left 0.2s ease-in-out",
      borderRadius: "0 50% 50% 0",
    },
    "&:before": {
      transform: "scale(1, 1)",
      textIndent: 0,
    },
  },

  [theme.breakpoints.down("md")]: {
    fontSize: 14,
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: 10,
    width: "160px",
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
  // const [startButton, setStartButton] = useState(true);
  // const customBoxRef = useRef(null);

  // const handleRouteChange = () => {
  //   route.push("/cost-estimation-calculator");
  //   setStartButton(false);
  // };

  const baseRoute = usePathname();
  // console.log(baseRoute);

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
            sx={{
              color: "#000",
              backgroundColor: "#fff",
              // minHeight: 55,
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

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Link
                href="/cost-estimation-calculator"
                scroll={false}
                style={{
                  textDecoration: "none",
                }}
              >
                <CustomStartButton
                  variant="contained"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <ArrowForwardIcon
                    sx={{
                      marginRight: "auto",
                      opacity:0,
                      backgroundColor: "#0045e6",
                      color: "#fff",
                      padding: "1em",
                      position: "absolute",
                      left: "-19px",
                      borderRadius: "0 50% 50% 0",
                    }}
                  />
                  <span id="start">Start</span>
                </CustomStartButton>
              </Link>
            </Box>
          </CustomBannerBox>

          {baseRoute === "/" ? null : baseRoute ===
            "/cost-estimation-calculator" ? (
            <CustomBox
              sx={{ minHeight: "100vh", display: "flex", alignItems: "center" }}
            >
              {children}
            </CustomBox>
          ) : (
            <CustomBox sx={{ minHeight: "100vh" }}>{children}</CustomBox>
          )}

          {baseRoute === "/" ? null : (
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
          )}
        </Box>
      </body>
    </html>
  );
}
