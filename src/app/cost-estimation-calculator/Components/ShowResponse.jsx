"use client"
import { Box, Typography, Chip, Button, Breadcrumbs, Link } from "@mui/material";
import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import { useRouter } from "next/navigation";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";


const CustomBackButton = styled(Button)(({ theme }) => ({
  color: "#ACACAC",
  width: "40px",
  height: "40px",
  borderRadius: "50%",
  // marginTop: "15px",
  marginLeft: '.5em',
  position: 'absolute',
  top: '-8px',
  left: '-72px',
  // justifyContent: "normal",
  minWidth: "min-content",
  border: "2px solid #ACACAC",
  transition: "all 0.3s ease-in-out",
  padding: ".2em",
  "&:hover svg": {
    transform: "translateX(-5px)"
  },
  "&:hover": {
    boxShadow: "0 0 5px rgba(0, 93, 189, 0.8)",
  },
  "&.Mui-disabled": {
    background: "#4f9ef0",
    color: "#eaeaea",
  },
  "&:focus": {
    outline: "none",
    boxShadow: "0 0 5px rgba(0, 93, 189, 0.8)",
  },
}));

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `none`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&::before': {
    display: 'none',
  },
}))

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ExpandMoreIcon sx={{ fontSize: '20px' }} />}
    {...props}
  />
))(({ theme }) => ({

}));

