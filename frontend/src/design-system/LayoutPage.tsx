import { Box } from "@mui/material";
import { Header } from "./Header";

export const LayoutPage = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <Box
        sx={{ display: "flex", flexDirection: "column", gap: 2, padding: 2 }}
      >
        {children}
      </Box>
    </>
  );
};
