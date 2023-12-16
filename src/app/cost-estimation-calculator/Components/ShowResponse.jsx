import { Box, Typography, Chip, Button } from "@mui/material";
import React from "react";
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
  return (
    <Box
      sx={{
        margin: "3em 4em",
        border: "1px solid #cfcfcf",
        padding: "2em 3em",
      }}
    >
      <Box>
        <CustomTypography variant="h6">User Details</CustomTypography>
        <CustomButton sx={{ display: "flex", gap: "1em" }}>
          <Typography variant="body1">Name</Typography>
          <Chip key="Name" label={response.userName} />
        </CustomButton>
        <CustomButton sx={{ display: "flex", gap: "1em" }}>
          <Typography variant="body1"> Email</Typography>
          <Chip key="Name" label={response.email} />{" "}
        </CustomButton>
      </Box>
      {response.responses[0].resources ? (
        <Box sx={{ gap: "1em " }}>
          <CustomTypography variant="h6">Resources</CustomTypography>
          {response.responses[0].resources.map((data) => (
            <Box sx={{ gap: "1em" }}>
              <CustomButton>
                <Typography>Resource</Typography>
                <Chip key="Resource" label={data.resource} />
              </CustomButton>
              <CustomButton>
                <Typography>Resource Option</Typography>

                <Chip
                  key="Resource Option"
                  label={`${data.resourceOption.opt} ($${data.resourceOption.price})`}
                />
              </CustomButton>
              <CustomButton>
                <Typography>Seniority Level</Typography>

                <Chip key="Resource" label={data.seniorityLevel} />
              </CustomButton>
              <CustomButton>
                <Typography> Number of Resources</Typography>

                <Chip key="Resource" label={data.numOfResources} />
              </CustomButton>
            </Box>
          ))}
          <CustomTypography variant="h6">Queries</CustomTypography>
          {response.responses.slice(1).map((data) => (
            <CustomButton sx={{ gap: "1em" }}>
              <Typography>{data.label}</Typography>

              {data.selectedData.map((eachOption) => (
                <Chip
                  key="Resource"
                  label={`${eachOption.opt} ($${eachOption.price})`}
                />
              ))}
            </CustomButton>
          ))

          }
          <CustomButton sx={{ gap: "1em" }}>
            <Typography> Total Cost</Typography>
            <Chip key="Resource" label={`$${response.totalCost}`} />
          </CustomButton>
        </Box>
      ) : (
        <Box>
          <CustomTypography variant="h6">Queries</CustomTypography>

          {response.responses.map((data) => (
            <>
              <CustomButton sx={{ gap: "1em" }}>
                <Typography>{data.question.label}</Typography>

                {data.selectedOption.map((eachOption) => (
                  <Chip
                    key="Resource"
                    label={`${eachOption.opt} ($${eachOption.price})`}
                  />
                ))}
              </CustomButton>
            </>
          ))}
          <CustomButton sx={{ gap: "1em" }}>
            <Typography> Total Cost</Typography>
            <Chip key="Resource" label={`$${response.totalCost}`}/>
          </CustomButton>
        </Box>
      )}
    </Box>
  );
};

export default ShowResponse;
