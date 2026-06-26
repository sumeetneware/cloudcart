import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <AppBar
      position="sticky"
      elevation={1}
      sx={{
        background: "#ffffff",
        color: "#111827"
      }}
    >
      <Toolbar>
        <Typography
          variant="h5"
          sx={{ fontWeight: "bold", flexGrow: 1 }}
        >
          ☁️ CloudCart
        </Typography>

        <Box sx={{ display: "flex", gap: 2 }}>
          <Button component={Link} to="/products">
            Products
          </Button>

          <Button component={Link} to="/cart">
            Cart
          </Button>

          <Button component={Link} to="/orders">
            Orders
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}