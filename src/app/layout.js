"use client";
import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";

import { styled } from "@mui/material/styles";
import {
  BottomNavigation,
  Typography,
  Box,
  Button,
  useMediaQuery,
  IconButton,
  Paper,
  Grid,
  TextField
} from "@mui/material";


const RotatingIconButton = styled(IconButton)({
  transition: 'transform 0.3s ease-in-out',
});

const CustomNavbarButton = styled(Link)(({ theme }) => ({
  textTransform: "none",
  fontSize: "17px",
  textDecoration: "none",
  lineHeight: 1.5,
  fontWeight: 400,
  fontFamily: ["Aeonik", "Poppins", "Helvetica", "Arial", "Lucida", "sans-serif"].join(
    ","
  ),
  position: "relative",
  overflow: "hidden",
  transition: "border-bottom-width 0.5s ease-out",
  "&:hover": {
    color: "#005DBD"

  },

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
  color: "#fff",
  lineHeight: 1.5,
  letterSpacing: 1.2,
  marginTop: '30px',
  fontWeight: "700",
  fontSize: "20px",
  width: "max-content",
  transition: "all 0.25s ease-in-out 0.25s",
  fontFamily: ["Aeonik", "Poppins", "Helvetica", "Arial", "Lucida", "sans-serif"].join(
    ","
  ),
}));

const CustomBottomLink = styled(Link)(({ theme }) => ({
  color: "#fff",
  textTransform: "none",
  fontSize: "16px",
  textDecoration: "none",
  lineHeight: 1.5,
  width: "max-content",
  fontWeight: 500,
  paddingBottom: "14px",
  fontFamily: ["Aeonik", "Poppins", "Helvetica", "Arial", "Lucida", "sans-serif"].join(
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
  fontSize: 12,
  color: "#fff",
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
  padding: '37px 0px 40px 0px',
  paddingLeft: '8.15%',
  paddingRight: '8.15%',
  maxHeight: 51.7,
  [theme.breakpoints.down("md")]: {
    padding: "0 1em",
  },
  [theme.breakpoints.down("sm")]: {
    padding: "0 .5em",
  },
}));

const CustomToolBar = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: 'center',
  justifyContent: "space-between",
  width: "100%",
  [theme.breakpoints.down("md")]: {
    alignItems: "center",
  },
  [theme.breakpoints.down("sm")]: {
    alignItems: "center",
  },
}));

const CustomBox = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    margin: "0",
  },
}));

