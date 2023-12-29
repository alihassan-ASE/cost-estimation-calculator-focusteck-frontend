"use client";
import React, { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import RefreshIcon from "@mui/icons-material/Refresh";
import Link from "next/link";

const CustomMainBox = styled(Box)(({ theme }) => ({
  margin: "1em 3em",
  [theme.breakpoints.down("md")]: {
    margin: "1em 2em",
  },
  [theme.breakpoints.down("sm")]: {
    margin: "1em .5em",
  },
}));

const CustomBox = styled(Box)(({ theme }) => ({
  backgroundColor: "#1E1D28",
  padding: "2em",
  borderRadius: "10px",
  minWidth: "250px",
  [theme.breakpoints.down("sm")]: {
    padding: "1em",
  },
}));

const CustomNormalTypography = styled(Typography)(({ theme }) => ({
  fontFamily: ["Poppins", "Helvetica", "Arial", "Lucida", "sans-serif"].join(
    ","
  ),
}));

const CustomTypography = styled(Typography)(({ theme }) => ({
  color: "#fff",
  fontSize: "2em",
  fontFamily: ["Poppins", "Helvetica", "Arial", "Lucida", "sans-serif"].join(
    ","
  ),
}));

const CustomButton = styled(Link)(({ theme }) => ({
  color: "#fff",
  backgroundColor: "#0045e6",
  border: "1px solid #0045e6",
  boxShadow: "0 0 5px 0 rgba(163,163,163,0.75)",
  textTransform: "none",
  fontSize: "0.9rem",
  textAlign: "center",
  padding: ".3em 1em",
  lineHeight: 1.5,
  fontWeight: "normal",
  textDecoration: "none",
  borderRadius: "5px",
  width: "200px",
  display: "flex",
  flexWrap: "wrap",
  transition:
    "background-color 600ms cubic-bezier(0.4, 0, 0.2, 1) 100ms, box-shadow 600ms cubic-bezier(0.4, 0, 0.2, 1) 100ms,border-color 600ms cubic-bezier(0.4, 0, 0.2, 1) 100ms,color 600ms cubic-bezier(0.4, 0, 0.2, 1) 100ms",
  fontFamily: ["Poppins", "Helvetica", "Arial", "Lucida", "sans-serif"].join(
    ","
  ),
  "&:hover": {
    color: "#000",
    backgroundColor: "#fff",
    border: "1px solid #000",
  },
  "&:active": {
    color: "#000",
    backgroundColor: "#fff",
    border: "1px solid #000",
  },
  "&:focus": {
    color: "#000",
    backgroundColor: "#fff",
    border: "1px solid #000",
  },
}));

const CustomBottomBox = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
  },
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
  },
}));

const CustomLinkBox = styled(Link)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  textDecoration: "none",

  gap: ".5em",
  "&:hover": {
    "& svg": {
      transform: "rotate(360deg)",
      transition: "transform 0.7s ease-in-out",
    },
    "&:before": {
      transform: "scale(1, 1)",
      textIndent: 0,
    },
  },
}));

