import {
  Container,
  Typography,
  Alert,
  Box,
  Button,
} from "@mui/material";

import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import OrderCard from "../components/OrderCard";
import api from "../services/api";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response =
        await api.get("/orders/");

      setOrders(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Navbar />

      <Container
        maxWidth="lg"
        sx={{ py: 5 }}
      >
        <Typography
          variant="h3"
          fontWeight="bold"
          gutterBottom
        >
          My Orders
        </Typography>

        <Typography
          color="text.secondary"
          sx={{ mb: 4 }}
        >
          Track and manage your purchases.
        </Typography>

        {orders.length === 0 ? (
          <Alert
            severity="info"
            sx={{ borderRadius: 3 }}
          >
            You haven't placed any orders yet.
          </Alert>
        ) : (
          orders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
            />
          ))
        )}

        {orders.length === 0 && (
          <Box
            textAlign="center"
            mt={5}
          >
            <ShoppingBagIcon
              sx={{
                fontSize: 80,
                color: "grey.400",
              }}
            />

            <Typography
              variant="h5"
              mt={2}
              gutterBottom
            >
              Start Shopping
            </Typography>

            <Typography
              color="text.secondary"
              mb={3}
            >
              Browse our products and place your first order.
            </Typography>

            <Button
              component={Link}
              to="/products"
              variant="contained"
              size="large"
            >
              Browse Products
            </Button>
          </Box>
        )}
      </Container>
    </>
  );
}