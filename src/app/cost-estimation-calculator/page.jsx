"use client";
import React, { useRef, useEffect, useState } from "react";
import { Box, Button, Typography, useMediaQuery, ThemeProvider } from "@mui/material";
import { styled } from "@mui/material/styles";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

import appTheme from "@/themes/theme";

const CustomRouteButton = styled(Button)(({ theme }) => ({
  color: "#fff",
  boxShadow: "none",
  textTransform: "none",
  fontSize: "1.3rem",
  padding: "4.85em 2em 1.3em 2em",
  lineHeight: 1.5,
  fontWeight: "normal",
  borderRadius: "10px",
  minwidth: "140px",
  minHeight: "200px",
  textAlign: "center",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  flexWrap: "wrap",
  flexDirection: "column",
  flexGrow: 1,
  flexShrink: 1,
  gap: ".5em",
  fontFamily: ["Aeonik", "Poppins", "Helvetica", "Arial", "Lucida", "sans-serif"].join(
    ","
  ),
  [theme.breakpoints.down("md")]: {
    width: 400,
    height: 400,
    padding: "1em",

  },
  [theme.breakpoints.down("sm")]: {
    width: 300,
    height: 300,
    padding: "1em .5em",

  },
}));

const CustomBannerBox = styled(Box)(({ theme }) => ({
  color: "white",
  height: "100%",
}));


const CustomTypography = styled(Typography)(({ theme }) => ({
  color: "black",
  maxWidth: 600,
  fontWeight: 700,
  fontSize: '50px',
  marginBottom: '30px',
  fontFamily: ["Aeonik", "Helvetica", "Arial", "Lucida", "sans-serif"].join(
    ","
  ),
  [theme.breakpoints.down("md")]: {
    fontSize: "3em",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.5em",
  },
}));

const CustomParagraph = styled(Typography)(({ theme }) => ({
  maxWidth: 711,
  color: "black",
  fontSize: '20px',
  marginBottom: '59px'

}));


