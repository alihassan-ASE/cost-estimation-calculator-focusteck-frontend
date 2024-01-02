"use client"
import { Box, Typography, Chip, Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&::before': {
    display: 'none',
  },
}))

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const CustomTypography = styled(Typography)({
  fontSize: "20px",
  fontWeight: "bold",
  fontFamily: ["Poppins", "Helvetica", "Arial", "Lucida", "sans-serif"].join(
    ","
  )

});

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

const ShowResponse = () => {
  const [response, setResponse] = useState({});
  const [showOption, setShowOption] = useState(null);

  useEffect(() => {
    const fetchData = () => {
      const data =
        typeof window !== "undefined"
          ? window.localStorage.getItem("Response")
          : false;

      if (data) {
        try {
          const parsedData = JSON.parse(data);
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
      <Box sx={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ maxWidth: "1100px", padding: "0px 20px" }}>
          {(response.responses && response.responses.length > 0) ? (
            (response.responses).map((question, index) => (
              <Box key={index}>
                <Accordion
                  TransitionProps={{ timeout: 900 }}
                  sx={{
                    borderLeft: "0px",
                    borderRight: "0px",
                    "& .MuiSvgIcon-root": {
                      height: "1.5rem",
                      width: "1.5rem",
                      fontWeight: "100",
                      color: "#4571d3"
                    },
                    "& .MuiAccordionSummary-root": {
                      height: "130px",
                      backgroundColor: "white",


                    }
                  }}
                  expanded={showOption === index}
                  onChange={() => { toggleOption(index) }}
                >
                  <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                    {index === 0 && question.resources ? (
                      <Box>
                        <CustomTypography>Resources</CustomTypography>
                        {showOption === index ? (

                          <Typography sx={{ fontSize: "14px", fontWeight: "bold", color: "#4571d3" }}>Hide Answer</Typography>
                        ) : (
                          <Box sx={{ display: "flex" }}>
                            <Typography sx={{ fontSize: "14px", fontWeight: "bold", color: "#4571d3" }}>View Answer</Typography>
                            <ArrowRightAltIcon sx={{ fontSize: "16px", marginBottom: "2px" }} />

                          </Box>
                        )}
                      </Box>
                    ) : (
                      <Box>
                        <CustomTypography key={index}>
                          {typeof question.question === 'string' ? (
                            question.question // Display the question if it's a string
                          ) : (
                            question.question.question // Display the question.question if it's an object
                          )}
                        </CustomTypography>
                        {showOption === index ? (
                          <Typography sx={{ fontSize: "14px", fontWeight: "bold", color: "#4571d3" }}>Hide Answer</Typography>
                        ) : (
                          <Box sx={{ display: "flex" }}>
                            <Typography sx={{ fontSize: "14px", fontWeight: "bold", color: "#4571d3" }}>View Answer</Typography>
                            <ArrowRightAltIcon sx={{ fontSize: "16px", marginBottom: "2px" }} />

                          </Box>
                        )}
                      </Box>
                    )}
                  </AccordionSummary>
                  <AccordionDetails sx={{ border: "0px" }}>
                    {/* Display selectedData or selectedOption based on the type of response */}
                    {index === 0 && question.resources ? (
                      question.resources.map((resource, idx) => (
                        <ul style={{ color: "#708090", fontSize: "20px", marginLeft: "15px" }}>
                          <li>
                            <Typography sx={{ fontWeight: "bold", color: "#708090", paddingBottom: "50px" }} key={idx}>{resource.resource}</Typography>
                          </li>
                        </ul>
                      ))
                    ) : (
                      (question.selectedData && question.selectedData.length > 0) ? (
                        question.selectedData.map((option, idx) => (
                          <ul style={{ color: "#708090", fontSize: "20px", marginLeft: "15px" }}>
                            <li>
                              <Typography sx={{ fontWeight: "bold", color: "#708090", paddingBottom: "50px" }} key={idx}>{option.opt}</Typography>
                            </li>
                          </ul>

                        ))
                      ) : (
                        (question.selectedOption && question.selectedOption.length > 0) && (
                          question.selectedOption.map((option, idx) => (
                            <ul style={{ color: "#708090", fontSize: "20px", marginLeft: "15px" }}>
                              <li>
                                <Typography sx={{ fontWeight: "bold", color: "#708090", height: "50px" }} key={idx}>{option.opt}</Typography>
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
        </div>
      </Box>

    </>
  );
};

export default ShowResponse;
