import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import HomeIcon from "@mui/icons-material/Home";

export const Header = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" href="/" startIcon={<HomeIcon />}>
            Home
          </Button>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Assets Manager
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
