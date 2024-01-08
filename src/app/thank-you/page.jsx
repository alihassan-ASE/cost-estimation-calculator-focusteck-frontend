"use client"
import React, { useState, useEffect } from 'react'
import { Box, Typography, Button, useMediaQuery } from "@mui/material";
import { styled, } from "@mui/material/styles";
import { useRouter } from "next/navigation";
import Link from "next/link";


const CustomImageBox = styled(Box)(({ theme }) => ({
    color: "white",
    background: `url('https://eleks.com/wp-content/uploads/thank-you-page-img-1.jpg')`,
    backgroundRepeat: "no-repeat",
    objectFit: "cover",
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100vh",
    [theme.breakpoints.down("md")]: {
        height: "60vh"
    },
    [theme.breakpoints.down("sm")]: {
        height: "45vh"
    },
}));

const CustomButton = styled(Button)(({ theme }) => ({
    color: "#fff",
    backgroundColor: "#1e1d28",
    border: "1px solid #1e1d28",
    textTransform: "none",
    fontSize: "13px",
    padding: "1.2em 3.5em",
    lineHeight: 1.5,
    fontWeight: "normal",
    borderRadius: "2em",
    minwidth: "140px",
    display: "flex",
    flexWrap: "wrap",
    margin: "2.5em 1em",
    transition:
        "background-color 600ms cubic-bezier(0.4, 0, 0.2, 1) 100ms,border-color 600ms cubic-bezier(0.4, 0, 0.2, 1) 100ms,color 600ms cubic-bezier(0.4, 0, 0.2, 1) 100ms",
    fontFamily: ["Poppins", "Helvetica", "Arial", "Lucida", "sans-serif"].join(
        ","
    ),
    "&:hover": {
        color: "#fff",
        backgroundColor: "#0045e6",
        border: "1px solid #0045e6",
    },
    "&:active": {
        color: "#fff",
        backgroundColor: "#0045e6",
        border: "1px solid #0045e6",
    },
    "&:focus": {
        color: "#fff",
        backgroundColor: "#0045e6",
        border: "1px solid #0045e6",
    },
    [theme.breakpoints.down("md")]: {
        fontSize: "13px",
        padding: ".9em 2.5em",
    },
    [theme.breakpoints.down("sm")]: {
        fontSize: "13px",
        padding: ".9em 2em",

    },
}));


const page = () => {
    const isNarrowScreen = useMediaQuery("(max-width:1200px)");
    let response =
        typeof window !== "undefined"
            ? window.localStorage.getItem("Response")
            : false;

    if (response) {
        typeof window !== "undefined"
            ? window.localStorage.clear()
            : false;
    }




    return (
        <Box
            sx={{
                display: "flex",
                // width: "100%",
                alignItems: "center",
                flexWrap: isNarrowScreen ? "wrap" : "nowrap"
            }}>
            <Box sx={{
                padding: "1em 0 1em 3em",
                // width: "50%"
            }}>
                <Typography variant='h4' sx={{ fontWeight: "600", padding: "1em 0 .5em 0" }}>Thank You for Reaching Out!</Typography>
                <Typography variant='body1' sx={{ paddingBottom: "4em" }}>We’ll get back to you shortly.</Typography>

                <Box
                    sx={{
                        paddingRight: "3em"
                    }}>
                    <Typography variant='h5'>In the meantime, explore the newest case studies from our clients.</Typography>
                    <Typography variant='body1' sx={{ padding: ".8em 0" }}>Our team is here to help you replicate their success for your business.</Typography>
                    <Link
                        target='_blank'
                        href="https://focusteck.com/success-stories/"
                        style={{ textDecoration: "none" }}>
                        <CustomButton>Discover success stories</CustomButton>
                    </Link>
                </Box>
            </Box>
            <Box
                sx={{ height: "100%", width: isNarrowScreen ? "100%" : "50% ", }}
            >
                < CustomImageBox >

                </CustomImageBox>
            </Box >
        </Box >
    )
}

export default page