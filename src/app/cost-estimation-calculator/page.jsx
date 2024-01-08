"use client";
import React, { useRef, useEffect } from "react";
import Link from "next/link";
import { Box, Button } from "@mui/material";
import AccountTreeOutlinedIcon from "@mui/icons-material/AccountTreeOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import { styled } from "@mui/material/styles";
import { textAlign } from "@mui/system";

const CustomRouteButton = styled(Button)(({ theme }) => ({
  color: "#000",
  width: 500,
  height: 500,
  boxShadow: "none",
  textTransform: "none",
  fontSize: "1.3rem",
  padding: "4em 2em",
  lineHeight: 1.5,
  backgroundColor: "#F8F8F9",
  fontWeight: "normal",
  borderRadius: "10px",
  minwidth: "140px",
  minHeight: "200px",
  textAlign: "center",
  display: "flex",
  flexWrap: "wrap",
  flexDirection: "column",
  flexGrow: 1,
  flexShrink: 1,
  gap: ".5em",
  fontFamily: ["Poppins", "Helvetica", "Arial", "Lucida", "sans-serif"].join(
    ","
  ),
  "&:hover": {
    backgroundColor: "#0045e6",
    color: "#fff",
  },
  "&:focus": {
    backgroundColor: "#0045e6",
    color: "#fff",
  },

  [theme.breakpoints.down("md")]: {
    // fontSize: "1rem",
    width: 300,
    height: 300,
  },
  [theme.breakpoints.down("sm")]: {
    // fontSize: ".8rem",
    width: 300,
    height: 300,
  },
}));

const LINKS = [
  {
    text: "Estimate Project Cost",
    href: "/cost-estimation-calculator/project",
    icon: AccountTreeOutlinedIcon,
    description: [
      "Clear project vision needed",
      "Cost breakdown available",
      "Understand financial aspects",
    ],
  },
  {
    text: "Estimate Team Cost",
    href: "/cost-estimation-calculator/staff",
    icon: GroupsOutlinedIcon,
    description: [
      "Skilled professionals available",
      "Seek expertise and guidance",
      "Dedicated team support",
    ],
  },
];


const page = () => {
  const pageRef = useRef(null);

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
        justifyContent: "center",
        alignItems: "center",
        gap: "2em",
        flexWrap: "wrap",
        padding: "1em 0",
        flexGrow: 1,
        margin: "auto",
      }}
    >
      {LINKS.map(({ text, href, icon: Icon , description}) => (
        <Box
          key={href}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CustomRouteButton
            component={Link}
            href={href}
            sx={{
              "&:hover svg": {
                color: "#fff",
              },
              "&:focus svg": {
                color: "#fff",
              },
            }}
          >
            <Icon
              sx={{
                fontSize: "2em",
                color: "#0045e6",
                "&:hover": { color: "#fff" },
              }}
            />

            <Box sx={{fontWeight:"bold"}}>
            {text}
            </Box>
            <ul style={{textAlign:"left",color:"#95a5a6",fontSize:"14px"}}>
            {description.map((point, idx) => (
              <li key={idx}>{point}</li>
            ))}
          </ul>
          </CustomRouteButton>
        </Box>
      ))}
    </Box>
  );
};

export default page;
