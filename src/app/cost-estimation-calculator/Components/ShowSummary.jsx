"use client";
import React, { useEffect, useState } from "react";
import { Box, Button, Typography, useMediaQuery, Breadcrumbs } from "@mui/material";
import { styled } from "@mui/material/styles";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import Link from "next/link";
import Form from "../Components/Form";
import { useRouter } from "next/navigation";

const CustomMainBox = styled(Box)(({ theme }) => ({
  // margin: '5em 0 2em 0',
  [theme.breakpoints.down("md")]: {
    // margin: "1em 2em",
  },
  [theme.breakpoints.down("sm")]: {
    // margin: "1em .5em",
  },
}));

const CustomBox = styled(Box)(({ theme }) => ({
  backgroundColor: "#005DBD",
  padding: "26px 25px",
  borderRadius: "20px",
  maxWidth: '480px',
  // width: "45%",
  margin: "1em 0",
  height: '194px',
  // width: "100%",
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  [theme.breakpoints.down("md")]: {
    flexWrap: "wrap"
  },
  [theme.breakpoints.down("sm")]: {
    padding: "1em",
    // minWidth: "200px",
  },
}));

const CustomInfoBox = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    flexWrap: "wrap"
  },
  [theme.breakpoints.down("sm")]: {
    flexWrap: "wrap"
  },
}));

const CustomNormalTypography = styled(Typography)(({ theme }) => ({
  fontFamily: ["Aeonik", "Poppins", "Helvetica", "Arial", "Lucida", "sans-serif"].join(
    ","
  ),
}));

const CustomTypography = styled(Typography)(({ theme }) => ({
  color: "#fff",
  fontSize: "2em",
  fontFamily: ["Aeonik", "Poppins", "Helvetica", "Arial", "Lucida", "sans-serif"].join(
    ","
  ),
  [theme.breakpoints.down("sm")]: {
    fontSize: "1em",
  },
}));