const CustomTypography = styled(Typography)(({ theme }) => ({
  fontSize: "24px",
  fontWeight: 700,
  // lineHeight: "20px",
  fontFamily: ["Aeonik", "Poppins", "Helvetica", "Arial", "Lucida", "sans-serif"].join(
    ","
  ),
  [theme.breakpoints.down("md")]: {
    fontSize: "1rem ",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: ".9rem ",
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

const ShowResponse = () => {
  const [response, setResponse] = useState({});
  const [name, setName] = useState();
  const [showOption, setShowOption] = useState(null);
  const route = useRouter();

  useEffect(() => {
    const fetchData = () => {
      const data =
        typeof window !== "undefined"
          ? window.localStorage.getItem("Response")
          : false;
      const name = typeof window !== "undefined"
        ? window.localStorage.getItem("Name")
        : false;
      if (data && name) {
        try {
          const parsedData = JSON.parse(data);
          const parsedName = JSON.parse(name);

          setName(parsedName);
          setResponse(parsedData);
        } catch (error) {
          console.error("Error parsing JSON:", error);
        }
      }
    };

    fetchData();
  }, []);



  const toggleOption = (index) => {
    setShowOption((prev) => (prev === index ? null : index));
  };
  return (
    <>
      <Box sx={{
        maxWidth: "1279px",
        marginRight: "auto",
        marginLeft: "auto",
      }}>
        <Box sx={{ marginBottom: '100px', display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
          <Typography variant="h1" sx={{
            fontSize: '40px',
            fontWeight: 700,
            marginBottom: '20px'
          }}>Estimate {name} Cost</Typography>
          <div role="presentation">
            <Breadcrumbs aria-label="breadcrumb">
              <Link underline="hover" color="black" href="/">Home</Link>
              <Link underline="hover" color="black" href="/cost-estimation-calculator">Cost Estimation Calculator</Link>
              <Link underline="hover" color="black" href={name === "Team" ? '/staff' : '/project'}>{name}</Link>
            </Breadcrumbs>
          </div>
        </Box>
        <Box sx={{ position: 'relative', }}>
          <CustomBackButton onClick={() => { route.back() }}>
            <KeyboardBackspaceIcon
              sx={{
                textAlign: "center",
                fontSize: "1.6em",
                alignItems: "center",
                justifyContent: "center",
                display: "flex",
                width: "100%",
                transition: "all 0.3s ease-in-out",
                ":hover": {
                  cursor: "pointer",
                },
              }}
            />
          </CustomBackButton>
          <Typography sx={{ fontSize: "30px", lineHeight: "20px", fontWeight: 700 }} variant="">{name} Summary</Typography>
        </Box>
        <Box sx={{ marginTop: "33px", maxWidth: 700 }}>
          {(response.responses && response.responses.length > 0) ? (
            (response.responses).map((question, index) => (
              <Box key={index} sx={{
                marginBottom: '20px',

              }}>
                <Accordion
                  TransitionProps={{ timeout: 900 }}
                  sx={{
                    backgroundColor: "#e6e6e68c",
                    padding: "29px 0px",
                    marginBottom: '20px',
                    borderRadius: "10px",
                    "& .MuiSvgIcon-root": {
                      // fontSize: "13px",
                      color: "#000",
                    },
                    // "& .css-yw020d-MuiAccordionSummary-expandIconWrapper": {
                    //   marginTop: '-10px',
                    //   paddingRight: '8px'
                    // },
                    "&.MuiButtonBase-root MuiAccordionSummary-root": {
                      display: "flex",
                      gap: "10px",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: '0 30px'
                    }
                  }}
                  expanded={showOption === index}
                  onChange={() => { toggleOption(index) }}
                >
                  <AccordionSummary aria-controls="panel1d-content" id="panel1d-header" sx={{
                    "& .css-1betqn-MuiAccordionSummary-content": {
                      maxWidth: '600px',
                      margin: 0
                    },
                    "&.css-1hcoqz0-MuiButtonBase-root-MuiAccordionSummary-root": {
                      display: "flex",
                      gap: "10px",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: '0 30px'

                    },
                    display: "flex",
                    gap: "10px",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: '0 30px'

                  }}>
                    {index === 0 && question.resources ? (

                      <CustomTypography>Resources</CustomTypography>

                    ) : (
                      <Box>
                        <CustomTypography key={index}>
                          {typeof question.question === 'string' ? (
                            question.question // Display the question if it's a string
                          ) : (
                            question.question.question // Display the question.question if it's an object
                          )}
                        </CustomTypography>
                      </Box>
                    )}
                  </AccordionSummary>
                  <AccordionDetails sx={{ border: "0px", padding: 0 }}>
                    {/* Display selectedData or selectedOption based on the type of response */}
                    {index === 0 && question.resources ? (
                      question.resources.map((resource, idx) => (
                        <ul style={{ color: "#005DBD", fontSize: "20px", listStyleType: "none", marginBottom: "0px", paddingLeft: '32px' }}>
                          <li>
                            <Typography sx={{ fontWeight: "500", textTransform: "capitalize", color: "#005DBD" }} key={idx}>Framework: {resource.resource}</Typography>
                          </li>
                          <li>
                            <Typography sx={{ fontWeight: "500", textTransform: "capitalize", color: "#005DBD" }} key={idx}>Specialist: {resource.resourceOption.opt}</Typography>
                          </li>
                          <li>
                            <Typography sx={{ fontWeight: "500", textTransform: "capitalize", color: "#005DBD" }} key={idx}>Seniority Level: {resource.seniorityLevel}</Typography>
                          </li>
                          <li>
                            <Typography sx={{ fontWeight: "500", textTransform: "capitalize", color: "#005DBD" }} key={idx}>Number Of Resources: {resource.numOfResources}</Typography>
                          </li>
                        </ul>
                      ))
                    ) : (
                      (question.selectedData && question.selectedData.length > 0) ? (
                        question.selectedData.map((option, idx) => (
                          <ul style={{ color: "#005DBD", fontSize: "20px", listStyleType: "none", marginBottom: "0px", paddingLeft: '32px' }}>
                            <li>
                              <Typography sx={{ fontWeight: "500", textTransform: "capitalize", color: "#005DBD" }} key={idx}>{option.opt}</Typography>
                            </li>
                          </ul>

                        ))
                      ) : (
                        (question.selectedOption && question.selectedOption.length > 0) && (
                          question.selectedOption.map((option, idx) => (
                            <ul style={{ color: "#005DBD", fontSize: "20px", listStyleType: "none", marginBottom: "0px", paddingLeft: '32px' }}>
                              <li>
                                <Typography sx={{ fontWeight: "500", textTransform: "capitalize", color: "#005DBD" }} key={idx}>{option.opt}</Typography>
                              </li>
                            </ul>
                          ))
                        )
                      )
                    )}
                  </AccordionDetails>
                </Accordion>
              </Box>
            ))
          ) : (
            <Typography>No responses available yet.</Typography>
          )}
        </Box>
      </Box >

    </>
  );
};

export default ShowResponse;
