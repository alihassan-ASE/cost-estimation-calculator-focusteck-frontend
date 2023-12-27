"use client";
import React, { useState, useRef, useEffect } from "react";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import MenuIcon from "@mui/icons-material/Menu";

import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";

import {
  BottomNavigation,
  InputBase,
  Typography,
  Toolbar,
  Box,
  Button,
  AppBar,
  useMediaQuery,
} from "@mui/material";
import { baseUrl } from "@/config/constants";
import { minWidth } from "@mui/system";

const CustomBox = styled(Box)(({ theme }) => ({
  // margin: "0 2em",
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
  minHeight: "60vh",
  [theme.breakpoints.down("sm")]: {
    padding: "4em 1em",
    height: "60vh",
  },
  [theme.breakpoints.up("lg")]: {
    height: "88vh",
  },
  [theme.breakpoints.down("lg")]: {
    minHeight: "70vh",
  },
  [theme.breakpoints.down("md")]: {
    height: "60vh",
  },
  [theme.breakpoints.down("sm")]: {
    height: "60vh",
  },
  // [theme.breakpoints.down("sm")]: {
  //   padding: "4em 1em",
  // },
}));

const CustomTypography = styled(Typography)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    fontSize: "3em",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "2em",
  },
}));

const CustomNavbarButton = styled(Link)(({ theme }) => ({
  color: "#000",
  textTransform: "none",
  fontSize: "1em",
  textDecoration: "none",
  lineHeight: 1.5,
  fontWeight: 300,
  fontFamily: ["Poppins", "Helvetica", "Arial", "Lucida", "sans-serif"].join(
    ","
  ),
  position: "relative",
  overflow: "hidden",
  transition: "border-bottom-width 0.5s ease-out",

  "&::after": {
    content: "''",
    position: "absolute",
    left: 0,
    bottom: 0,
    width: 0,
    height: 2,
    backgroundColor: "#005DBD",
    transition: "width 0.5s ease-out",
  },

  "&:hover::after": {
    width: "100%",
  },
}));

const CustomBottomHeading = styled(Typography)(({ theme }) => ({
  color: "#005DBD",
  lineHeight: 1.5,
  fontWeight: "bold",
  fontSize: "15px",
  padding: ".5em 0",
  margin: ".5em 0",
  borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
  transition: "all 0.25s ease-in-out 0.25s",
  fontFamily: ["Poppins", "Helvetica", "Arial", "Lucida", "sans-serif"].join(
    ","
  ),
  "&:hover": {
    borderBottomColor: "#FBCA16",
  },
}));

const CustomBottomLink = styled(Link)(({ theme }) => ({
  color: "#2E2E2E",
  textTransform: "none",
  fontSize: "14px",
  textDecoration: "none",
  lineHeight: 1.5,
  width: "max-content",
  fontWeight: 300,
  fontFamily: ["Poppins", "Helvetica", "Arial", "Lucida", "sans-serif"].join(
    ","
  ),
  position: "relative",
  overflow: "hidden",
  transition: "border-bottom-width 0.5s ease-out",

  "&::after": {
    content: "''",
    position: "absolute",
    left: 0,
    bottom: 0,
    width: 0,
    height: 2,
    backgroundColor: "#005DBD",
    transition: "width 0.5s ease-out",
  },

  "&:hover::after": {
    width: "100%",
  },
}));

const CustomFooterTypography = styled(Typography)(({ theme }) => ({
  fontSize: 18,
  color: "#7d7d7d",
  fontWeight: "500",
  padding: 0,
  margin: 0,
  textAlign: "center",
  [theme.breakpoints.down("md")]: {
    fontSize: 14,
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: 10,
  },
}));

const CustomAppBar = styled(Box)(({ theme }) => ({
  color: "#000",
  backgroundColor: "#fff",
  display: "flex",
  justifyContent: "center",
  padding: "0 3em",
  [theme.breakpoints.down("md")]: {
    padding: "0 1em",
    gap: "5em",
    justifyContent: "center",
  },
  [theme.breakpoints.down("sm")]: {
    padding: "0 .5em",
    gap: "2em",
    justifyContent: "center",
  },
}));

const CustomToolBar = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "3em",
  [theme.breakpoints.down("md")]: {
    gap: "10em",
  },
  [theme.breakpoints.down("sm")]: {
    gap: "3em",
  },
}));

