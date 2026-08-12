import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
  Checkbox,
  FormControlLabel,
  CircularProgress,
  Alert,
} from "@mui/material";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";

import api from "../services/api";

export default function Login() {
  const navigate = useNavigate();
  const { login: loginUser } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");

    if (!username.trim() || !password.trim()) {
      setError("Please enter both username and password.");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/auth/login", {
        username,
        password,
      });

      loginUser(response.data.token);

      navigate("/products");
    } catch (err) {
      setError(
        err.response?.data?.message || "Invalid username or password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#0f172a,#1e293b,#2563eb)",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Container maxWidth="sm">
        <Card
          elevation={10}
          sx={{
            borderRadius: 5,
            overflow: "hidden",
          }}
        >
          <CardContent sx={{ p: 5 }}>
            <Box textAlign="center" mb={3}>
              <ShoppingCartCheckoutIcon
                color="primary"
                sx={{ fontSize: 60 }}
              />

              <Typography
                variant="h3"
                fontWeight="bold"
                mt={1}
              >
                CloudCart
              </Typography>

              <Typography
                color="text.secondary"
                mt={1}
              >
                Welcome back! Login to continue shopping.
              </Typography>
            </Box>

            {error && (
              <Alert
                severity="error"
                sx={{ mb: 2 }}
              >
                {error}
              </Alert>
            )}

            <TextField
              label="Username"
              fullWidth
              margin="normal"
              value={username}
              onChange={(e) =>
                setUsername(e.target.value)
              }
            />

            <TextField
              label="Password"
              fullWidth
              margin="normal"
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleLogin();
                }
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() =>
                        setShowPassword(
                          !showPassword
                        )
                      }
                    >
                      {showPassword ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={rememberMe}
                  onChange={(e) =>
                    setRememberMe(
                      e.target.checked
                    )
                  }
                />
              }
              label="Remember Me"
              sx={{ mt: 1 }}
            />

            <Button
              variant="contained"
              fullWidth
              size="large"
              sx={{
                mt: 2,
                borderRadius: 3,
                py: 1.4,
              }}
              disabled={loading}
              onClick={handleLogin}
            >
              {loading ? (
                <CircularProgress
                  size={24}
                  color="inherit"
                />
              ) : (
                "Login"
              )}
            </Button>

            <Typography
              align="center"
              mt={4}
            >
              Don't have an account?{" "}
              <Link
                to="/register"
                style={{
                  color: "#1976d2",
                  textDecoration: "none",
                  fontWeight: 600,
                }}
              >
                Register
              </Link>
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}