const CustomStartButton = styled(Button)(({ theme }) => ({
  width: "300px",
  height: "50px",
  backgroundColor: "#005dbd",
  padding: '15px 25px',
  fontWeight: 300,
  fontSize: "15px",
  fontFamily: ["Aeonik", "Poppins", "Helvetica", "Arial", "Lucida", "sans-serif"].join(
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



const page = () => {
  const [scrollState, setScrollState] = useState(false)
  const pageRef = useRef(null);
  const isMobileScreen = useMediaQuery("(max-width:600px)");
  const route = useRouter();
  const baseRoute = usePathname();

  const isEstimationPage = "/cost-estimation-calculator";


  const href = isEstimationPage
    ? "#scroll-down"
    : "/cost-estimation-calculator";

  useEffect(() => {
    if (baseRoute === "/") {
      setScrollState(false)
      route.push("/cost-estimation-calculator")
    } else if (baseRoute === "/cost-estimation-calculator") {
      setScrollState(true)
    }
  }, [href])

  typeof window !== "undefined"
    ? window.localStorage.clear()
    : false;

  return (
    <ThemeProvider theme={appTheme}>
      <Box
        sx={{ width: "100%" }}
      >
        <Box
          sx={{
            maxWidth: "1468px",
            marginRight: "auto",
            marginLeft: "auto",
            padding: "0px 34px 0px 34px"
          }}
        >
          <CustomBannerBox>
            <Box sx={{
              backgroundColor: "#F0F2FF",
              borderRadius: '2em',
              height: '100%'

            }}>
              <Box
                sx={{
                  maxWidth: "1520px",
                  marginRight: "auto",
                  marginLeft: "auto",

                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  height: '100%'
                }}
              >
                <Box
                  sx={{
                    padding: "8.6% 0 7% 6.5%",
                    display: "flex",
                    flexDirection: "column",
                    marginRight: '-61px',
                  }}
                >
                  <CustomTypography variant="h3">
                    Estimate the cost of your <br /> Software Project
                  </CustomTypography>
                  <CustomParagraph>
                    Answer simple questions, and you’ll receive an instant cost
                    estimation to help you get your project moving. Don't let
                    cost uncertainties hold you back. Define your budget
                    effortlessly with just a few clicks.
                  </CustomParagraph>

                  <Box
                    sx={{
                      display: "flex",
                    }}
                  >
                    <Link
                      href={href}
                      scroll={scrollState}
                      style={{
                        textDecoration: "none",
                        scrollBehavior: "smooth"
                      }}
                    >
                      <CustomStartButton
                        variant="contained"
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          position: "relative",
                          overflow: "hidden",
                          textTransform: "capitalize"
                        }}
                      >
                        <ArrowForwardIcon
                          sx={{
                            marginRight: "auto",
                            opacity: 0,
                            backgroundColor: appTheme.palette.primary.main,
                            color: "#fff",
                            padding: "1em",
                            position: "absolute",
                            left: "-19px",
                            borderRadius: "0 50% 50% 0",
                          }}
                        />
                        <span id="start">Start Your Project</span>
                      </CustomStartButton>
                    </Link>
                  </Box>
                </Box>

                <Box
                  sx={{
                    padding: "8.6% 6.5% 0 0",
                    height: '82vh',
                    display: 'grid',
                    gap: "1rem",
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gridTemplateRows: '10% 11% 2fr 11% 11% 1.5fr',
                    marginLeft: '-153px',
                  }}
                >
                  <Box
                    sx={{
                      gridRow: '4 / 7',
                      background: `url('https://i.ibb.co/GxZn3hj/pic5.jpg')`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: 'bottom',
                      backgroundSize: "141% 153%",
                      borderTopLeftRadius: '2rem',
                      borderTopRightRadius: '2rem',
                      width: 219
                    }}>
                  </Box>
                  <Box
                    sx={{
                      gridRow: '2 / 4', gridColumn: '2 / 3',
                      borderRadius: '2rem',
                      width: 219,
                      background: `url('https://i.ibb.co/CbF8F4b/pic1.jpg')`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: 'center',
                      backgroundSize: "cover",
                    }}
                  >
                  </Box>
                  <Box
                    sx={{
                      gridRow: '4 / 6', background: `url('https://i.ibb.co/gyrcSCy/pic3.jpg')`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: 'left bottom',
                      backgroundSize: "170%",
                      borderRadius: '2rem',
                      width: 219
                    }}>
                  </Box>
                  <Box
                    sx={{
                      gridRow: '6 / 7',
                      backgroundColor: appTheme.palette.primary.main,
                      border: `1px solid ${appTheme.palette.primary.main}`,
                      borderTopLeftRadius: '2rem',
                      borderTopRightRadius: '2rem',
                      width: 219
                    }}>
                  </Box>
                  <Box
                    sx={{
                      gridRow: '1 / 3',
                      gridColumn: '3 / 4',
                      backgroundColor: appTheme.palette.primary.main,
                      border: `1px solid ${appTheme.palette.primary.main}`,
                      borderRadius: '2rem',
                      width: 219
                    }}>
                  </Box>
                  <Box
                    sx={{
                      gridRow: '3 / 5',
                      gridColumn: '3 / 4',
                      background: `url('https://i.ibb.co/LdhYy51/pic2.jpg')`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: 'center',
                      backgroundSize: "cover",
                      borderRadius: '2rem',
                      width: 219
                    }}>
                  </Box>
                  <Box sx={{
                    gridRow: '5 / 7',
                    gridColumn: '3 / 4',
                    background: `url('https://i.ibb.co/d2pXq1b/pic4.jpg')`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: 'right',
                    backgroundSize: "cover",
                    borderTopLeftRadius: '2rem',
                    borderTopRightRadius: '2rem',
                    width: 219
                  }}>
                  </Box>
                </Box>
              </Box>
            </Box>
          </CustomBannerBox>
          <Box sx={{
            maxWidth: "1285px",
            marginRight: "auto",
            marginLeft: "auto",
            minHeight: "70vh",
            // height: "100vh",
            padding: "60px 0 60px 0"
          }}
            ref={pageRef}
            id="scroll-down"
          >
            <Box


              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                // gap: "2em",
                gap: "30px",
                flexWrap: "wrap",
                flexGrow: 1,
                margin: "auto",

              }}
            >


              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flex: 1
                }}
              >
                <CustomRouteButton
                  component={Link}
                  href={"/cost-estimation-calculator/project"}
                  sx={{
                    width: 460,
                    minHeight: 395,
                    backgroundColor: appTheme.palette.primary.main,
                    fontWeight: "600",
                    "&:hover": {
                      backgroundColor: "#0045E6",
                    },
                    "&:focus": {
                      backgroundColor: "#0045E6",
                    },
                  }}
                >
                  <Box sx={{ display: "flex", justifyContent: "flex-start", flexDirection: "column", }}>

                    <Typography variant="h5" sx={{
                      textAlign: "left",
                      paddingBottom: "26px",
                      fontWeight: 700,
                      fontSize: '30px'
                    }}>
                      Estimate Project Cost
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        textAlign: 'left',
                        fontSize: '20px'
                      }}
                    >
                      Clear project vision needed, Cost<br /> breakdown available, Understand financial aspects
                    </Typography>
                  </Box>
                  <Box sx={{
                    // float: 'right',
                    display: 'flex',
                    justifyContent: 'flex-end',
                    width: '100%'
                  }}>
                    <svg width="76" height="87" viewBox="0 0 76 87" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M0.683289 8.61155C0.683289 6.32762 1.59057 4.13724 3.20555 2.52226C4.82053 0.907285 7.01091 0 9.29484 0L56.4115 0L75.3167 18.9052V77.5039C75.3167 79.7878 74.4094 81.9782 72.7944 83.5932C71.1795 85.2082 68.9891 86.1155 66.7051 86.1155H9.29484C7.01091 86.1155 4.82053 85.2082 3.20555 83.5932C1.59057 81.9782 0.683289 79.7878 0.683289 77.5039V8.61155ZM17.9064 22.9641H35.1295V28.7052H17.9064V22.9641ZM58.0936 40.1872H17.9064V45.9282H58.0936V40.1872ZM58.0936 57.4103H40.8705V63.1513H58.0936V57.4103Z" fill="#022471" />
                    </svg>
                  </Box>


                </CustomRouteButton>
              </Box >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flex: 2
                }}
              >
                <CustomRouteButton
                  component={Link}
                  href={"/cost-estimation-calculator/staff"}
                  sx={{
                    width: 730,
                    minHeight: 395,
                    backgroundColor: '#F58D12',
                    fontWeight: "600",
                    "&:hover": {
                      backgroundColor: "#e37b01",
                    },
                    "&:focus": {
                      backgroundColor: "#e37b01",
                    },
                  }}
                >

                  <Box sx={{ display: "flex", justifyContent: "flex-start", flexDirection: "column", }}>

                    <Typography variant="h5" sx={{
                      textAlign: "left",
                      paddingBottom: "26px",
                      fontWeight: 700,
                      fontSize: '30px'
                    }}>
                      Estimate Team Cost
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        textAlign: 'left',
                        fontSize: '20px'
                      }}
                    >
                      Skilled professionals available, Seek expertise<br /> and guidance, Dedicated team support
                    </Typography>
                  </Box>

                  <Box sx={{
                    // float: 'right',
                    display: 'flex',
                    justifyContent: 'flex-end',
                    width: '100%'
                  }}>
                    <svg width="118" height="89" viewBox="0 0 118 89" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M51.625 89C51.625 89 44.25 89 44.25 81.5833C44.25 74.1667 51.625 51.9167 81.125 51.9167C110.625 51.9167 118 74.1667 118 81.5833C118 89 110.625 89 110.625 89H51.625ZM81.125 44.5C86.9929 44.5 92.6205 42.1558 96.7697 37.9831C100.919 33.8104 103.25 28.1511 103.25 22.25C103.25 16.3489 100.919 10.6896 96.7697 6.51687C92.6205 2.34419 86.9929 0 81.125 0C75.2571 0 69.6295 2.34419 65.4803 6.51687C61.331 10.6896 59 16.3489 59 22.25C59 28.1511 61.331 33.8104 65.4803 37.9831C69.6295 42.1558 75.2571 44.5 81.125 44.5ZM38.468 89C37.3752 86.6845 36.83 84.146 36.875 81.5833C36.875 71.5337 41.89 61.1875 51.153 53.9933C46.5302 52.5577 41.7128 51.8571 36.875 51.9167C7.375 51.9167 0 74.1667 0 81.5833C0 89 7.375 89 7.375 89H38.468ZM33.1875 44.5C38.0774 44.5 42.7671 42.5465 46.2248 39.0693C49.6825 35.592 51.625 30.8759 51.625 25.9583C51.625 21.0408 49.6825 16.3246 46.2248 12.8474C42.7671 9.37016 38.0774 7.41667 33.1875 7.41667C28.2976 7.41667 23.6079 9.37016 20.1502 12.8474C16.6925 16.3246 14.75 21.0408 14.75 25.9583C14.75 30.8759 16.6925 35.592 20.1502 39.0693C23.6079 42.5465 28.2976 44.5 33.1875 44.5Z" fill="#C76C00" />
                    </svg>
                  </Box>
                </CustomRouteButton>
              </Box>
            </Box>
          </Box>

        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default page;
