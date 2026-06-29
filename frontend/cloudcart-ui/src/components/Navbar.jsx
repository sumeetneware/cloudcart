import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Badge,
  IconButton,
  Tooltip,
} from "@mui/material";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import LogoutIcon from "@mui/icons-material/Logout";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

export default function Navbar({
  mode = "light",
  toggleTheme = () => {},
}) {
  const navigate = useNavigate();

  const { logout } = useAuth();
  const { count } = useCart();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <AppBar
      position="sticky"
      elevation={1}
      color="inherit"
      sx={{
        backdropFilter: "blur(12px)",
      }}
    >
      <Toolbar>
        <Typography
          component={Link}
          to="/products"
          variant="h4"
          fontWeight="bold"
          color="inherit"
          sx={{
            flexGrow: 1,
            textDecoration: "none",
            cursor: "pointer",
          }}
        >
          ☁️ CloudCart
        </Typography>

        <Box
          sx={{
            display: "flex",
            gap: 1,
            alignItems: "center",
          }}
        >
          <Button
            component={Link}
            to="/products"
            color="inherit"
          >
            Products
          </Button>

          <Button
            component={Link}
            to="/cart"
            color="inherit"
            startIcon={
              <Badge
                badgeContent={count}
                color="error"
                invisible={count === 0}
              >
                <ShoppingCartIcon />
              </Badge>
            }
          >
            Cart
          </Button>

          <Button
            component={Link}
            to="/orders"
            color="inherit"
            startIcon={<ReceiptLongIcon />}
          >
            Orders
          </Button>

          <Tooltip
            title={
              mode === "light"
                ? "Dark Mode"
                : "Light Mode"
            }
          >
            <IconButton
              color="inherit"
              onClick={toggleTheme}
            >
              {mode === "light" ? (
                <DarkModeIcon />
              ) : (
                <LightModeIcon />
              )}
            </IconButton>
          </Tooltip>

          <Button
            color="error"
            variant="outlined"
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
            sx={{
              borderRadius: 3,
              ml: 1,
            }}
          >
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}