"use client";
import React, { useState, useRef, useEffect } from "react";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

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
  height: "100%",
  [theme.breakpoints.down("md")]: {
    padding: "3em 2em",
  },
  [theme.breakpoints.down("sm")]: {
    padding: "3em 1em",
  },
}));

const CustomTypography = styled(Typography)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    fontSize: "3em",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.5em",
  },
}));

const CustomNavbarButton = styled(Link)(({ theme }) => ({
  textTransform: "none",
  fontSize: "17px",
  textDecoration: "none",
  width: "max-content",
  paddingTop: 20,
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
  marginRight: "38.854px",
  lineHeight: 1.5,
  letterSpacing: 1.2,
  fontWeight: "bold",
  fontSize: "15px",

  padding: ".5em  9.5em 5px 0",
  width: "max-content",
  margin: ".5em 2em .2em 0",
  // margin: "1% 3% 1.2% 0",
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
  fontSize: "15px",
  textDecoration: "none",
  lineHeight: 1.5,
  width: "max-content",
  fontWeight: 300,
  padding: ".05em 0",
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
  backgroundColor: "#fff",
  padding: ".5% 5% 1% 5%",
  maxHeight: 51.7,
  display: "flex",
  [theme.breakpoints.down("md")]: {
    padding: "0 1em",
  },
  [theme.breakpoints.down("sm")]: {
    padding: "0 .5em",
  },
}));

const CustomToolBar = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  width: "100%",
  [theme.breakpoints.down("md")]: {
    alignItems: "center",
  },
  [theme.breakpoints.down("sm")]: {
    alignItems: "center",
  },
}));