const ShowSummary = ({ response }) => {
  const [timeline, setTimeline] = useState("");
  useEffect(() => {
    {
      response.responses.map((data) => {
        if (data.label === "engagement period") {
          data.selectedData.map((value) => {
            setTimeline(value.opt);
          });
        }
      });
    }
  }, [response]);
  return (
    <CustomMainBox>
      <Box>
        <CustomNormalTypography
          variant="h5"
          sx={{ color: "#89899C", fontWeight: 600, padding: "12px 0" }}
        >
          Your Results
        </CustomNormalTypography>
        <CustomNormalTypography
          variant="body1"
          sx={{ color: "#373737", marginBottom: "14px " }}
        >
          Based on the answers you provided, we've estimated a price range for
          your software project:
        </CustomNormalTypography>
        <CustomNormalTypography
          variant="h4"
          sx={{ color: "#1e1d28", marginBottom: "30px " }}
        >
          Blockchain-based system for healthcare
        </CustomNormalTypography>
      </Box>

      <Box sx={{ display: "flex", gap: ".5em", flexWrap: "wrap" }}>
        <CustomBox>
          <CustomNormalTypography
            variant="h6"
            sx={{ color: "#fff", fontSize: "1.1em" }}
          >
            Project Cost
          </CustomNormalTypography>
          <CustomTypography>{response.totalCost} $</CustomTypography>
        </CustomBox>
        <CustomBox>
          <CustomNormalTypography
            variant="h6"
            sx={{ color: "#fff", fontSize: "1.1em" }}
          >
            Timeline
          </CustomNormalTypography>
          <CustomTypography>{timeline ? timeline : "default"}</CustomTypography>
        </CustomBox>
      </Box>

      <CustomBottomBox
        sx={{
          display: "flex",
          gap: "2em",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: "40px",
        }}
      >
        <Box sx={{ display: "flex", gap: "2em" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: ".5em",
              "&:hover": {
                cursor: "pointer",
                "& #slide": {
                  backgroundColor: "#005DBD",
                  transition: "background-color 0.5s ease-in-out",
                },
                "& svg": {
                  marginLeft: "5px",
                  transition: "margin-left 0.5s ease-in-out",
                },
                "&:before": {
                  transform: "scale(1, 1)",
                  textIndent: 0,
                },
              },
            }}
          >
            <Box>
              <CustomNormalTypography sx={{ color: "#1E1D28" }}>
                Send Results
              </CustomNormalTypography>
              <CustomNormalTypography sx={{ color: "#1E1D28" }}>
                to my mail
              </CustomNormalTypography>
            </Box>

            <Box
              sx={{
                color: "#fff",
                backgroundColor: "#1E1D28",
                borderRadius: "50%",
                width: "57px",
                height: "57px",
              }}
              id="slide"
            >
              <ArrowRightAltIcon
                sx={{
                  padding: ".7em",
                }}
              />
            </Box>
          </Box>
          <CustomLinkBox href="/cost-estimation-calculator">
            <Box>
              <CustomNormalTypography sx={{ color: "#1E1D28" }}>
                Calculate new
              </CustomNormalTypography>
              <CustomNormalTypography sx={{ color: "#1E1D28" }}>
                Project cost
              </CustomNormalTypography>
            </Box>

            <Box
              sx={{
                border: "3px solid #b8b8b8",
                borderRadius: "50%",
                width: "57px",
                height: "57px",
              }}
            >
              <RefreshIcon
                sx={{
                  color: "#b8b8b8",
                  padding: ".7em",
                }}
              />
            </Box>
          </CustomLinkBox>
        </Box>

        <CustomButton
          href="/cost-estimation-calculator/submit"
          sx={{
            display: "flex",
            alignItems: "center",
            position: "relative",
            overflow: "hidden",
            "&:hover": {
              cursor: "pointer",
              backgroundColor: "#fff",
              boxShadow: "none",
              color: "#000",
              "& #forward": {
                marginRight: "30px",
                transition: "margin-right 0.2s ease-in-out",
              },
              "& svg": {
                backgroundColor: "#0045e6",

                opacity: 1,
                marginRight: "15px",
                transition:
                  "margin-right 0.2s ease-in-out, border-color 0.2s ease-in-out",
                borderRadius: "50% 0 0 50%",
              },
              "&:before": {
                transform: "scale(1, 1)",
                textIndent: 0,
              },
            },
          }}
        >
          <span id="forward">Show Response</span>{" "}
          <ArrowRightAltIcon
            sx={{
              marginLeft: "auto",
              opacity: 0,
              color: "#fff",
              position: "absolute",
              right: "-19px",
              padding: ".5em",
              borderRadius: "0 50% 50% 0",
            }}
          />{" "}
        </CustomButton>
      </CustomBottomBox>
    </CustomMainBox>
  );
};

export default ShowSummary;