const CustomButton = styled(Button)(({ theme }) => ({
  color: "#fff",
  backgroundColor: "#005DBD",
  border: "1px solid #005DBD",
  boxShadow: "0 0 5px 0 rgba(163,163,163,0.75)",
  textTransform: "none",
  textDecoration: "none",
  fontSize: "0.9rem",
  textAlign: "center",
  padding: "15px 25px",
  lineHeight: 1.5,
  fontWeight: "normal",
  borderRadius: "5px",
  width: "200px",
  display: "flex",
  flexWrap: "wrap",
  transition:
    "background-color 600ms cubic-bezier(0.4, 0, 0.2, 1) 100ms, box-shadow 600ms cubic-bezier(0.4, 0, 0.2, 1) 100ms,border-color 600ms cubic-bezier(0.4, 0, 0.2, 1) 100ms,color 600ms cubic-bezier(0.4, 0, 0.2, 1) 100ms",
  fontFamily: ["Aeonik", "Poppins", "Helvetica", "Arial", "Lucida", "sans-serif"].join(
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
  "&.Mui-disabled": {
    color: "white",
    backgroundColor: "#D7D7D7",
    borderColor: "#D7D7D7"
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
  textDecoration: "underline",
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



const ShowSummary = ({ name, response }) => {

  const hasResponse = window.localStorage.getItem('Response');
  const [timeline, setTimeline] = useState("");
  const [systemType, setSystemType] = useState("");
  const [industry, setIndustry] = useState("");
  const [actualResponse, setActualResponse] = useState({});
  const [openForm, setOpenForm] = useState(false)
  const isNarrowScreen = useMediaQuery("(max-width:421.5px)");
  const centerButtons = useMediaQuery("(max-width:420px)");
  const route = useRouter();
  const handleForm = () => {
    setOpenForm(true)
  }

  const handleClose = () => setOpenForm(false)

  const getActualResponse = (value, formData) => {
    setOpenForm(value)
    setActualResponse(formData);
    let data = JSON.stringify(formData);
    if (data) {
      localStorage.setItem("Name", name);
      localStorage.setItem("Response", data);
    }
  };

  useEffect(() => {
    let data = JSON.stringify(response);
    let type = JSON.stringify(name);
    if (data) {
      localStorage.setItem("Name", type);
      localStorage.setItem("Response", data);
    }
  }, [])

  useEffect(() => {
    {
      response.responses.map((data, index) => {
        if (data.label === "engagement period") {
          data.selectedData?.map((value) => {
            setTimeline(value.opt);
            response.timeline = value.opt
          });
        }
        if (data.question?.label === "project timeline") {
          data.selectedOption.map((value) => {
            setTimeline(value.opt);
            response.timeline = value.opt
          });
        }
        if ((data.label || data.question?.label) === "type of industry") {
          (data.selectedData || data.selectedOption).map((value) => {
            setIndustry(value.opt);
            response.industry = value.opt
          });
        }
        if ((data.label || data.question?.label) === "system type") {
          (data.selectedData || data.selectedOption).map((value) => {
            setSystemType(value.opt);
            response.systemType = value.opt
          });

        }
      });
    }
  }, [response]);

  return (
    <>
      {
        !openForm
          ? <CustomMainBox>
            <Box sx={{ marginBottom: '30px' }}>
              <Typography variant="h1" sx={{
                fontSize: '60px',
                fontWeight: 700,
                marginBottom: '20px'
              }}>Estimate {name} Cost</Typography>
              <div role="presentation">
                <Breadcrumbs aria-label="breadcrumb">
                  <Link underline="hover" color="black" href="/">Home</Link>
                  <Link underline="hover" color="black" href="/cost-estimation-calculator">Cost Estimation Calculator</Link>
                  <Link underline="hover" color="black" href={name === "Team" ? '/cost-estimation-calculator/staff' : '/cost-estimation-calculator/project'}>{name}</Link>
                </Breadcrumbs>
              </div>
            </Box>

            <Box sx={{ marginBottom: "14px" }}>
              <CustomNormalTypography
                variant="body1"
                sx={{ color: "#000", fontSize: "30px", fontWeight: 700, marginBottom: '25px' }}
              >
                Your Result
              </CustomNormalTypography>
              <CustomNormalTypography
                variant="body1"
                sx={{ color: "#373737", }}
              >
                Based on the answers you provided, we've estimated a price range for
                your software project:
              </CustomNormalTypography>
              {/* <CustomNormalTypography
                variant="h4"
                sx={{ color: "#1e1d28", marginBottom: "30px " }}
              >
                {systemType && industry
                  ? `${systemType} for ${industry}`
                  : null
                }

              </CustomNormalTypography> */}
            </Box>

            <CustomInfoBox sx={{ display: "flex", gap: ".5em", maxWidth: '500px', flexDirection: 'column' }}>
              <CustomBox>
                <Box>
                  <Box sx={{ display: "flex", alignItems: 'center', justifyContent: "space-between", marginBottom: '12px' }}>
                    <CustomNormalTypography
                      variant="h6"
                      sx={{ color: "#fff", fontSize: "20px", fontWeight: 400, lineHeight: '13px' }}
                    >
                      Estimated Cost
                    </CustomNormalTypography>
                    <CustomNormalTypography
                      sx={{ color: "#fff", textDecoration: 'underline', lineHeight: '13px', ":hover": { cursor: "pointer" } }}
                      onClick={() => { route.push("/cost-estimation-calculator/submit") }}
                    >
                      View Details
                    </CustomNormalTypography>
                  </Box>
                  <CustomTypography sx={{ fontSize: "60px", fontWeight: 500, lineHeight: '50px' }}>${response.totalCost}.00</CustomTypography>
                </Box>

                <Box>
                  <CustomNormalTypography
                    variant="h6"
                    sx={{ color: "#fff", fontSize: "16px", fontWeight: 250, marginBottom: '5px', lineHeight: '12px' }}
                  >
                    Timeline
                  </CustomNormalTypography>

                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: "space-between" }}>
                    <CustomNormalTypography sx={{ color: '#fff', fontSize: '20px', fontWeight: 500 }}>
                      {
                        timeline.toLowerCase() === "3-6 months" || timeline.toLowerCase() === "short-term (1-3 months)"
                          ? "Short Term"
                          : timeline.toLowerCase() === "6-12 months" || timeline.toLowerCase() === "medium-term (3-6 months)"
                            ? "Medium Term"
                            : "Long Term"
                      }
                    </CustomNormalTypography>
                    <CustomNormalTypography sx={{ color: '#fff', wordBreak: timeline.length > 4 ? "break-word" : "normal", fontSize: '20px', fontWeight: 500 }}>
                      {
                        timeline === "Long Term" || timeline === "Long-term (6+ months)"
                          ? '6+ Months'
                          : timeline.toLowerCase() === "short-term (1-3 months)"
                            ? "1-3 Months"
                            : timeline.toLowerCase() === "medium-term (3-6 months)"
                              ? "3-6 Months"
                              : timeline
                      }
                    </CustomNormalTypography>
                  </Box>
                </Box>

              </CustomBox>

              <CustomBottomBox
                sx={{
                  display: "flex",
                  gap: "20PX",
                  flexDirection: 'column',
                  alignItems: 'center',
                  marginTop: "24px",
                }}
              >


                {hasResponse ? (

                  <CustomButton
                    onClick={handleForm}
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
                          backgroundColor: "#005DBD",

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

                    <span id="forward" style={{ fontSize: '16px', fontWeight: 400 }}>Start Project</span>{" "}
                    <ArrowRightAltIcon
                      sx={{
                        marginLeft: "auto",
                        opacity: 0,
                        color: "#fff",
                        position: "absolute",
                        right: "-19px",
                        padding: ".7em",
                        borderRadius: "0 50% 50% 0",
                      }}
                    />{" "}
                  </CustomButton>
                ) : (
                  <CustomButton
                    disabled
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >

                    <span style={{ textDecoration: "none", fontSize: '16px', fontWeight: 400 }} id="forward">Start Project</span>{" "}
                    <ArrowRightAltIcon
                      sx={{
                        marginLeft: "auto",
                        opacity: 0,
                        color: "#fff",
                        position: "absolute",
                        right: "-19px",
                        padding: ".7em",
                        borderRadius: "0 50% 50% 0",
                      }}
                    />{" "}
                  </CustomButton>
                )}
                <Box sx={{ display: "flex", gap: "2em", flexWrap: "wrap", justifyContent: "center", alignItems: "center" }}>

                  {
                    isNarrowScreen
                      ? <CustomLinkBox href="/cost-estimation-calculator"
                      >
                        <CustomNormalTypography sx={{ color: "#1E1D28", fontSize: '14px', fontWeight: 400 }}>
                          Calculate Another Project
                        </CustomNormalTypography>

                      </CustomLinkBox>
                      : <CustomLinkBox href="/cost-estimation-calculator">

                        <CustomNormalTypography sx={{ color: "#1E1D28", fontSize: '14px', fontWeight: 400 }}>
                          Calculate Another Project
                        </CustomNormalTypography>

                      </CustomLinkBox>
                  }

                </Box>
              </CustomBottomBox>
            </CustomInfoBox>


          </CustomMainBox>
          :
          <Box>
            <Box sx={{ marginBottom: '30px', display: "flex", flexDirection: "column", alignItems: "center" }}>
              <Typography variant="h1" sx={{
                fontSize: '40px',
                fontWeight: 700,
                marginBottom: '20px'
              }}>Estimate {name} Cost</Typography>
              <div role="presentation">
                <Breadcrumbs aria-label="breadcrumb">
                  <Link underline="hover" color="black" href="/">Home</Link>
                  <Link underline="hover" color="black" href="/cost-estimation-calculator">Cost Estimation Calculator</Link>
                  <Link underline="hover" color="black" href={name === "Team" ? '/cost-estimation-calculator/staff' : '/cost-estimation-calculator/project'}>{name}</Link>
                </Breadcrumbs>
              </div>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: "17px" }}>
              <Box onClick={handleClose}
                sx={{
                  "&:hover": {
                    cursor: "pointer"
                  },
                }}>
                <svg width="14" height="24" viewBox="0 0 14 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 12L12 22" stroke="black" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </Box>

              <Typography variant="h6" sx={{ fontSize: "30px", fontWeight: 700, }}>
                Get in Touch</Typography>
            </Box>
            <Form response={response} getActualResponse={getActualResponse} />
          </Box>
      }
    </>
  );
};

export default ShowSummary;