export default function RootLayout({ children }) {
  const isNarrowScreen = useMediaQuery("(max-width:1148px)");
  const [hamburgerClicked, setHamburgerClicked] = useState(false);
  const route = useRouter();
  const [showMenuIcon, setShowMenuIcon] = useState(true);

  const baseRoute = usePathname();
  const handleNavBar = () => {
    setHamburgerClicked(!hamburgerClicked);
    // setShowMenuIcon((prev) => !prev);
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
          }}
        >
          <Box sx={{ height: "100vh", overflow: "hidden" }}>
            <CustomAppBar position="static">
              <CustomToolBar>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    paddingTop: "9.3px",
                    marginRight: "37.27px",
                  }}
                >
                  <Box
                    sx={{
                      background: `url('https://focusteck.com/wp-content/uploads/2022/03/focusteck-logo.svg')`,
                      backgroundRepeat: "no-repeat",
                      width: 149.13,
                      height: 42.4,
                      "&:hover": {
                        backgroundColor: "#fff",
                      },
                    }}
                  ></Box>
                </Box>

                <Box
                  sx={{
                    display: "inline-flex",
                    justifyContent: "center",
                    alignItems: "stretch",
                    gap: "22px",
                    margin: "0px 67px",
                    // margin: "0 6%",
                  }}
                >
                  <CustomNavbarButton
                    href="#"
                    onClick={() => route.push("/cost-estimation-calculator")}
                    sx={{
                      flexGrow: 1,
                      display: { xs: "none", md: "none", lg: "flex" },
                      color: "#2e2e2e",
                      alignItems: "stretch",
                      textTransform: "capitalize",
                    }}
                  >
                    Services
                  </CustomNavbarButton>
                  <CustomNavbarButton
                    href="#"
                    sx={{
                      flexGrow: 1,
                      display: { xs: "none", md: "none", lg: "flex" },
                      color: "#2e2e2e",
                      textTransform: "capitalize",
                    }}
                  >
                    Engagement Model
                  </CustomNavbarButton>
                  <CustomNavbarButton
                    href="#"
                    sx={{
                      flexGrow: 1,
                      display: { xs: "none", md: "none", lg: "flex" },
                      color: "#2e2e2e",
                      textTransform: "capitalize",
                    }}
                  >
                    Success Stories
                  </CustomNavbarButton>
                  <CustomNavbarButton
                    href="#"
                    sx={{
                      flexGrow: 1,
                      display: { xs: "none", md: "none", lg: "flex" },
                      color: "#2e2e2e",
                      textTransform: "capitalize",
                    }}
                  >
                    Careers
                  </CustomNavbarButton>
                  <CustomNavbarButton
                    href="#"
                    sx={{
                      flexGrow: 1,
                      display: { xs: "none", md: "none", lg: "flex" },
                      color: "#2e2e2e",
                      textTransform: "capitalize",
                    }}
                  >
                    About Us
                  </CustomNavbarButton>
                  <CustomNavbarButton
                    href="#"
                    sx={{
                      flexGrow: 1,
                      display: { xs: "none", md: "none", lg: "flex" },
                      color: "#2e2e2e",
                      textTransform: "capitalize",
                    }}
                  >
                    Blog
                  </CustomNavbarButton>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    width: "204.5px",
                  }}
                >
                  <Button
                    sx={{
                      display: { xs: "none", md: "none", lg: "flex" },
                      padding: "4.2px 14px",
                      fontSize: "15px",
                      height: "34px",
                      marginTop: "14.313px",
                      marginRight: "6.135px",
                      color: "#fff",
                      textTransform: "capitalize",
                      fontWeight: 700,
                      backgroundColor: "#005DBD",
                      border: "1px solid #005DBD",
                      letterSpacing: "1.5px",
                      borderRadius: "5px",
                      width: "max-content",
                      "&:hover": {
                        color: "#000",
                        backgroundColor: "#fff",
                        border: "1px solid #000",
                      },
                    }}
                  >
                    Contact Us
                  </Button>
                </Box>

                <>
                  {showMenuIcon ? (
                    <MenuIcon
                      onClick={handleNavBar}
                      sx={{
                        color: "#005DBD",
                        display: { xs: "block", md: "block", lg: "none" },
                        margin: "auto 0 auto auto",
                        transform: hamburgerClicked
                          ? "rotate(180deg)"
                          : "rotate(0deg)",
                        transition: "transform .4s ease",
                        "&:hover": {
                          cursor: "pointer",
                        },
                      }}
                    />
                  ) : (
                    <CloseIcon
                      onClick={handleNavBar}
                      sx={{
                        color: "#005DBD",
                        display: { xs: "block", md: "block", lg: "none" },
                        marginLeft: "auto",
                        transform: hamburgerClicked
                          ? "rotate(180deg)"
                          : "rotate(0deg)",
                        transition: "transform .4s ease",
                        "&:hover": {
                          cursor: "pointer",
                        },
                      }}
                    />
                  )}
                </>
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
                transition:
                  "opacity 0.5s ease-out, max-height 0.7s ease-out, visibility 0.5s ease-out",
              }}
            >
              <CustomNavbarButton
                href="#"
                onClick={() => route.push("/cost-estimation-calculator")}
                sx={{
                  flexGrow: 1,
                  my: 2,
                  color: "#2e2e2e",
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
                  color: "#2e2e2e",
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
                  color: "#2e2e2e",
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
                  color: "#2e2e2e",
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
                  color: "#2e2e2e",
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
                  color: "#2e2e2e",
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
                uncertainties hold you back. Define your budget effortlessly
                with just a few clicks.
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
          </Box>
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
                    // justifyContent: "normal",
                    justifyContent: "center",
                    borderTop: "1px solid rgba(0, 0, 0, 0.1)",
                    margin: "0px 94.750px",
                    padding: "25.260px 37.896px",
                    // padding: "2% 3%",
                    // margin: "0px 7%",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      paddingTop: "1em",
                      marginRight: "9%",
                    }}
                  >
                    <Button
                      sx={{
                        background: `url('https://focusteck.com/wp-content/uploads/2022/03/focusteck-logo.svg')`,
                        backgroundRepeat: "no-repeat",
                        width: "129.490px",
                        height: "36.813px",
                        padding: 0,
                        "&:hover": {
                          backgroundColor: "#fff",
                        },
                      }}
                    ></Button>

                    <Box sx={{ padding: "5px 0 0 2px" }}>
                      <Typography
                        variant="body1"
                        sx={{
                          fontSize: "19px",
                          color: "#00000099",
                          marginTop: "2.633px",
                          // padding: "5px 0 0 2px",
                        }}
                      >
                        Drop us a line 🙂
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          color: "#005DBD",
                          fontWeight: "bold",
                          paddingBottom: "10px",
                          fontSize: "14px",
                        }}
                      >
                        services@focusteck.com
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        gap: "1.2em",
                        marginBottom: "8px",
                      }}
                    >
                      <FacebookIcon
                        sx={{ color: "#767676", fontSize: "1.3rem" }}
                      />
                      <InstagramIcon
                        sx={{ color: "#767676", fontSize: "1.3rem" }}
                      />
                      <LinkedInIcon
                        sx={{ color: "#767676", fontSize: "1.3rem" }}
                      />
                      <TwitterIcon
                        sx={{ color: "#767676", fontSize: "1.3rem" }}
                      />
                    </Box>
                    <img
                      style={{
                        background: `url('https://focusteck.com/wp-content/uploads/2023/09/Aws_certificate-480x480.png')`,
                        backgroundSize: "cover",
                        width: "102px",
                        height: "102px",
                        border: "0 solid #fff",
                        // marginRight: "153.396px",
                      }}
                    />
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      // width: "100%",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",

                        // width: "100%",
                        // padding: "1% 1% 3% 0",
                        // margin: "1% 3% 1.2% 0",
                      }}
                    >
                      <Box>
                        <CustomBottomHeading variant="h6">
                          COMPANY
                        </CustomBottomHeading>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            // flexWrap: "wrap",
                          }}
                        >
                          <CustomBottomLink href="#">About Us</CustomBottomLink>
                          <CustomBottomLink href="#">
                            Success Stories
                          </CustomBottomLink>
                          <CustomBottomLink href="#">Blogs</CustomBottomLink>
                          <CustomBottomLink href="#">Careers</CustomBottomLink>
                        </Box>
                      </Box>
                      <Box sx={{ paddingBottom: "23px" }}>
                        <CustomBottomHeading variant="h6">
                          LOCATION
                        </CustomBottomHeading>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            // flexWrap: "wrap",
                          }}
                        >
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
                    <Box
                      sx={{
                        paddingBottom: "23px",
                        // width: "100%",
                        // padding: "1% 6% 3% 0",
                        // margin: "1% 1% 1.2% 0",
                        // display: "flex",
                        // flexWrap: "wrap",
                      }}
                    >
                      <CustomBottomHeading variant="h6">
                        SERVICES
                      </CustomBottomHeading>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          // flexWrap: "wrap",
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
                        <CustomBottomLink href="#">
                          Woocommerce
                        </CustomBottomLink>
                      </Box>
                    </Box>
                    <Box
                      sx={
                        {
                          // width: "100%",
                          // padding: "1% 15% 3% 0",
                          // margin: "1% 3% 1.2% 0",
                          // display: "flex",
                          // flexWrap: "wrap",
                          // height: "min-content",
                        }
                      }
                    >
                      <CustomBottomHeading
                        variant="h6"
                        sx={{
                          // width: "min-content",
                          paddingRight: ".5% !important",
                        }}
                      >
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
                      <FacebookIcon
                        sx={{ color: "#767676", fontSize: "1rem" }}
                      />
                      <InstagramIcon
                        sx={{ color: "#767676", fontSize: "1rem" }}
                      />
                      <LinkedInIcon
                        sx={{ color: "#767676", fontSize: "1rem" }}
                      />
                      <TwitterIcon
                        sx={{ color: "#767676", fontSize: "1rem" }}
                      />
                    </Box>
                  </Box>
                </BottomNavigation>
              )}

              <BottomNavigation
                sx={{
                  flexShrink: 0,
                  padding: "0 2em",
                  borderTop: "1px solid rgba(0, 0, 0, 0.1)",
                  // display: "flex",
                  // justifyContent: "center",
                  // alignItems: "center",
                  height: "min-content",
                }}
              >
                <CustomFooterTypography
                  sx={{
                    textAlign: "center",
                    paddingTop: "10px",
                    height: "min-content",
                  }}
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
