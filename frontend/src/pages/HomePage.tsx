import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export const HomePage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        mt: "25vh",
        textAlign: "center",
        px: 2,
      }}
    >
      <Typography variant="body1" sx={{ mb: 6 }}>
        This is a simple assets manager that allows you to track your assets and
        their values.
      </Typography>
      <Stack direction={"column"} gap={2} alignItems={"center"}>
        <Typography variant="body1">
          You can create assets and obtain the average interest rate.
        </Typography>
        <Button variant="contained" color="primary" href="/assets/new">
          Create Assets
        </Button>
      </Stack>
    </Box>
  );
};
