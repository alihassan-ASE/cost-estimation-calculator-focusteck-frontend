"use client"
import React, { useState, useEffect, useRef } from 'react'
import { Box, Typography, Button, useMediaQuery } from "@mui/material";
import { styled, } from "@mui/material/styles";
import Link from "next/link";
import { usePathname } from 'next/navigation'


const CustomImageBox = styled(Box)(({ theme }) => ({
    color: "white",
    background: `url('https://i.ibb.co/brCSybX/thank-you.png')`,
    backgroundRepeat: "no-repeat",
    objectFit: "cover",
    backgroundSize: "cover",
    backgroundPosition: "center",
    width: "303px",
    height: "303px",
    [theme.breakpoints.down("md")]: {
        height: "60vh"
    },
    [theme.breakpoints.down("sm")]: {
        height: "45vh"
    },
}));

const CustomButton = styled(Button)(({ theme }) => ({
    color: "#fff",
    backgroundColor: "#005DBD",
    border: "1px solid #005DBD",
    textTransform: "none",
    fontSize: "14px",
    padding: "15px 38.5px",
    lineHeight: 1.5,
    fontWeight: "normal",
    borderRadius: "4px",
    minwidth: "140px",
    display: "flex",
    flexWrap: "wrap",
    marginTop: '50px',
    transition:
        "background-color 600ms cubic-bezier(0.4, 0, 0.2, 1) 100ms,border-color 600ms cubic-bezier(0.4, 0, 0.2, 1) 100ms,color 600ms cubic-bezier(0.4, 0, 0.2, 1) 100ms",
    fontFamily: ["Aeonik", "Poppins", "Helvetica", "Arial", "Lucida", "sans-serif"].join(
        ","
    ),
    "&:hover": {
        color: "#fff",
        backgroundColor: "#005DBD",
        border: "1px solid #005DBD",
    },
    "&:active": {
        color: "#fff",
        backgroundColor: "#005DBD",
        border: "1px solid #005DBD",
    },
    "&:focus": {
        color: "#fff",
        backgroundColor: "#005DBD",
        border: "1px solid #005DBD",
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
    const pathname = usePathname()
    const isNarrowScreen = useMediaQuery("(max-width:1200px)");
    const isMobileScreen = useMediaQuery("(max-width:400px)");
    let response =
        typeof window !== "undefined"
            ? window.localStorage.getItem("Response")
            : false;

    if (response) {
        typeof window !== "undefined"
            ? window.localStorage.clear()
            : false;
    }
    const pageRef = useRef(null);


    useEffect(() => {
        if (pageRef.current) {
            pageRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, []);

    return (
        <Box
            ref={pageRef}
            sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: 'column',
                // justifyContent: "space-between",
                flexWrap: isNarrowScreen ? "wrap" : "nowrap",
                padding: '34px 20 89px 0',
            }}>
            <Box sx={{
                height: "100%", width: isNarrowScreen ? "100%" : "50% ",
                display: 'flex',
                justifyContent: 'center'
            }}>
                <CustomImageBox>

                </CustomImageBox>
            </Box>
            <Box sx={{
                // padding: isMobileScreen ? "1em 1.5em" : "1em .5em 1em 3em",
                // maxWidth: '538px',
                // margin: "auto"
                display: 'flex',
                flexDirection: 'column',
                justifyContent: "center",
                alignItems: 'center'
                // padding: '0 7%'
            }}>
                <Typography variant='h4' sx={{ fontWeight: "600", padding: "0 0 30px 0", fontSize: '30px' }}>Thank You for Reaching Out!</Typography>
                <Typography variant='body1' sx={{ paddingBottom: "35px", fontSize: '26px', fontWeight: 400 }}>We’ll get back to you shortly.</Typography>

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: "center",
                        alignItems: 'center'
                    }}>
                    <Typography variant='h5' sx={{ fontSize: '26px', fontWeight: 400 }}>In the meantime, explore the newest case studies from our clients.</Typography>
                    <Typography variant='body1' sx={{ paddingTop: "15px", fontSize: '20px', fontWeight: 400 }}>Our team is here to help you replicate their success for your business.</Typography>
                    <Link
                        target='_blank'
                        href="https://focusteck.com/success-stories/"
                        style={{ textDecoration: "none" }}>
                        <CustomButton>Discover success stories</CustomButton>
                    </Link>
                </Box>
            </Box>
        </Box >
    )
}

export default page