export default function RootLayout({ children }) {
  const isNarrowScreen = useMediaQuery("(max-width:1148px)");
  const isMobileScreen = useMediaQuery("(max-width:360px)");
  const changeLogoSize = useMediaQuery("(max-width:980px)");
  const route = useRouter();

  const baseRoute = usePathname();
  const [hamburgerClicked, setHamburgerClicked] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const [scrollState, setScrollState] = useState(false)

  const handleClick = () => {
    setHamburgerClicked(!hamburgerClicked);
    setIsOpen(!isOpen);
  };

  const isRoot = baseRoute === "/";
  const isEstimationPage = baseRoute === "/cost-estimation-calculator";


  const href = isRoot
    ? "/cost-estimation-calculator"
    : isEstimationPage
      ? "#scroll-down"
      : "/cost-estimation-calculator";

  useEffect(() => {
    if (baseRoute === "/") {
      setScrollState(false)
      route.push("/cost-estimation-calculator")
    } else if (baseRoute === "/cost-estimation-calculator") {
      setScrollState(true)
    }
    else {
      setScrollState(false)
    }
  }, [href])

  return (
    <html lang="en" style={{ scrollBehavior: "smooth" }}>
      <body style={{ margin: "0" }}>
        <Box
          style={{
            // minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            margin: 0,
          }}
        >
          <Box sx={{ height: "", overflow: "hidden" }}>
            <CustomAppBar position="static">
              <CustomToolBar>
                <Box
                  sx={{
                    background: `url('https://focusteck.com/wp-content/uploads/2022/03/focusteck-logo.svg')`,
                    backgroundRepeat: "no-repeat",
                    // width: "149.13px",
                    width: changeLogoSize ? "100px" : "161px",
                    height: changeLogoSize ? "30px" : "50px",
                    // marginLeft: ".3em",
                    "&:hover": {
                      backgroundColor: "#fff",
                    },
                  }}
                ></Box>


                <Box
                  sx={{
                    display: "flex",
                    alignItems: 'center',
                    // justifyContent: "center",
                    // alignItems: "stretch",
                    gap: "22px",
                    // margin: "0px 67px",
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
                      gap: "6px",
                      alignItems: "center"
                    }}
                  >
                    <Typography>
                      Services
                    </Typography>
                    <svg width="7" height="6" viewBox="0 0 7 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M3.87817 4.86212C3.77958 4.96069 3.64587 5.01606 3.50646 5.01606C3.36705 5.01606 3.23334 4.96069 3.13475 4.86212L0.160509 1.88788C0.110293 1.83939 0.0702397 1.78137 0.042685 1.71722C0.0151303 1.65308 0.000626484 1.58409 1.98509e-05 1.51428C-0.000586782 1.44447 0.012716 1.37524 0.0391518 1.31062C0.0655876 1.24601 0.104627 1.18731 0.153992 1.13794C0.203358 1.08857 0.26206 1.04954 0.326674 1.0231C0.391288 0.996664 0.460521 0.983361 0.530331 0.983968C0.600141 0.984574 0.669132 0.999078 0.733277 1.02663C0.797422 1.05419 0.855437 1.09424 0.903937 1.14446L3.50646 3.74698L6.10899 1.14446C6.20815 1.04868 6.34095 0.995691 6.47881 0.996889C6.61666 0.998087 6.74853 1.05338 6.84601 1.15086C6.94349 1.24834 6.99878 1.38021 6.99998 1.51806C7.00118 1.65592 6.94818 1.78873 6.85241 1.88788L3.87817 4.86212Z" fill="black" />
                    </svg>

                  </CustomNavbarButton>
                  <CustomNavbarButton
                    href="#"
                    sx={{
                      flexGrow: 1,
                      display: { xs: "none", md: "none", lg: "flex" },
                      color: "#2e2e2e",
                      textTransform: "capitalize",
                      gap: "6px",
                      alignItems: "center"
                    }}
                  >
                    <Typography>
                      Engagement Model
                    </Typography>
                    <svg width="7" height="6" viewBox="0 0 7 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M3.87817 4.86212C3.77958 4.96069 3.64587 5.01606 3.50646 5.01606C3.36705 5.01606 3.23334 4.96069 3.13475 4.86212L0.160509 1.88788C0.110293 1.83939 0.0702397 1.78137 0.042685 1.71722C0.0151303 1.65308 0.000626484 1.58409 1.98509e-05 1.51428C-0.000586782 1.44447 0.012716 1.37524 0.0391518 1.31062C0.0655876 1.24601 0.104627 1.18731 0.153992 1.13794C0.203358 1.08857 0.26206 1.04954 0.326674 1.0231C0.391288 0.996664 0.460521 0.983361 0.530331 0.983968C0.600141 0.984574 0.669132 0.999078 0.733277 1.02663C0.797422 1.05419 0.855437 1.09424 0.903937 1.14446L3.50646 3.74698L6.10899 1.14446C6.20815 1.04868 6.34095 0.995691 6.47881 0.996889C6.61666 0.998087 6.74853 1.05338 6.84601 1.15086C6.94349 1.24834 6.99878 1.38021 6.99998 1.51806C7.00118 1.65592 6.94818 1.78873 6.85241 1.88788L3.87817 4.86212Z" fill="black" />
                    </svg>
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
                    // display: "flex",
                    // justifyContent: "flex-end",
                    // width: "204.5px",
                  }}
                >
                  <Button
                    sx={{
                      display: { xs: "none", md: "none", lg: "flex" },
                      padding: "10px 25px", // Padding TOP and Bottom is not according to the figma design
                      fontSize: "16px",
                      color: "#fff",
                      backgroundColor: "#005DBD",
                      border: "1px solid #005DBD",
                      letterSpacing: "1.5px",
                      textTransform: 'capitalize',
                      borderRadius: "5px",
                      // maxWidth: 150,
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
                  {isNarrowScreen ? (
                    <RotatingIconButton
                      onClick={handleClick}
                      aria-label={isOpen ? 'Close menu' : 'Open menu'}
                      style={{
                        transform: `rotate(${isOpen ? 180 : 0}deg)`,
                      }}
                    >
                      {isOpen ? <CloseIcon sx={{ color: '#005DBD', width: changeLogoSize ? ".9em" : "1.3em", height: changeLogoSize ? ".9em" : "1.3em" }} /> : <MenuIcon sx={{ color: '#005DBD', width: changeLogoSize ? ".9em" : "1.3em", height: changeLogoSize ? ".9em" : "1.3em" }} />}
                    </RotatingIconButton>
                  ) : null}

                </>
              </CustomToolBar>
            </CustomAppBar>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                // alignItems: "center",
                gap: "1em",
                position: "absolute",
                backgroundColor: "#fff",
                left: 0,
                right: 0,
                top: 52,
                zIndex: 1,
                margin: "auto",
                maxWidth: "80%",
                padding: ".5em 1em",
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
                  paddingTop: "5px",
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
                  paddingTop: "5px",
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
                  paddingTop: "5px",
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
                  paddingTop: "5px",
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
                  paddingTop: "5px",
                  paddingBottom: "20px",
                  color: "#2e2e2e",
                  textTransform: "capitalize",
                }}
              >
                Blog
              </CustomNavbarButton>
            </Box>
          </Box >
          {
            baseRoute === "/" ? null : baseRoute ===
              "/cost-estimation-calculator" ? (
              <CustomBox
                sx={{
                  minHeight: "100vh", display: "flex", alignItems: "center",
                }}
              >
                {children}
              </CustomBox>
            ) : (
              <CustomBox id="scroll-down" sx={{
                minHeight: "100vh", paddingTop: baseRoute === "/thank-you" ? "0em" : "1em", paddingBottom: baseRoute === "/thank-you" ? "0em" : "3em",
              }}>
                {children}
              </CustomBox>
            )
          }

          {
            baseRoute === "/" ? null : (
              <>
                {!isNarrowScreen ? (
                  <Box sx={{
                    // paddingTop: "30px",
                  }}>
                    <Box sx={{
                      backgroundColor: '#005DBD',
                      display: 'flex',
                      justifyContent: "space-between",
                      alignItems: 'center',
                      padding: '1em 8.5%',
                      borderBottom: "1px solid #fff",

                    }}>
                      <Typography variant="body1"
                        sx={{
                          color: "#fff",
                          fontSize: '48px',
                          fontFamily: "Aeonik",
                        }}>Discover the Perfect Match for <br /> Your Project and Boost </Typography>
                      <Button variant="outlined"
                        sx={{
                          backgroundColor: '#fff',
                          color: "#005DBD",
                          textTransform: 'capitalize',
                          padding: '12px 43px',
                          borderColor: '#fff',
                          "&:hover": {
                            backgroundColor: '#005DBD',
                            color: '#fff'
                          }
                        }}
                      >Schedule Call</Button>
                    </Box>
                    <BottomNavigation
                      sx={{
                        height: "340px",
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "59px 8.5% 29px 8.5%",
                        backgroundColor: '#005DBD',

                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          color: '#fff'
                        }}
                      >
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '26px' }}>
                          <Box
                            sx={{
                              width: "129.490px",
                              height: "36.813px",
                              padding: 0,
                            }}
                          >
                            <svg width="220" height="54" viewBox="0 0 220 54" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <g clip-path="url(#clip0_368_191)">
                                <path d="M194.948 32.5279L205.605 23.6827C205.662 23.644 205.729 23.6222 205.798 23.62C205.866 23.6178 205.934 23.6352 205.994 23.6702C206.053 23.7052 206.1 23.7563 206.131 23.8173C206.161 23.8784 206.173 23.9468 206.165 24.0144C205.762 26.2257 205.359 28.1274 204.978 30.1176C204.882 30.4411 204.666 30.7173 204.374 30.8915C202.695 32.2183 201.038 33.5672 199.314 34.8276C198.575 35.3362 198.62 35.6458 199.135 36.2871C202.269 40.2232 205.359 44.2035 208.471 48.1617C208.51 48.2125 208.533 48.2732 208.538 48.3366C208.543 48.4001 208.529 48.4636 208.498 48.5195C208.468 48.5754 208.421 48.6215 208.365 48.6521C208.309 48.6828 208.244 48.6968 208.18 48.6924H201.799C201.351 48.6924 201.239 48.3386 201.038 48.0954L194.164 38.9406C194.03 38.7858 193.94 38.5868 193.806 38.432C193.763 38.3806 193.706 38.3423 193.642 38.3215C193.578 38.3007 193.509 38.2982 193.443 38.3144C193.378 38.3306 193.318 38.3648 193.271 38.413C193.225 38.4612 193.193 38.5214 193.179 38.5868C192.642 41.6384 192.082 44.6457 191.567 47.6752C191.567 48.3828 191.254 48.803 190.38 48.7366C189.225 48.6592 188.066 48.6592 186.91 48.7366C186.171 48.7366 185.992 48.5819 186.126 47.8079C187.156 42.3018 188.119 36.7514 189.127 31.2674C190.201 25.3191 191.366 19.3707 192.351 13.4002C192.351 12.7368 192.709 12.6041 193.336 12.6041C194.567 12.6041 195.799 12.6041 197.03 12.6041C197.769 12.6041 197.859 12.8474 197.724 13.4886C196.784 18.5894 195.851 23.7122 194.925 28.8571C194.724 29.9406 194.545 31.0684 194.343 32.2404C194.31 32.3189 194.308 32.4072 194.338 32.487C194.369 32.5668 194.429 32.6319 194.507 32.6689C194.585 32.7059 194.674 32.7119 194.756 32.6856C194.838 32.6593 194.907 32.6029 194.948 32.5279Z" fill="white" />
                                <path d="M99.8808 23.683C98.9554 28.71 98.0449 33.737 97.1493 38.764C96.6119 41.6608 96.097 44.5797 95.6268 47.4765C95.5992 47.7824 95.4995 48.0778 95.3357 48.3389C95.2941 48.4192 95.2325 48.4877 95.1566 48.5379H94.9775L90.4996 48.2725C90.443 48.2672 90.3882 48.2508 90.3382 48.2242C90.2882 48.1976 90.2441 48.1614 90.2085 48.1177C90.2085 47.9187 90.2085 47.6534 90.2085 47.2996C87.3676 48.6663 84.1906 49.2033 81.0512 48.8475C79.941 48.8724 78.84 48.6444 77.8334 48.1814C76.8268 47.7183 75.9417 47.0325 75.2468 46.1772C74.5518 45.3218 74.0655 44.3199 73.8258 43.2491C73.586 42.1783 73.5991 41.0673 73.8641 40.0023C74.7373 34.5404 75.812 29.1006 76.7748 23.6387C76.7748 22.9975 77.1106 22.7321 77.8271 22.7763C79.0137 22.7763 80.2004 22.7763 81.4094 22.7763C82.0587 22.7763 82.3274 22.7763 82.193 23.6166C81.387 27.8402 80.6258 32.0638 79.9541 36.3094C79.7526 37.4151 79.5063 38.5207 79.4167 39.6706C79.348 40.1687 79.3818 40.6753 79.516 41.1602C79.6502 41.645 79.882 42.0982 80.1977 42.4925C80.5133 42.8868 80.9063 43.2142 81.353 43.455C81.7997 43.6959 82.291 43.8452 82.7975 43.8942C84.1912 44.1677 85.6307 44.1098 86.9972 43.7253C88.3637 43.3408 89.6179 42.6407 90.6563 41.6829L90.8802 41.4839C91.2546 41.0947 91.4972 40.6001 91.5743 40.0686C92.134 36.8623 92.7161 33.6559 93.2983 30.4274C93.7237 28.2161 94.1491 25.8279 94.5521 23.5061C94.5521 23.0196 94.776 22.8206 95.3133 22.8206C96.6343 22.8206 97.9777 22.8206 99.2987 22.8206C99.948 22.8648 99.9704 23.1522 99.8808 23.683Z" fill="white" />
                                <path d="M107.762 48.9359C106.015 48.9855 104.284 48.6076 102.721 47.836C101.158 47.0643 99.8133 45.9229 98.8057 44.5133C98.4027 44.0268 98.4922 43.7615 98.9848 43.4076C100.082 42.6116 101.224 41.7934 102.209 40.9089C102.791 40.4224 103.082 40.3782 103.552 41.0858C104.265 42.2767 105.356 43.2018 106.655 43.7176C107.955 44.2334 109.391 44.311 110.739 43.9384C111.48 43.7848 112.168 43.4417 112.732 42.9433C112.994 42.7266 113.202 42.4536 113.341 42.1452C113.48 41.8368 113.545 41.5011 113.532 41.1638C113.519 40.8266 113.428 40.4968 113.266 40.1996C113.104 39.9024 112.876 39.6458 112.598 39.4494C111.521 38.7293 110.323 38.2051 109.06 37.9015C108.053 37.5256 106.978 37.216 105.993 36.818C104.787 36.3996 103.767 35.5785 103.109 34.4965C102.451 33.4146 102.196 32.1396 102.388 30.8917C102.492 29.1784 103.122 27.5368 104.194 26.1858C105.265 24.8347 106.729 23.8383 108.388 23.3291C110.588 22.3566 113.059 22.1575 115.389 22.765C117.719 23.3726 119.768 24.7501 121.195 26.6682C121.576 27.1989 121.665 27.5085 121.061 27.9507C119.919 28.791 118.822 29.6976 117.725 30.6043C117.367 30.9138 117.165 30.8696 116.941 30.6043C116.805 30.3676 116.656 30.1388 116.493 29.9188C115.815 28.8651 114.793 28.0717 113.596 27.6696C112.399 27.2675 111.099 27.2809 109.911 27.7075C109.399 27.8365 108.94 28.1178 108.595 28.5134C108.251 28.909 108.038 29.3996 107.985 29.9188C107.985 31.0908 108.679 31.5772 109.575 32.1301C111.053 32.8377 112.642 33.2578 114.053 33.877H114.344C119.874 35.9114 119.919 40.5109 117.747 44.0932C116.666 45.7013 115.172 46.997 113.417 47.8478C111.663 48.6987 109.711 49.0741 107.762 48.9359Z" fill="white" />
                                <path d="M64.6616 22.6211C66.338 22.6081 67.9946 22.9787 69.5018 23.7038C71.0089 24.4289 72.3256 25.4888 73.3487 26.8004C73.7741 27.2648 73.8189 27.5523 73.3487 27.9945C72.274 28.7906 71.1098 29.6751 70.1918 30.5596C69.8559 30.8471 69.6544 30.9355 69.3186 30.5596C68.5116 29.3283 67.3248 28.3861 65.9338 27.8724C64.5427 27.3587 63.0212 27.3007 61.5942 27.7071C60.0936 28.119 58.7354 28.9278 57.6661 30.0463C56.5968 31.1647 55.857 32.5503 55.5266 34.0535C54.9722 35.6896 54.8037 37.4292 55.034 39.1394C55.0971 39.9426 55.3393 40.7221 55.7432 41.4221C56.1472 42.122 56.7029 42.7249 57.3705 43.1878C58.0382 43.6506 58.8012 43.9619 59.605 44.0992C60.4087 44.2366 61.2333 44.1966 62.0196 43.9822C64.2164 43.588 66.2568 42.5918 67.908 41.1075C68.4454 40.6431 68.6917 40.7094 69.0723 41.2623C69.5575 41.9931 70.0963 42.6879 70.6844 43.3409C71.1322 43.8495 71.1098 44.1812 70.6844 44.6456C69.119 46.1404 67.2489 47.2883 65.1988 48.0128C63.1487 48.7373 60.9657 49.0217 58.7955 48.847C53.1981 48.4269 49.9964 45.4416 49.6382 40.0018C49.3202 37.1589 49.7749 34.2837 50.9554 31.6719C52.136 29.0602 53.9998 26.8062 56.355 25.142C58.7863 23.4593 61.6931 22.5771 64.6616 22.6211Z" fill="white" />
                                <path d="M183.301 30.9363L182.54 30.0739C181.863 29.2312 181.002 28.5505 180.021 28.0826C179.04 27.6147 177.965 27.3717 176.876 27.3717C175.786 27.3717 174.711 27.6147 173.73 28.0826C172.749 28.5505 171.888 29.2312 171.211 30.0739C170.119 31.3754 169.329 32.897 168.896 34.5319C168.463 36.1668 168.397 37.8755 168.703 39.5383C168.815 40.2969 169.089 41.0234 169.507 41.6694C169.925 42.3153 170.477 42.8659 171.128 43.2843C171.778 43.7028 172.511 43.9796 173.279 44.0962C174.046 44.2129 174.829 44.1667 175.577 43.9608C177.838 43.5586 179.939 42.5399 181.645 41.0198C182.07 40.6439 182.316 40.6218 182.652 41.0198C182.988 41.4178 183.816 42.5898 184.443 43.3417C184.734 43.7176 184.824 43.983 184.443 44.3589C182.439 46.3558 179.903 47.7504 177.129 48.3806C174.355 49.0108 171.456 48.8507 168.771 47.9191C167.228 47.3671 165.887 46.3742 164.918 45.0667C163.949 43.7592 163.396 42.1965 163.33 40.5776C162.875 37.6708 163.225 34.6965 164.345 31.9709C165.465 29.2453 167.311 26.8703 169.689 25.0985C171.805 23.5095 174.357 22.5859 177.012 22.4479C179.668 22.3099 182.304 22.9638 184.578 24.3246C185.562 25.0006 186.451 25.8038 187.22 26.7128C187.555 27.1108 187.667 27.3319 187.22 27.73C185.764 28.8577 184.555 29.897 183.301 30.9363Z" fill="white" />
                                <path d="M136.261 23.4618C136.014 24.7222 135.791 25.9827 135.611 27.2431C135.611 27.7296 135.231 27.7075 134.873 27.7075C133.887 27.7075 132.902 27.7075 131.895 27.7075C131.402 27.7075 131.178 27.8401 131.089 28.3487C130.439 32.5723 129.477 36.7295 128.85 40.9531C128.773 41.4218 128.773 41.8996 128.85 42.3683C129.119 44.0047 129.813 44.5796 131.492 44.1374H131.895C132.656 44.1374 133.193 44.1374 133.037 45.1324C132.981 46.0382 132.981 46.9466 133.037 47.8523C133.037 48.184 133.037 48.5157 132.544 48.5821C131.153 48.9124 129.717 49.0244 128.29 48.9138C126.913 48.7636 125.645 48.1022 124.743 47.0635C123.841 46.0248 123.372 44.6864 123.432 43.3192C123.389 41.2002 123.607 39.084 124.081 37.017C124.551 34.275 125.044 31.533 125.581 28.791C125.76 27.9286 125.581 27.5306 124.663 27.6853C124.29 27.7105 123.916 27.7105 123.544 27.6853L131.268 18.8402L132.477 17.4471H132.656C132.684 17.4357 132.715 17.4316 132.745 17.4352C132.776 17.4389 132.804 17.4501 132.829 17.4678C132.854 17.4855 132.873 17.5092 132.886 17.5365C132.899 17.5638 132.905 17.5939 132.902 17.624V18.0662C132.902 18.5527 132.746 19.0613 132.656 19.5478C132.522 20.4323 132.365 21.3168 132.186 22.2013C132.186 22.7321 132.186 22.8647 132.723 22.8426C133.708 22.8426 134.694 22.8426 135.701 22.8426C136.261 22.7984 136.35 22.9753 136.261 23.4618Z" fill="white" />
                                <path d="M219.98 23.6823L218.3 24.5005L208.494 29.3211L208.27 29.4316L206.859 30.1172H206.703H206.546C206.546 30.1172 206.412 30.1171 206.434 29.9402C206.568 29.3432 206.703 28.7683 206.815 28.2154C207.128 26.7118 207.441 25.2523 207.755 23.7929C207.755 23.3948 208.091 23.3506 208.449 23.3506H220.024C220.069 23.3565 220.109 23.3795 220.137 23.4148C220.164 23.45 220.176 23.4946 220.17 23.5385C220.164 23.5825 220.141 23.6224 220.105 23.6494C220.069 23.6763 220.024 23.6881 219.98 23.6823Z" fill="white" />
                                <path d="M161.204 30.0511C161.114 28.4532 160.516 26.9242 159.495 25.6815C158.474 24.4389 157.082 23.5459 155.518 23.1297C153.638 22.6101 151.667 22.4912 149.737 22.7809C147.807 23.0706 145.961 23.7624 144.323 24.8103C141.787 26.6202 139.801 29.0817 138.581 31.9274C137.362 34.7732 136.955 37.8946 137.404 40.9527C137.554 42.2181 137.985 43.4353 138.666 44.5171C139.347 45.599 140.262 46.5187 141.345 47.2107C143.36 48.4299 145.702 49.0159 148.062 48.8913C152.038 48.981 155.893 47.5374 158.809 44.8667C159.301 44.4024 159.346 44.0707 158.809 43.5621C158.271 43.0535 157.645 42.1468 157.107 41.3508C156.57 40.5547 156.48 40.7316 155.943 41.196C154.43 42.5805 152.552 43.5155 150.525 43.8938C146.047 44.734 142.979 42.5006 142.733 38.1223C142.733 37.3041 142.957 37.1051 143.741 37.1051C146.45 37.1051 149.137 37.1051 151.846 37.1051H160.152C160.622 37.1051 160.981 37.1051 161.07 36.4859C161.452 34.3608 161.497 32.19 161.204 30.0511ZM155.54 32.5277C153.704 32.5277 151.846 32.5277 150.01 32.5277H144.479C144.076 32.5277 143.741 32.5277 144.009 31.9528C144.682 30.2763 145.953 28.901 147.583 28.0863C149.212 27.2716 151.087 27.0738 152.853 27.5302C153.821 27.756 154.686 28.2937 155.31 29.0584C155.934 29.8232 156.283 30.7715 156.301 31.7538C156.346 32.2624 156.189 32.5277 155.54 32.5277Z" fill="white" />
                                <path d="M47.7567 32.5272C47.7567 27.7066 45.3386 24.3454 41.2189 23.2619C37.626 22.2575 33.778 22.678 30.4943 24.4339C27.7201 26.1117 25.4935 28.5426 24.0801 31.4364C22.6667 34.3301 22.1264 37.5644 22.5236 40.7532C22.5743 42.4211 23.1306 44.0356 24.1205 45.3878C25.1104 46.74 26.4884 47.7677 28.0762 48.3379C30.5178 49.2678 33.1772 49.4912 35.7427 48.9821C38.3083 48.473 40.6738 47.2524 42.5623 45.4633C44.1852 43.9056 45.4813 42.0473 46.3764 39.9946C47.2716 37.9419 47.7482 35.735 47.7791 33.5002C47.7567 33.0358 47.7791 32.7262 47.7567 32.5272ZM39.1815 42.1905C38.1939 43.2745 36.9051 44.0475 35.4758 44.4132C34.0465 44.7789 32.5399 44.7211 31.1436 44.2471C29.0614 43.4731 28.0315 41.5272 28.0986 37.8122C28.1782 35.3766 28.8872 33.0015 30.1585 30.9129C30.9483 29.5979 32.1353 28.5602 33.5528 27.9455C34.9703 27.3307 36.5472 27.1699 38.062 27.4855C39.1171 27.6048 40.0948 28.0907 40.8207 28.8562C41.5466 29.6218 41.9734 30.6172 42.0249 31.6648C42.2848 33.5005 42.1669 35.3691 41.6783 37.1587C41.1897 38.9483 40.3405 40.6221 39.1815 42.08V42.1905Z" fill="white" />
                                <path d="M28.4561 18.8834C28.5278 18.886 28.597 18.9097 28.6549 18.9515C28.7127 18.9933 28.7566 19.0513 28.7807 19.118C28.8048 19.1847 28.8081 19.257 28.7902 19.3256C28.7722 19.3941 28.7338 19.4558 28.68 19.5026L27.3142 20.5861L19.8137 26.4903C19.7618 26.539 19.6953 26.5701 19.6242 26.5789C19.5531 26.5877 19.4809 26.5737 19.4184 26.5391C19.3558 26.5045 19.3061 26.4511 19.2766 26.3866C19.247 26.3221 19.2391 26.2499 19.254 26.1807L20.4406 19.2593C20.4516 19.1792 20.4917 19.1058 20.5535 19.0529C20.6154 19 20.6947 18.9711 20.7765 18.9719L28.4561 18.8834Z" fill="white" />
                                <path d="M18.6721 19.2602L18.2019 22.3118L17.0377 28.9457L15.963 33.9874L13.724 46.5697V47.0562C13.6791 47.1837 13.602 47.2978 13.5001 47.3879L13.2986 47.5205L6.20111 53.1372C6.14446 53.1759 6.07772 53.1977 6.00887 53.1999C5.94001 53.2021 5.87197 53.1847 5.8129 53.1497C5.75383 53.1147 5.70623 53.0636 5.6758 53.0026C5.64538 52.9415 5.63342 52.8731 5.64137 52.8055L6.64889 47.1667L8.75352 35.3805L8.9998 33.9653L10.5223 25.4518C10.545 25.3671 10.5916 25.2904 10.6566 25.2307L15.8062 21.1619L18.2019 19.2602H18.3363C18.3807 19.251 18.4271 19.2569 18.4677 19.277C18.5083 19.2971 18.5409 19.3301 18.5602 19.3708L18.6721 19.2602Z" fill="white" />
                                <path d="M40.8159 0.618782L33.8751 6.16913C33.802 6.19002 33.7244 6.19002 33.6512 6.16913H14.1499C14.0801 6.16263 14.0138 6.13605 13.9591 6.09268C13.9045 6.04931 13.8639 5.99107 13.8425 5.92515C13.821 5.85924 13.8197 5.78856 13.8385 5.72187C13.8573 5.65518 13.8955 5.59541 13.9484 5.54996L21.0235 -0.0224944H40.592C40.6691 -0.0258002 40.7453 -0.00440154 40.8091 0.0385105C40.8729 0.0814225 40.921 0.143555 40.9462 0.215646C40.9714 0.287737 40.9723 0.365931 40.9488 0.438577C40.9253 0.511222 40.8787 0.574428 40.8159 0.618782Z" fill="white" />
                                <path d="M20.4415 8.3142L19.0533 16.1643C19.0306 16.249 18.984 16.3257 18.919 16.3854L15.7397 18.8842L11.4857 22.2011C11.429 22.2398 11.3623 22.2616 11.2934 22.2638C11.2246 22.266 11.1565 22.2486 11.0974 22.2136C11.0384 22.1786 10.9908 22.1275 10.9603 22.0665C10.9299 22.0054 10.918 21.937 10.9259 21.8694L11.4857 18.8842L13.3664 8.20364C13.3814 8.12538 13.4228 8.05442 13.4837 8.00225C13.5447 7.95008 13.6216 7.91975 13.7022 7.91617H20.0609C20.1138 7.91247 20.1668 7.92041 20.2163 7.93943C20.2657 7.95845 20.3102 7.98808 20.3466 8.02616C20.383 8.06424 20.4104 8.10984 20.4268 8.15965C20.4432 8.20946 20.4482 8.26225 20.4415 8.3142Z" fill="white" />
                                <path d="M7.79291 28.105L6.78538 33.7217C6.77448 33.8018 6.73433 33.8752 6.67249 33.9282C6.61065 33.9811 6.53137 34.0099 6.44954 34.0092H0.292402C0.220744 34.0067 0.151502 33.9829 0.0936371 33.9411C0.0357726 33.8993 -0.00805451 33.8413 -0.032171 33.7746C-0.0562875 33.7079 -0.0595826 33.6356 -0.0416344 33.567C-0.0236862 33.4985 0.0146863 33.4368 0.0685097 33.39L7.166 27.7955C7.20757 27.7133 7.28045 27.6509 7.36863 27.6219C7.4568 27.5929 7.55305 27.5996 7.63618 27.6407C7.71931 27.6817 7.78253 27.7537 7.81192 27.8408C7.84131 27.9279 7.83447 28.0229 7.79291 28.105Z" fill="white" />
                              </g>
                              <defs>
                                <clipPath id="clip0_368_191">
                                  <rect width="220" height="53.2258" fill="white" />
                                </clipPath>
                              </defs>
                            </svg>

                          </Box>

                          <Box sx={{ padding: "5px 0 0 2px" }}>
                            <Typography
                              variant="body1"
                              sx={{
                                fontSize: "14px",
                                color: "#fff",
                                marginTop: "2.633px",
                                maxWidth: '290px'
                              }}
                            >
                              You can count on us as your reliable technology partner who promises to deliver to you as per your expectations. We give you quality results.
                            </Typography>

                          </Box>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px', marginTop: 'auto', fontSize: '18px' }}>
                          <Typography variant="body1">
                            Drops us a line
                          </Typography>
                          <svg width="20" height="17" viewBox="0 0 20 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 5.77887C0 10.5812 4.02 13.1398 6.962 15.4308C8 16.2386 9 17 10 17C11 17 12 16.2396 13.038 15.4299C15.981 13.1408 20 10.5812 20 5.77985C20 0.97757 14.5 -2.42837 10 2.18925C5.5 -2.42936 0 0.976583 0 5.77887Z" fill="#FAC935" />
                          </svg>
                        </Box>
                      </Box>

                      {/* <Box
                        sx={{
                          display: "flex",
                          color: "#fff"
                        }}
                      > */}
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "10px",
                        }}
                      >
                        <Box>
                          <CustomBottomHeading variant="h6" sx={{
                            paddingBottom: '30px',
                          }}
                          >
                            Company
                          </CustomBottomHeading>
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
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

                      </Box>

                      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Box>
                          <CustomBottomHeading
                            variant="h6"
                            sx={{
                              paddingBottom: '30px',
                            }}
                          >
                            Engagement Models
                          </CustomBottomHeading>
                          <Box sx={{ display: "flex", flexDirection: "column", }}>
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


                        <Box
                          sx={{
                            display: 'flex',
                            gap: '28.5px',
                            marginTop: 'auto'
                          }}
                        >
                          <svg width="17" height="24" viewBox="0 0 17 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4.62834 23.8746V12.7304H0.6875V8.718H4.62834V5.29085C4.62834 2.59777 6.9562 0.124634 12.3201 0.124634C14.4919 0.124634 16.0978 0.280315 16.0978 0.280315L15.9712 4.02726C15.9712 4.02726 14.3335 4.01534 12.5463 4.01534C10.6119 4.01534 10.302 4.68188 10.302 5.78818V8.718H16.125L15.8716 12.7304H10.302V23.8746H4.62834Z" fill="white" />
                          </svg>

                          <svg width="29" height="24" viewBox="0 0 29 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M28.7505 2.94584C27.7024 3.40959 26.5619 3.74336 25.3871 3.87335C26.6068 3.13006 27.5202 1.95578 27.9559 0.570839C26.8113 1.26925 25.5575 1.75898 24.2499 2.01832C23.7035 1.41904 23.0425 0.941633 22.3083 0.615835C21.5741 0.290038 20.7823 0.122836 19.9823 0.124648C16.7456 0.124648 14.1426 2.81584 14.1426 6.11836C14.1426 6.58211 14.1974 7.04587 14.2864 7.49206C9.43995 7.23208 5.11751 4.85708 2.24388 1.2208C1.72027 2.13818 1.44588 3.18273 1.44926 4.24576C1.44926 6.32564 2.48021 8.15959 4.05231 9.23818C3.12585 9.20075 2.22108 8.93954 1.41159 8.47579V8.54957C1.41159 11.4621 3.41868 13.8757 6.09366 14.4309C5.5914 14.5647 5.07472 14.6331 4.5558 14.6346C4.17562 14.6346 3.81598 14.596 3.45293 14.5433C4.19274 16.9183 6.34711 18.6433 8.91249 18.6995C6.9054 20.3121 4.3914 21.2607 1.66162 21.2607C1.17183 21.2607 0.719723 21.2432 0.250488 21.1869C2.83984 22.8909 5.91213 23.8746 9.22074 23.8746C19.9618 23.8746 25.8392 14.7471 25.8392 6.82453C25.8392 6.56455 25.8392 6.30456 25.8221 6.04458C26.9592 5.19084 27.9559 4.13334 28.7505 2.94584Z" fill="white" />
                          </svg>

                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.9973 8.03949C9.8168 8.03949 8.03735 9.81898 8.03735 11.9995C8.03735 14.18 9.8168 15.9595 11.9973 15.9595C14.1778 15.9595 15.9572 14.18 15.9572 11.9995C15.9572 9.81898 14.1778 8.03949 11.9973 8.03949ZM23.8742 11.9995C23.8742 10.3597 23.889 8.73465 23.7969 7.09776C23.7048 5.19648 23.2711 3.50909 21.8808 2.11877C20.4876 0.725488 18.8032 0.294728 16.9019 0.202635C15.2621 0.110542 13.6371 0.125395 12.0003 0.125395C10.3604 0.125395 8.73547 0.110542 7.09861 0.202635C5.19736 0.294728 3.51 0.728459 2.11971 2.11877C0.726454 3.51206 0.295702 5.19648 0.20361 7.09776C0.111518 8.73762 0.126372 10.3626 0.126372 11.9995C0.126372 13.6364 0.111518 15.2644 0.20361 16.9013C0.295702 18.8025 0.729424 20.4899 2.11971 21.8802C3.51297 23.2735 5.19736 23.7043 7.09861 23.7964C8.73844 23.8885 10.3634 23.8736 12.0003 23.8736C13.6401 23.8736 15.2651 23.8885 16.9019 23.7964C18.8032 23.7043 20.4905 23.2706 21.8808 21.8802C23.2741 20.487 23.7048 18.8025 23.7969 16.9013C23.892 15.2644 23.8742 13.6394 23.8742 11.9995ZM11.9973 18.0925C8.62555 18.0925 5.90439 15.3713 5.90439 11.9995C5.90439 8.6277 8.62555 5.90649 11.9973 5.90649C15.369 5.90649 18.0902 8.6277 18.0902 11.9995C18.0902 15.3713 15.369 18.0925 11.9973 18.0925ZM18.3397 7.07994C17.5525 7.07994 16.9168 6.4442 16.9168 5.65694C16.9168 4.86969 17.5525 4.23395 18.3397 4.23395C19.127 4.23395 19.7627 4.86969 19.7627 5.65694C19.7629 5.84388 19.7263 6.02903 19.6549 6.20178C19.5834 6.37453 19.4786 6.53149 19.3465 6.66368C19.2143 6.79586 19.0573 6.90067 18.8846 6.9721C18.7118 7.04353 18.5267 7.08017 18.3397 7.07994Z" fill="white" />
                          </svg>
                        </Box>

                      </Box>

                      <Box sx={{ display: 'flex', flexDirection: 'column' }}>

                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "10px",
                          }}
                        >
                          <Box>
                            <CustomBottomHeading variant="h6" sx={{
                              paddingBottom: '20px',
                            }}>
                              Newsletter
                            </CustomBottomHeading>
                            <Box
                              sx={{

                              }}
                            >

                              <Grid container spacing={0} alignItems="center">
                                <Grid item>
                                  <TextField
                                    placeholder="Subscribe Our Newsletter"
                                    size="small"
                                    variant="outlined"
                                    fullWidth
                                    sx={{
                                      backgroundColor: '#fff',
                                      borderRadius: '4px',
                                      border: 'none',
                                      borderColor: '#fff',
                                      borderTopRightRadius: 0,
                                      borderBottomRightRadius: 0,


                                      "& .MuiInputBase-input::placeholder": {
                                        color: "#9D9D9D",
                                      },
                                      "&:hover": {
                                        borderColor: "#fff"
                                      },
                                      "&.MuiFormControl-root .MuiInputBase-root .MuiOutlinedInput-notchedOutline": {
                                        border: 'none',
                                        borderColor: "#fff"
                                      },
                                    }}
                                  />
                                </Grid>
                                <Grid item>
                                  <Button variant="contained"
                                    sx={{
                                      backgroundColor: '#FAC935',
                                      color: '#fff',
                                      textTransform: 'capitalize',
                                      borderTopLeftRadius: 0,
                                      borderBottomLeftRadius: 0,
                                      borderColor: '#FAC935',
                                      height: '40px',
                                      "&:hover": {
                                        backgroundColor: "#fff",
                                        color: '#FAC935'
                                      },
                                    }}>
                                    Subscribe
                                  </Button>
                                </Grid>
                              </Grid>
                            </Box>
                          </Box>

                          <Box>
                            <CustomBottomHeading variant="h6" sx={{
                              paddingBottom: '20px',
                            }}>
                              Contact Us
                            </CustomBottomHeading>
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                // flexWrap: "wrap",
                              }}
                            >
                              <CustomBottomLink href="#">+92 42 37870173 &nbsp; +1 571 577 4513</CustomBottomLink>
                              <CustomBottomLink href="#">services@focusteck.com</CustomBottomLink>
                            </Box>
                          </Box>

                        </Box>
                        <Box sx={{ display: 'flex', gap: '30px', marginTop: 'auto' }}>
                          <img src="https://i.ibb.co/0XsvnbN/image-31.png" alt="image-31" border="0" />
                          <img src="https://i.ibb.co/M8kwKZ6/image-30.png" alt="image-30" border="0" />
                        </Box>
                      </Box>

                      {/* </Box> */}
                    </BottomNavigation>
                  </Box>

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
                      <Box
                        sx={{
                          width: isMobileScreen ? "190px" : "220px",
                          height: isMobileScreen ? "57px" : "97px",
                          marginBottom: isMobileScreen ? "2em" : 0,

                        }}
                      >
                        <svg width="220" height="54" viewBox="0 0 220 54" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <g clip-path="url(#clip0_368_191)">
                            <path d="M194.948 32.5279L205.605 23.6827C205.662 23.644 205.729 23.6222 205.798 23.62C205.866 23.6178 205.934 23.6352 205.994 23.6702C206.053 23.7052 206.1 23.7563 206.131 23.8173C206.161 23.8784 206.173 23.9468 206.165 24.0144C205.762 26.2257 205.359 28.1274 204.978 30.1176C204.882 30.4411 204.666 30.7173 204.374 30.8915C202.695 32.2183 201.038 33.5672 199.314 34.8276C198.575 35.3362 198.62 35.6458 199.135 36.2871C202.269 40.2232 205.359 44.2035 208.471 48.1617C208.51 48.2125 208.533 48.2732 208.538 48.3366C208.543 48.4001 208.529 48.4636 208.498 48.5195C208.468 48.5754 208.421 48.6215 208.365 48.6521C208.309 48.6828 208.244 48.6968 208.18 48.6924H201.799C201.351 48.6924 201.239 48.3386 201.038 48.0954L194.164 38.9406C194.03 38.7858 193.94 38.5868 193.806 38.432C193.763 38.3806 193.706 38.3423 193.642 38.3215C193.578 38.3007 193.509 38.2982 193.443 38.3144C193.378 38.3306 193.318 38.3648 193.271 38.413C193.225 38.4612 193.193 38.5214 193.179 38.5868C192.642 41.6384 192.082 44.6457 191.567 47.6752C191.567 48.3828 191.254 48.803 190.38 48.7366C189.225 48.6592 188.066 48.6592 186.91 48.7366C186.171 48.7366 185.992 48.5819 186.126 47.8079C187.156 42.3018 188.119 36.7514 189.127 31.2674C190.201 25.3191 191.366 19.3707 192.351 13.4002C192.351 12.7368 192.709 12.6041 193.336 12.6041C194.567 12.6041 195.799 12.6041 197.03 12.6041C197.769 12.6041 197.859 12.8474 197.724 13.4886C196.784 18.5894 195.851 23.7122 194.925 28.8571C194.724 29.9406 194.545 31.0684 194.343 32.2404C194.31 32.3189 194.308 32.4072 194.338 32.487C194.369 32.5668 194.429 32.6319 194.507 32.6689C194.585 32.7059 194.674 32.7119 194.756 32.6856C194.838 32.6593 194.907 32.6029 194.948 32.5279Z" fill="white" />
                            <path d="M99.8808 23.683C98.9554 28.71 98.0449 33.737 97.1493 38.764C96.6119 41.6608 96.097 44.5797 95.6268 47.4765C95.5992 47.7824 95.4995 48.0778 95.3357 48.3389C95.2941 48.4192 95.2325 48.4877 95.1566 48.5379H94.9775L90.4996 48.2725C90.443 48.2672 90.3882 48.2508 90.3382 48.2242C90.2882 48.1976 90.2441 48.1614 90.2085 48.1177C90.2085 47.9187 90.2085 47.6534 90.2085 47.2996C87.3676 48.6663 84.1906 49.2033 81.0512 48.8475C79.941 48.8724 78.84 48.6444 77.8334 48.1814C76.8268 47.7183 75.9417 47.0325 75.2468 46.1772C74.5518 45.3218 74.0655 44.3199 73.8258 43.2491C73.586 42.1783 73.5991 41.0673 73.8641 40.0023C74.7373 34.5404 75.812 29.1006 76.7748 23.6387C76.7748 22.9975 77.1106 22.7321 77.8271 22.7763C79.0137 22.7763 80.2004 22.7763 81.4094 22.7763C82.0587 22.7763 82.3274 22.7763 82.193 23.6166C81.387 27.8402 80.6258 32.0638 79.9541 36.3094C79.7526 37.4151 79.5063 38.5207 79.4167 39.6706C79.348 40.1687 79.3818 40.6753 79.516 41.1602C79.6502 41.645 79.882 42.0982 80.1977 42.4925C80.5133 42.8868 80.9063 43.2142 81.353 43.455C81.7997 43.6959 82.291 43.8452 82.7975 43.8942C84.1912 44.1677 85.6307 44.1098 86.9972 43.7253C88.3637 43.3408 89.6179 42.6407 90.6563 41.6829L90.8802 41.4839C91.2546 41.0947 91.4972 40.6001 91.5743 40.0686C92.134 36.8623 92.7161 33.6559 93.2983 30.4274C93.7237 28.2161 94.1491 25.8279 94.5521 23.5061C94.5521 23.0196 94.776 22.8206 95.3133 22.8206C96.6343 22.8206 97.9777 22.8206 99.2987 22.8206C99.948 22.8648 99.9704 23.1522 99.8808 23.683Z" fill="white" />
                            <path d="M107.762 48.9359C106.015 48.9855 104.284 48.6076 102.721 47.836C101.158 47.0643 99.8133 45.9229 98.8057 44.5133C98.4027 44.0268 98.4922 43.7615 98.9848 43.4076C100.082 42.6116 101.224 41.7934 102.209 40.9089C102.791 40.4224 103.082 40.3782 103.552 41.0858C104.265 42.2767 105.356 43.2018 106.655 43.7176C107.955 44.2334 109.391 44.311 110.739 43.9384C111.48 43.7848 112.168 43.4417 112.732 42.9433C112.994 42.7266 113.202 42.4536 113.341 42.1452C113.48 41.8368 113.545 41.5011 113.532 41.1638C113.519 40.8266 113.428 40.4968 113.266 40.1996C113.104 39.9024 112.876 39.6458 112.598 39.4494C111.521 38.7293 110.323 38.2051 109.06 37.9015C108.053 37.5256 106.978 37.216 105.993 36.818C104.787 36.3996 103.767 35.5785 103.109 34.4965C102.451 33.4146 102.196 32.1396 102.388 30.8917C102.492 29.1784 103.122 27.5368 104.194 26.1858C105.265 24.8347 106.729 23.8383 108.388 23.3291C110.588 22.3566 113.059 22.1575 115.389 22.765C117.719 23.3726 119.768 24.7501 121.195 26.6682C121.576 27.1989 121.665 27.5085 121.061 27.9507C119.919 28.791 118.822 29.6976 117.725 30.6043C117.367 30.9138 117.165 30.8696 116.941 30.6043C116.805 30.3676 116.656 30.1388 116.493 29.9188C115.815 28.8651 114.793 28.0717 113.596 27.6696C112.399 27.2675 111.099 27.2809 109.911 27.7075C109.399 27.8365 108.94 28.1178 108.595 28.5134C108.251 28.909 108.038 29.3996 107.985 29.9188C107.985 31.0908 108.679 31.5772 109.575 32.1301C111.053 32.8377 112.642 33.2578 114.053 33.877H114.344C119.874 35.9114 119.919 40.5109 117.747 44.0932C116.666 45.7013 115.172 46.997 113.417 47.8478C111.663 48.6987 109.711 49.0741 107.762 48.9359Z" fill="white" />
                            <path d="M64.6616 22.6211C66.338 22.6081 67.9946 22.9787 69.5018 23.7038C71.0089 24.4289 72.3256 25.4888 73.3487 26.8004C73.7741 27.2648 73.8189 27.5523 73.3487 27.9945C72.274 28.7906 71.1098 29.6751 70.1918 30.5596C69.8559 30.8471 69.6544 30.9355 69.3186 30.5596C68.5116 29.3283 67.3248 28.3861 65.9338 27.8724C64.5427 27.3587 63.0212 27.3007 61.5942 27.7071C60.0936 28.119 58.7354 28.9278 57.6661 30.0463C56.5968 31.1647 55.857 32.5503 55.5266 34.0535C54.9722 35.6896 54.8037 37.4292 55.034 39.1394C55.0971 39.9426 55.3393 40.7221 55.7432 41.4221C56.1472 42.122 56.7029 42.7249 57.3705 43.1878C58.0382 43.6506 58.8012 43.9619 59.605 44.0992C60.4087 44.2366 61.2333 44.1966 62.0196 43.9822C64.2164 43.588 66.2568 42.5918 67.908 41.1075C68.4454 40.6431 68.6917 40.7094 69.0723 41.2623C69.5575 41.9931 70.0963 42.6879 70.6844 43.3409C71.1322 43.8495 71.1098 44.1812 70.6844 44.6456C69.119 46.1404 67.2489 47.2883 65.1988 48.0128C63.1487 48.7373 60.9657 49.0217 58.7955 48.847C53.1981 48.4269 49.9964 45.4416 49.6382 40.0018C49.3202 37.1589 49.7749 34.2837 50.9554 31.6719C52.136 29.0602 53.9998 26.8062 56.355 25.142C58.7863 23.4593 61.6931 22.5771 64.6616 22.6211Z" fill="white" />
                            <path d="M183.301 30.9363L182.54 30.0739C181.863 29.2312 181.002 28.5505 180.021 28.0826C179.04 27.6147 177.965 27.3717 176.876 27.3717C175.786 27.3717 174.711 27.6147 173.73 28.0826C172.749 28.5505 171.888 29.2312 171.211 30.0739C170.119 31.3754 169.329 32.897 168.896 34.5319C168.463 36.1668 168.397 37.8755 168.703 39.5383C168.815 40.2969 169.089 41.0234 169.507 41.6694C169.925 42.3153 170.477 42.8659 171.128 43.2843C171.778 43.7028 172.511 43.9796 173.279 44.0962C174.046 44.2129 174.829 44.1667 175.577 43.9608C177.838 43.5586 179.939 42.5399 181.645 41.0198C182.07 40.6439 182.316 40.6218 182.652 41.0198C182.988 41.4178 183.816 42.5898 184.443 43.3417C184.734 43.7176 184.824 43.983 184.443 44.3589C182.439 46.3558 179.903 47.7504 177.129 48.3806C174.355 49.0108 171.456 48.8507 168.771 47.9191C167.228 47.3671 165.887 46.3742 164.918 45.0667C163.949 43.7592 163.396 42.1965 163.33 40.5776C162.875 37.6708 163.225 34.6965 164.345 31.9709C165.465 29.2453 167.311 26.8703 169.689 25.0985C171.805 23.5095 174.357 22.5859 177.012 22.4479C179.668 22.3099 182.304 22.9638 184.578 24.3246C185.562 25.0006 186.451 25.8038 187.22 26.7128C187.555 27.1108 187.667 27.3319 187.22 27.73C185.764 28.8577 184.555 29.897 183.301 30.9363Z" fill="white" />
                            <path d="M136.261 23.4618C136.014 24.7222 135.791 25.9827 135.611 27.2431C135.611 27.7296 135.231 27.7075 134.873 27.7075C133.887 27.7075 132.902 27.7075 131.895 27.7075C131.402 27.7075 131.178 27.8401 131.089 28.3487C130.439 32.5723 129.477 36.7295 128.85 40.9531C128.773 41.4218 128.773 41.8996 128.85 42.3683C129.119 44.0047 129.813 44.5796 131.492 44.1374H131.895C132.656 44.1374 133.193 44.1374 133.037 45.1324C132.981 46.0382 132.981 46.9466 133.037 47.8523C133.037 48.184 133.037 48.5157 132.544 48.5821C131.153 48.9124 129.717 49.0244 128.29 48.9138C126.913 48.7636 125.645 48.1022 124.743 47.0635C123.841 46.0248 123.372 44.6864 123.432 43.3192C123.389 41.2002 123.607 39.084 124.081 37.017C124.551 34.275 125.044 31.533 125.581 28.791C125.76 27.9286 125.581 27.5306 124.663 27.6853C124.29 27.7105 123.916 27.7105 123.544 27.6853L131.268 18.8402L132.477 17.4471H132.656C132.684 17.4357 132.715 17.4316 132.745 17.4352C132.776 17.4389 132.804 17.4501 132.829 17.4678C132.854 17.4855 132.873 17.5092 132.886 17.5365C132.899 17.5638 132.905 17.5939 132.902 17.624V18.0662C132.902 18.5527 132.746 19.0613 132.656 19.5478C132.522 20.4323 132.365 21.3168 132.186 22.2013C132.186 22.7321 132.186 22.8647 132.723 22.8426C133.708 22.8426 134.694 22.8426 135.701 22.8426C136.261 22.7984 136.35 22.9753 136.261 23.4618Z" fill="white" />
                            <path d="M219.98 23.6823L218.3 24.5005L208.494 29.3211L208.27 29.4316L206.859 30.1172H206.703H206.546C206.546 30.1172 206.412 30.1171 206.434 29.9402C206.568 29.3432 206.703 28.7683 206.815 28.2154C207.128 26.7118 207.441 25.2523 207.755 23.7929C207.755 23.3948 208.091 23.3506 208.449 23.3506H220.024C220.069 23.3565 220.109 23.3795 220.137 23.4148C220.164 23.45 220.176 23.4946 220.17 23.5385C220.164 23.5825 220.141 23.6224 220.105 23.6494C220.069 23.6763 220.024 23.6881 219.98 23.6823Z" fill="white" />
                            <path d="M161.204 30.0511C161.114 28.4532 160.516 26.9242 159.495 25.6815C158.474 24.4389 157.082 23.5459 155.518 23.1297C153.638 22.6101 151.667 22.4912 149.737 22.7809C147.807 23.0706 145.961 23.7624 144.323 24.8103C141.787 26.6202 139.801 29.0817 138.581 31.9274C137.362 34.7732 136.955 37.8946 137.404 40.9527C137.554 42.2181 137.985 43.4353 138.666 44.5171C139.347 45.599 140.262 46.5187 141.345 47.2107C143.36 48.4299 145.702 49.0159 148.062 48.8913C152.038 48.981 155.893 47.5374 158.809 44.8667C159.301 44.4024 159.346 44.0707 158.809 43.5621C158.271 43.0535 157.645 42.1468 157.107 41.3508C156.57 40.5547 156.48 40.7316 155.943 41.196C154.43 42.5805 152.552 43.5155 150.525 43.8938C146.047 44.734 142.979 42.5006 142.733 38.1223C142.733 37.3041 142.957 37.1051 143.741 37.1051C146.45 37.1051 149.137 37.1051 151.846 37.1051H160.152C160.622 37.1051 160.981 37.1051 161.07 36.4859C161.452 34.3608 161.497 32.19 161.204 30.0511ZM155.54 32.5277C153.704 32.5277 151.846 32.5277 150.01 32.5277H144.479C144.076 32.5277 143.741 32.5277 144.009 31.9528C144.682 30.2763 145.953 28.901 147.583 28.0863C149.212 27.2716 151.087 27.0738 152.853 27.5302C153.821 27.756 154.686 28.2937 155.31 29.0584C155.934 29.8232 156.283 30.7715 156.301 31.7538C156.346 32.2624 156.189 32.5277 155.54 32.5277Z" fill="white" />
                            <path d="M47.7567 32.5272C47.7567 27.7066 45.3386 24.3454 41.2189 23.2619C37.626 22.2575 33.778 22.678 30.4943 24.4339C27.7201 26.1117 25.4935 28.5426 24.0801 31.4364C22.6667 34.3301 22.1264 37.5644 22.5236 40.7532C22.5743 42.4211 23.1306 44.0356 24.1205 45.3878C25.1104 46.74 26.4884 47.7677 28.0762 48.3379C30.5178 49.2678 33.1772 49.4912 35.7427 48.9821C38.3083 48.473 40.6738 47.2524 42.5623 45.4633C44.1852 43.9056 45.4813 42.0473 46.3764 39.9946C47.2716 37.9419 47.7482 35.735 47.7791 33.5002C47.7567 33.0358 47.7791 32.7262 47.7567 32.5272ZM39.1815 42.1905C38.1939 43.2745 36.9051 44.0475 35.4758 44.4132C34.0465 44.7789 32.5399 44.7211 31.1436 44.2471C29.0614 43.4731 28.0315 41.5272 28.0986 37.8122C28.1782 35.3766 28.8872 33.0015 30.1585 30.9129C30.9483 29.5979 32.1353 28.5602 33.5528 27.9455C34.9703 27.3307 36.5472 27.1699 38.062 27.4855C39.1171 27.6048 40.0948 28.0907 40.8207 28.8562C41.5466 29.6218 41.9734 30.6172 42.0249 31.6648C42.2848 33.5005 42.1669 35.3691 41.6783 37.1587C41.1897 38.9483 40.3405 40.6221 39.1815 42.08V42.1905Z" fill="white" />
                            <path d="M28.4561 18.8834C28.5278 18.886 28.597 18.9097 28.6549 18.9515C28.7127 18.9933 28.7566 19.0513 28.7807 19.118C28.8048 19.1847 28.8081 19.257 28.7902 19.3256C28.7722 19.3941 28.7338 19.4558 28.68 19.5026L27.3142 20.5861L19.8137 26.4903C19.7618 26.539 19.6953 26.5701 19.6242 26.5789C19.5531 26.5877 19.4809 26.5737 19.4184 26.5391C19.3558 26.5045 19.3061 26.4511 19.2766 26.3866C19.247 26.3221 19.2391 26.2499 19.254 26.1807L20.4406 19.2593C20.4516 19.1792 20.4917 19.1058 20.5535 19.0529C20.6154 19 20.6947 18.9711 20.7765 18.9719L28.4561 18.8834Z" fill="white" />
                            <path d="M18.6721 19.2602L18.2019 22.3118L17.0377 28.9457L15.963 33.9874L13.724 46.5697V47.0562C13.6791 47.1837 13.602 47.2978 13.5001 47.3879L13.2986 47.5205L6.20111 53.1372C6.14446 53.1759 6.07772 53.1977 6.00887 53.1999C5.94001 53.2021 5.87197 53.1847 5.8129 53.1497C5.75383 53.1147 5.70623 53.0636 5.6758 53.0026C5.64538 52.9415 5.63342 52.8731 5.64137 52.8055L6.64889 47.1667L8.75352 35.3805L8.9998 33.9653L10.5223 25.4518C10.545 25.3671 10.5916 25.2904 10.6566 25.2307L15.8062 21.1619L18.2019 19.2602H18.3363C18.3807 19.251 18.4271 19.2569 18.4677 19.277C18.5083 19.2971 18.5409 19.3301 18.5602 19.3708L18.6721 19.2602Z" fill="white" />
                            <path d="M40.8159 0.618782L33.8751 6.16913C33.802 6.19002 33.7244 6.19002 33.6512 6.16913H14.1499C14.0801 6.16263 14.0138 6.13605 13.9591 6.09268C13.9045 6.04931 13.8639 5.99107 13.8425 5.92515C13.821 5.85924 13.8197 5.78856 13.8385 5.72187C13.8573 5.65518 13.8955 5.59541 13.9484 5.54996L21.0235 -0.0224944H40.592C40.6691 -0.0258002 40.7453 -0.00440154 40.8091 0.0385105C40.8729 0.0814225 40.921 0.143555 40.9462 0.215646C40.9714 0.287737 40.9723 0.365931 40.9488 0.438577C40.9253 0.511222 40.8787 0.574428 40.8159 0.618782Z" fill="white" />
                            <path d="M20.4415 8.3142L19.0533 16.1643C19.0306 16.249 18.984 16.3257 18.919 16.3854L15.7397 18.8842L11.4857 22.2011C11.429 22.2398 11.3623 22.2616 11.2934 22.2638C11.2246 22.266 11.1565 22.2486 11.0974 22.2136C11.0384 22.1786 10.9908 22.1275 10.9603 22.0665C10.9299 22.0054 10.918 21.937 10.9259 21.8694L11.4857 18.8842L13.3664 8.20364C13.3814 8.12538 13.4228 8.05442 13.4837 8.00225C13.5447 7.95008 13.6216 7.91975 13.7022 7.91617H20.0609C20.1138 7.91247 20.1668 7.92041 20.2163 7.93943C20.2657 7.95845 20.3102 7.98808 20.3466 8.02616C20.383 8.06424 20.4104 8.10984 20.4268 8.15965C20.4432 8.20946 20.4482 8.26225 20.4415 8.3142Z" fill="white" />
                            <path d="M7.79291 28.105L6.78538 33.7217C6.77448 33.8018 6.73433 33.8752 6.67249 33.9282C6.61065 33.9811 6.53137 34.0099 6.44954 34.0092H0.292402C0.220744 34.0067 0.151502 33.9829 0.0936371 33.9411C0.0357726 33.8993 -0.00805451 33.8413 -0.032171 33.7746C-0.0562875 33.7079 -0.0595826 33.6356 -0.0416344 33.567C-0.0236862 33.4985 0.0146863 33.4368 0.0685097 33.39L7.166 27.7955C7.20757 27.7133 7.28045 27.6509 7.36863 27.6219C7.4568 27.5929 7.55305 27.5996 7.63618 27.6407C7.71931 27.6817 7.78253 27.7537 7.81192 27.8408C7.84131 27.9279 7.83447 28.0229 7.79291 28.105Z" fill="white" />
                          </g>
                          <defs>
                            <clipPath id="clip0_368_191">
                              <rect width="220" height="53.2258" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                      </Box>
                      <Typography
                        variant="body1"
                        sx={{ fontSize: "18px", color: "#00000099" }}
                      >
                        Drop us a line 🙂
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ color: "#005DBD", fontWeight: "bold" }}
                      >
                        services@focusteck.com
                      </Typography>
                      <Box sx={{ display: "flex", gap: "1em" }}>
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
                    height: "min-content",
                    backgroundColor: "#005DBD",

                  }}
                >
                  <CustomFooterTypography
                    sx={{
                      padding: "25px 2em",
                      borderTop: "1px solid #fff",
                      width: '85%',
                      textAlign: "center",
                      height: "min-content",
                    }}
                  >
                    Copyright © 2013–2023{" "}
                    <Link
                      href="#"
                      style={{ textDecoration: "underline", color: '#fff' }}
                    >
                      Focusteck
                    </Link>{" "}
                    All rights reserved.{" "}
                    <Link
                      href="#"
                      style={{ textDecoration: "underline", color: '#fff' }}
                    >
                      Terms
                    </Link>{" "}
                    &{" "}
                    <Link
                      href="#"
                      style={{ textDecoration: "underline", color: '#fff' }}
                    >
                      Privacy
                    </Link>
                  </CustomFooterTypography>
                </BottomNavigation>
              </>
            )
          }
        </Box >
      </body >
    </html>
  );
}