export default function RootLayout({ children }) {
  const isNarrowScreen = useMediaQuery("(max-width:900px)");
  const [hamburgerClicked, setHamburgerClicked] = useState(false);
  const route = useRouter();

  const baseRoute = usePathname();
  const handleNavBar = () => {
    setHamburgerClicked(!hamburgerClicked);
  };
  // const isRoot = baseRoute === "/";
  // const isEstimationPage = baseRoute.startsWith("/cost-estimation-calculator");

  // const href = isRoot
  //   ? "/cost-estimation-calculator"
  //   : isEstimationPage
  //   ? "#scroll-down"
  //   : "/cost-estimation-calculator";

  const href = "/cost-estimation-calculator";

  return (
    <html lang="en" style={{ scrollBehavior: "smooth" }}>
      <body style={{ margin: "0" }}>
        <Box
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            margin: 0
          }}
        >
          <CustomAppBar position="static">
            <CustomToolBar>
              <Button
                sx={{
                  background: `url('https://focusteck.com/wp-content/uploads/2022/03/focusteck-logo.svg')`,
                  backgroundRepeat: "no-repeat",
                  width: 157,
                  height: 43,
                  "&:hover": {
                    backgroundColor: "#fff",
                  },
                }}
              ></Button>

              <Box sx={{ display: "flex", gap: "1.5em" }}>
                <CustomNavbarButton
                  href="#"
                  onClick={() => route.push("/cost-estimation-calculator")}
                  sx={{
                    flexGrow: 1,
                    display: { xs: "none", md: "block", lg: "block" },
                    my: 2,
                    color: "#000",
                    textTransform: "capitalize",
                  }}
                >
                  Services
                </CustomNavbarButton>
                <CustomNavbarButton
                  href="#"
                  sx={{
                    flexGrow: 1,
                    display: { xs: "none", md: "block", lg: "block" },
                    my: 2,
                    color: "#000",
                    textTransform: "capitalize",
                  }}
                >
                  Engagement Model
                </CustomNavbarButton>
                <CustomNavbarButton
                  href="#"
                  sx={{
                    flexGrow: 1,
                    display: { xs: "none", md: "block", lg: "block" },
                    my: 2,
                    color: "#000",
                    textTransform: "capitalize",
                  }}
                >
                  Success Stories
                </CustomNavbarButton>
                <CustomNavbarButton
                  href="#"
                  sx={{
                    flexGrow: 1,
                    display: { xs: "none", md: "block", lg: "block" },
                    my: 2,
                    color: "#000",
                    textTransform: "capitalize",
                  }}
                >
                  Careers
                </CustomNavbarButton>
                <CustomNavbarButton
                  href="#"
                  sx={{
                    flexGrow: 1,
                    display: { xs: "none", md: "block", lg: "block" },
                    my: 2,
                    color: "#000",
                    textTransform: "capitalize",
                  }}
                >
                  About Us
                </CustomNavbarButton>
                <CustomNavbarButton
                  href="#"
                  sx={{
                    flexGrow: 1,
                    display: { xs: "none", md: "block", lg: "block" },
                    my: 2,
                    color: "#000",
                    textTransform: "capitalize",
                  }}
                >
                  Blog
                </CustomNavbarButton>
              </Box>
              <Button
                sx={{
                  display: { xs: "none", md: "none", lg: "block" },
                  my: 2,
                  padding: ".2em 1em",
                  fontSize: "15px",
                  color: "#fff",
                  textTransform: "capitalize",
                  fontWeight: 700,
                  backgroundColor: "#005DBD",
                  border: "1px solid #005DBD",
                  letterSpacing: "1.5px",
                  "&:hover": {
                    color: "#000",
                    backgroundColor: "#fff",
                    border: "1px solid #000",
                  },
                }}
              >
                Contact Us
              </Button>

              <MenuIcon
                onClick={handleNavBar}
                sx={{
                  color: "#005DBD",
                  display: { xs: "block", md: "none", lg: "none" },
                  marginLeft: "auto",
                  transform: hamburgerClicked
                    ? "rotate(180deg)"
                    : "rotate(0deg)",
                  transition: hamburgerClicked ? "transform .4s ease" : null,
                }}
              />
            </CustomToolBar>
          </CustomAppBar>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "1em",
              position: "absolute",
              backgroundColor: "#fff",
              left: 0,
              right: 0,
              top: 42,
              zIndex: 1,
              margin: "auto",
              maxWidth: 500,
              visibility:
                hamburgerClicked && isNarrowScreen ? "visible" : "hidden",
              opacity: hamburgerClicked && isNarrowScreen ? 1 : 0,
              maxHeight: hamburgerClicked && isNarrowScreen ? "1000px" : "0",
              overflow: "hidden",
              transition: "opacity 0.5s ease-out, max-height 0.7s ease-out",
            }}
          >
            <CustomNavbarButton
              href="#"
              onClick={() => route.push("/cost-estimation-calculator")}
              sx={{
                flexGrow: 1,
                my: 2,
                color: "#000",
                textTransform: "capitalize",
              }}
            >
              Services
            </CustomNavbarButton>
            <CustomNavbarButton
              href="#"
              sx={{
                flexGrow: 1,
                my: 2,
                color: "#000",
                textTransform: "capitalize",
              }}
            >
              Engagement Model
            </CustomNavbarButton>
            <CustomNavbarButton
              href="#"
              sx={{
                flexGrow: 1,
                my: 2,
                color: "#000",
                textTransform: "capitalize",
              }}
            >
              Success Stories
            </CustomNavbarButton>
            <CustomNavbarButton
              href="#"
              sx={{
                flexGrow: 1,
                my: 2,
                color: "#000",
                textTransform: "capitalize",
              }}
            >
              Careers
            </CustomNavbarButton>
            <CustomNavbarButton
              href="#"
              sx={{
                flexGrow: 1,
                my: 2,
                color: "#000",
                textTransform: "capitalize",
              }}
            >
              About Us
            </CustomNavbarButton>
            <CustomNavbarButton
              href="#"
              sx={{
                flexGrow: 1,
                my: 2,
                color: "#000",
                textTransform: "capitalize",
              }}
            >
              Blog
            </CustomNavbarButton>
          </Box>

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
                href={href}
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
                      opacity: 0,
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
              id="scroll-down"
              sx={{ minHeight: "100vh", display: "flex", alignItems: "center" }}
            >
              {children}
            </CustomBox>
          ) : (
            <CustomBox id="scroll-down" sx={{ minHeight: "100vh" }}>
              {children}
            </CustomBox>
          )}

          {baseRoute === "/" ? null : (
            <>
              {!isNarrowScreen ? (
                <BottomNavigation
                  sx={{
                    height: "max-content",
                    display: "flex",
                    padding: "3em 1em",
                    justifyContent: "space-evenly",
                    borderTop: "1px solid rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: ".5em",
                    }}
                  >
                    <Button
                      sx={{
                        background: `url('https://focusteck.com/wp-content/uploads/2022/03/focusteck-logo.svg')`,
                        backgroundRepeat: "no-repeat",
                        width: "120px",
                        height: "47px",
                        "&:hover": {
                          backgroundColor: "#fff",
                        },
                      }}
                    ></Button>
                    <Typography
                      variant="body1"
                      sx={{ fontSize: "18px", color: "#00000099" }}
                    >
                      Drops us a line 🙂
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ color: "#005DBD", fontWeight: "bold" }}
                    >
                      services@focusteck.com
                    </Typography>
                    <Box sx={{ display: "flex", gap: ".5em" }}>
                      <FacebookIcon sx={{ color: "#767676" }} />
                      <InstagramIcon sx={{ color: "#767676" }} />
                      <LinkedInIcon sx={{ color: "#767676" }} />
                      <TwitterIcon sx={{ color: "#767676" }} />
                    </Box>
                    <img
                      style={{
                        background: `url('https://focusteck.com/wp-content/uploads/2023/09/Aws_certificate-480x480.png')`,
                        backgroundSize: "cover",
                        width: "102px",
                        height: "102px",
                        border: "0 solid #fff",
                      }}
                    />
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "1em",
                    }}
                  >
                    <Box>
                      <CustomBottomHeading variant="h6">
                        COMPANY
                      </CustomBottomHeading>
                      <Box sx={{ display: "flex", flexDirection: "column" }}>
                        <CustomBottomLink href="#">About Us</CustomBottomLink>
                        <CustomBottomLink href="#">
                          Success Stories
                        </CustomBottomLink>
                        <CustomBottomLink href="#">Blogs</CustomBottomLink>
                        <CustomBottomLink href="#">Careers</CustomBottomLink>
                      </Box>
                    </Box>
                    <Box>
                      <CustomBottomHeading variant="h6">
                        LOCATION
                      </CustomBottomHeading>
                      <Box sx={{ display: "flex", flexDirection: "column" }}>
                        <CustomBottomLink href="#">
                          Leesburg, Virginia
                        </CustomBottomLink>
                        <CustomBottomLink href="#">
                          +1 571 577 4513
                        </CustomBottomLink>
                        <CustomBottomLink href="#">
                          Lahore, Pakistan
                        </CustomBottomLink>
                        <CustomBottomLink href="#">
                          +92 42 37870173
                        </CustomBottomLink>
                      </Box>
                    </Box>
                  </Box>
                  <Box>
                    <CustomBottomHeading variant="h6">
                      SERVICES
                    </CustomBottomHeading>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <CustomBottomLink href="#">
                        Custom Software Development
                      </CustomBottomLink>
                      <CustomBottomLink href="#">
                        Mobile Development
                      </CustomBottomLink>
                      <CustomBottomLink href="#">
                        Web Development
                      </CustomBottomLink>
                      <CustomBottomLink href="#">
                        QA and Testing
                      </CustomBottomLink>
                      <CustomBottomLink href="#">
                        UI / UX Design
                      </CustomBottomLink>
                      <CustomBottomLink href="#">
                        AWS Managed Services
                      </CustomBottomLink>
                      <CustomBottomLink href="#">
                        DevOps Automation
                      </CustomBottomLink>
                      <CustomBottomLink href="#">
                        Magento Development
                      </CustomBottomLink>
                      <CustomBottomLink href="#">Shopify</CustomBottomLink>
                      <CustomBottomLink href="#">Woocommerce</CustomBottomLink>
                    </Box>
                  </Box>
                  <Box>
                    <CustomBottomHeading variant="h6">
                      ENGAGEMENT MODELS
                    </CustomBottomHeading>
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <CustomBottomLink href="#">
                        Dedicated Team
                      </CustomBottomLink>
                      <CustomBottomLink href="#">
                        Staff Augmentation
                      </CustomBottomLink>
                      <CustomBottomLink href="#">
                        Project Based
                      </CustomBottomLink>
                    </Box>
                  </Box>
                </BottomNavigation>
              ) : (
                <BottomNavigation
                  sx={{
                    height: "max-content",
                    padding: "3em 1em",
                    borderTop: "1px solid rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: ".5em",
                      alignItems: "center",
                    }}
                  >
                    <Button
                      sx={{
                        background: `url('https://focusteck.com/wp-content/uploads/2022/03/focusteck-logo.svg')`,
                        backgroundRepeat: "no-repeat",
                        width: "220px",
                        height: "97px",
                        "&:hover": {
                          backgroundColor: "#fff",
                        },
                      }}
                    ></Button>
                    <Typography
                      variant="body1"
                      sx={{ fontSize: "18px", color: "#00000099" }}
                    >
                      Drops us a line 🙂
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ color: "#005DBD", fontWeight: "bold" }}
                    >
                      services@focusteck.com
                    </Typography>
                    <Box sx={{ display: "flex", gap: ".5em" }}>
                      <FacebookIcon sx={{ color: "#767676" }} />
                      <InstagramIcon sx={{ color: "#767676" }} />
                      <LinkedInIcon sx={{ color: "#767676" }} />
                      <TwitterIcon sx={{ color: "#767676" }} />
                    </Box>
                  </Box>
                </BottomNavigation>
              )}

              <BottomNavigation
                sx={{
                  flexShrink: 0,
                  padding: "0 2em",
                  boxShadow: "-3px -3px 9px rgba(0, 0, 0, 0.2)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <CustomFooterTypography
                  variant="body1"
                  sx={{ textAlign: "center" }}
                >
                  Copyright © 2013–2023{" "}
                  <Link
                    href="#"
                    style={{ textDecoration: "none", color: "#005DBD" }}
                  >
                    Focusteck
                  </Link>{" "}
                  All rights reserved.{" "}
                  <Link
                    href="#"
                    style={{ textDecoration: "none", color: "#005DBD" }}
                  >
                    Terms
                  </Link>{" "}
                  &{" "}
                  <Link
                    href="#"
                    style={{ textDecoration: "none", color: "#005DBD" }}
                  >
                    Privacy
                  </Link>
                </CustomFooterTypography>
              </BottomNavigation>
            </>
          )}
        </Box>
      </body>
    </html>
  );
}
