"use client";
import React, { useEffect, useState } from "react";
import { Box, Button, Typography, useMediaQuery, Modal } from "@mui/material";
import { styled } from "@mui/material/styles";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import RefreshIcon from "@mui/icons-material/Refresh";
import Link from "next/link";
import Form from "../Components/Form";
import { useRouter } from "next/navigation";

const CustomMainBox = styled(Box)(({ theme }) => ({
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
  // minWidth: "200px",
  width: "100%",
  [theme.breakpoints.down("md")]: {
    flexWrap: "wrap"
  },
  [theme.breakpoints.down("sm")]: {
    padding: "1em",
    minWidth: "200px",
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
  [theme.breakpoints.down("sm")]: {
    fontSize: "1em",
  },
}));

const CustomButton = styled(Button)(({ theme }) => ({
  color: "#fff",
  backgroundColor: "#0045e6",
  border: "1px solid #0045e6",
  boxShadow: "0 0 5px 0 rgba(163,163,163,0.75)",
  textTransform: "none",
  textDecoration: "none",
  fontSize: "0.9rem",
  textAlign: "center",
  padding: ".3em 1em",
  lineHeight: 1.5,
  fontWeight: "normal",
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

  const hasResponse = window.localStorage.getItem('Response');
  const [timeline, setTimeline] = useState("");
  const [systemType, setSystemType] = useState("");
  const [industry, setIndustry] = useState("");
  const [actualResponse, setActualResponse] = useState({});
  const [openForm, setOpenForm] = useState(false)
  const isNarrowScreen = useMediaQuery("(max-width:445px)");
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
      localStorage.setItem("Response", data);
    }
  };

  useEffect(() => {
    let data = JSON.stringify(response);
    if (data) {
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

            <Box>
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
                {systemType && industry
                  ? `${systemType} for ${industry}`
                  : null
                }

              </CustomNormalTypography>
            </Box>

            <CustomInfoBox sx={{ display: "flex", gap: ".5em" }}>
              <CustomBox>
                <CustomNormalTypography
                  variant="h6"
                  sx={{ color: "#fff", fontSize: "1.1em" }}
                >
                  Estimated Cost
                </CustomNormalTypography>
                <CustomTypography>${response.totalCost}</CustomTypography>
              </CustomBox>
              <CustomBox>
                <CustomNormalTypography
                  variant="h6"
                  sx={{ color: "#fff", fontSize: "1.1em" }}
                >
                  Timeline
                </CustomNormalTypography>
                <CustomTypography sx={{ wordBreak: timeline.length > 4 ? "break-word" : "normal" }}>{timeline}</CustomTypography>
              </CustomBox>
            </CustomInfoBox>

            <CustomBottomBox
              sx={{
                display: "flex",
                gap: "2em",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: "40px",
              }}
            >
              <Box sx={{ display: "flex", gap: "2em", flexWrap: "wrap",justifyContent:"center",alignItems:"center" }}>
                <Box
                  onClick={() => { route.push("/cost-estimation-calculator/submit") }}
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
                      Check Your
                    </CustomNormalTypography>
                    <CustomNormalTypography sx={{ color: "#1E1D28" }}>
                      Response
                    </CustomNormalTypography>
                  </Box>

                  <Box
                    sx={{
                      color: "#fff",
                      backgroundColor: "#1E1D28",
                      borderRadius: "50%",
                      width: "45px",
                      height: "45px",
                    }}
                    id="slide"
                  >
                    <ArrowRightAltIcon
                      sx={{
                        padding: ".43em",
                      }}
                    />
                  </Box>
                </Box>
                {
                  isNarrowScreen
                    ? <CustomLinkBox href="/cost-estimation-calculator" 
                    // sx={{ marginLeft: "auto" }}
                    >

                      <Box
                        sx={{
                          border: "3px solid #b8b8b8",
                          borderRadius: "50%",
                          width: "45px",
                          height: "45px",
                        }}
                      >
                        <RefreshIcon
                          sx={{
                            color: "#b8b8b8",
                            padding: ".43em",
                          }}
                        />
                      </Box>
                      <Box>
                        <CustomNormalTypography sx={{ color: "#1E1D28" }}>
                          Calculate new
                        </CustomNormalTypography>
                        <CustomNormalTypography sx={{ color: "#1E1D28" }}>
                          Project cost
                        </CustomNormalTypography>
                      </Box>


                    </CustomLinkBox>
                    : <CustomLinkBox href="/cost-estimation-calculator">

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
                          width: "45px",
                          height: "45px",
                        }}
                      >
                        <RefreshIcon
                          sx={{
                            color: "#b8b8b8",
                            padding: ".43em",
                          }}
                        />
                      </Box>
                    </CustomLinkBox>

                }

              </Box>

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

                  <span id="forward">Start Project</span>{" "}
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

                  <span style={{ textDecoration: "none" }} id="forward">start project</span>{" "}
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
              )}
            </CustomBottomBox>

          </CustomMainBox>
          : <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Form response={response} getActualResponse={getActualResponse} />
          </Modal>}
    </>
  );
};

export default ShowSummary;
