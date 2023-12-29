import { Box, Typography, Chip, Button } from "@mui/material";
import React, { useEffect } from "react";
import { styled } from "@mui/material/styles";

const CustomButton = styled(Button)({
  "&:hover": {
    cursor: "auto",
  },
  textTransform: "capitalize",
  display: "flex",
  justifyContent: "space-between",
  gap: "1em",
  width: "100%",
});

const CustomTypography = styled(Typography)({
  textAlign: "center",
  backgroundColor: "#e4e4e4",
  margin: "1em 0",
});

const ShowResponse = ({ response }) => {

  // localStorage.clear();

  return (
    <>
      <Box
        sx={{
          border: "1px solid #cfcfcf",
          padding: "1em 1em",
          maxWidth: "100%",
          margin: "3em 0.5em",
        }}
      >
        <Box>
          <CustomTypography variant="h6">User Details</CustomTypography>
          <CustomButton sx={{ display: "flex", gap: "1em" }}>
            <Typography variant="body1">Name</Typography>
            <Chip
              sx={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "normal",
              }}
              key="Name"
              label={response?.userName}
            />
          </CustomButton>
          <CustomButton sx={{ display: "flex", gap: "1em" }}>
            <Typography variant="body1">Email</Typography>
            <Chip
              sx={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "normal",
              }}
              key="Name"
              label={response?.email}
            />{" "}
          </CustomButton>
        </Box>
        {response.responses[0].resources ? (
          <Box sx={{ display: "flex", flexDirection: "column", gap: ".5em " }}>
            <CustomTypography variant="h6">Resources</CustomTypography>
            {response.responses[0].resources.map((data) => (
              <Box
                sx={{
                  gap: "1em",
                  backgroundColor: "hsla(0, 0%, 0%, 0.03)",
                  padding: ".5em",
                }}
              >
                <CustomButton>
                  <Typography>Resource</Typography>
                  <Chip
                    sx={{
                      maxWidth: "100%",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                    key="Resource"
                    label={data.resource}
                  />
                </CustomButton>
                <CustomButton>
                  <Typography>Resource Option</Typography>

                  <Chip
                    sx={{
                      maxWidth: "100%",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                    key="Resource Option"
                    label={`${data.resourceOption.opt} ($${data.resourceOption.price})`}
                  />
                </CustomButton>
                <CustomButton>
                  <Typography>Seniority Level</Typography>

                  <Chip
                    sx={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                    key="Seniority Level"
                    label={data.seniorityLevel}
                  />
                </CustomButton>
                <CustomButton>
                  <Typography>Number of Resources</Typography>

                  <Chip key="Number of Resources" label={data.numOfResources} />
                </CustomButton>
              </Box>
            ))}
            <CustomTypography variant="h6">Queries</CustomTypography>
            {response.responses.slice(1).map((data) => (
              <CustomButton sx={{ gap: "1em" }}>
                <Typography>{data.label}</Typography>

                {data.selectedData.map((eachOption) => (
                  <Chip
                    sx={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                    key="Questions"
                    label={`${eachOption.opt} ($${eachOption.price})`}
                  />
                ))}
              </CustomButton>
            ))}
          </Box>
        ) : (
          <Box>
            <CustomTypography variant="h6">Queries</CustomTypography>

            {response.responses.map((data) => (
              <>
                <CustomButton sx={{ gap: "1em" }}>
                  <Typography>{data.question.label}</Typography>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "normal",
                      gap: ".5em",
                    }}
                  >
                    {data.selectedOption.map((eachOption) => (
                      <Chip
                        sx={{
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                        key="Questions"
                        label={`${eachOption.opt} ($${eachOption.price})`}
                      />
                    ))}
                  </Box>
                </CustomButton>
              </>
            ))}
          </Box>
        )}
        <CustomButton sx={{ gap: "1em" }}>
          <Typography> Total Cost</Typography>
          <Chip
            sx={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
            key="Cost"
            label={`$${response.totalCost}`}
          />
        </CustomButton>
      </Box>
    </>
  );
};

export default ShowResponse;
