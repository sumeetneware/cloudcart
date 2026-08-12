import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Badge,
  Avatar,
  Stack,
} from "@mui/material";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import LogoutIcon from "@mui/icons-material/Logout";
import StorefrontIcon from "@mui/icons-material/Storefront";
import HomeIcon from "@mui/icons-material/Home";

import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const navigate = useNavigate();

  const { logout } = useAuth();
  const { count } = useCart();

  // Read username from JWT payload
  let username = "User";

  try {
    const token = localStorage.getItem("token");

    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      username = payload.username || "User";
    }
  } catch (e) {}

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <AppBar
      position="sticky"
      elevation={2}
      color="inherit"
      sx={{
        borderBottom: "1px solid #e5e7eb",
      }}
    >
      <Toolbar>

        <Typography
          component={Link}
          to="/products"
          variant="h5"
          fontWeight="bold"
          color="primary"
          sx={{
            flexGrow: 1,
            display: "flex",
            alignItems: "center",
            gap: 1,
            textDecoration: "none",
          }}
        >
          <StorefrontIcon />
          CloudCart
        </Typography>

        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
        >

          <Button
            component={Link}
            to="/products"
            color="inherit"
            startIcon={<HomeIcon />}
          >
            Products
          </Button>

          <Button
            component={Link}
            to="/orders"
            color="inherit"
            startIcon={<ReceiptLongIcon />}
          >
            Orders
          </Button>

          <Button
            component={Link}
            to="/cart"
            color="inherit"
            startIcon={
              <Badge
                badgeContent={count}
                color="error"
              >
                <ShoppingCartIcon />
              </Badge>
            }
          >
            Cart
          </Button>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              ml: 2,
              mr: 1,
            }}
          >
            <Avatar
              sx={{
                width: 36,
                height: 36,
                bgcolor: "primary.main",
                mr: 1,
              }}
            >
              {username.charAt(0).toUpperCase()}
            </Avatar>

            <Box>
              <Typography
                variant="caption"
                color="text.secondary"
              >
                Welcome
              </Typography>

              <Typography
                fontWeight="bold"
                lineHeight={1.2}
              >
                {username}
              </Typography>
            </Box>
          </Box>

          <Button
            color="error"
            variant="contained"
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
            sx={{
              borderRadius: 3,
              textTransform: "none",
            }}
          >
            Logout
          </Button>

        </Stack>

      </Toolbar>
    </AppBar>
  );
}