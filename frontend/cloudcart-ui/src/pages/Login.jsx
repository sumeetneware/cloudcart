import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  TextField,
  Typography,
} from "@mui/material";

import api from "../services/api";

export default function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      const response = await api.post("/auth/login", {
        username,
        password,
      });

      localStorage.setItem("token", response.data.token);

      navigate("/products");
    } catch (error) {
  console.log("LOGIN ERROR:", error);
  console.log("RESPONSE:", error.response?.data);

  alert(error.response?.data?.message || "Login failed");
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
          sx={{
            backdropFilter: "blur(20px)",
            background: "rgba(255,255,255,0.12)",
            border: "1px solid rgba(255,255,255,0.2)",
            borderRadius: 5,
            color: "white",
            p: 3,
          }}
        >
          <CardContent>
            <Typography
              variant="h3"
              align="center"
              fontWeight="bold"
              gutterBottom
            >
              ☁️ CloudCart
            </Typography>

            <Typography
              align="center"
              sx={{ mb: 4, opacity: 0.8 }}
            >
              Modern Microservices E-Commerce Platform
            </Typography>

            <TextField
              label="Username"
              fullWidth
              margin="normal"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <TextField
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button
              variant="contained"
              fullWidth
              size="large"
              sx={{ mt: 3, borderRadius: 3 }}
              onClick={login}
            >
              Login
            </Button>

            <Typography
              align="center"
              sx={{ mt: 3 }}
            >
              New user?{" "}
              <Link
                to="/register"
                style={{ color: "#90caf9" }}
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