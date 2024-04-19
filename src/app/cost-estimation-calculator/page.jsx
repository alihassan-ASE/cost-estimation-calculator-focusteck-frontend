"use client";
import React, { useRef, useEffect } from "react";
import Link from "next/link";
import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import { styled } from "@mui/material/styles";

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
  fontFamily: ["Poppins", "Helvetica", "Arial", "Lucida", "sans-serif"].join(
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


const page = () => {
  const pageRef = useRef(null);
  const isMobileScreen = useMediaQuery("(max-width:600px)");


  useEffect(() => {
    if (pageRef.current) {
      pageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  typeof window !== "undefined"
    ? window.localStorage.clear()
    : false;

  return (
    <Box
      ref={pageRef}
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "2em",
        flexWrap: "wrap",
        padding: "1em 8.5%",
        flexGrow: 1,
        margin: "auto",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CustomRouteButton
          component={Link}
          href={"/cost-estimation-calculator/project"}
          sx={{
            width: 460,
            height: 395,
            backgroundColor: '#005DBD',
            fontWeight: "600",
            "&:hover": {
              backgroundColor: "#0045e6",
            },
            "&:focus": {
              backgroundColor: "#0045e6",
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
            float: 'right',
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
        }}
      >
        <CustomRouteButton
          component={Link}
          href={"/cost-estimation-calculator/staff"}
          sx={{
            width: 730,
            height: 395,
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
            float: 'right',
            display: 'flex',
            justifyContent: 'flex-end',
            width: '100%'
          }}>
            <svg width="118" height="89" viewBox="0 0 118 89" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M51.625 89C51.625 89 44.25 89 44.25 81.5833C44.25 74.1667 51.625 51.9167 81.125 51.9167C110.625 51.9167 118 74.1667 118 81.5833C118 89 110.625 89 110.625 89H51.625ZM81.125 44.5C86.9929 44.5 92.6205 42.1558 96.7697 37.9831C100.919 33.8104 103.25 28.1511 103.25 22.25C103.25 16.3489 100.919 10.6896 96.7697 6.51687C92.6205 2.34419 86.9929 0 81.125 0C75.2571 0 69.6295 2.34419 65.4803 6.51687C61.331 10.6896 59 16.3489 59 22.25C59 28.1511 61.331 33.8104 65.4803 37.9831C69.6295 42.1558 75.2571 44.5 81.125 44.5ZM38.468 89C37.3752 86.6845 36.83 84.146 36.875 81.5833C36.875 71.5337 41.89 61.1875 51.153 53.9933C46.5302 52.5577 41.7128 51.8571 36.875 51.9167C7.375 51.9167 0 74.1667 0 81.5833C0 89 7.375 89 7.375 89H38.468ZM33.1875 44.5C38.0774 44.5 42.7671 42.5465 46.2248 39.0693C49.6825 35.592 51.625 30.8759 51.625 25.9583C51.625 21.0408 49.6825 16.3246 46.2248 12.8474C42.7671 9.37016 38.0774 7.41667 33.1875 7.41667C28.2976 7.41667 23.6079 9.37016 20.1502 12.8474C16.6925 16.3246 14.75 21.0408 14.75 25.9583C14.75 30.8759 16.6925 35.592 20.1502 39.0693C23.6079 42.5465 28.2976 44.5 33.1875 44.5Z" fill="#C76C00" />
            </svg>
          </Box>
        </CustomRouteButton>
      </Box >
    </Box >
  );
};

export default page;
