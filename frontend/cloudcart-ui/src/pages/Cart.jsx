import { useEffect, useState } from "react";

import {
  Container,
  Typography,
  Button,
  Box,
  Alert,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
} from "@mui/material";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import CartItem from "../components/CartItem";

import { useCart } from "../context/CartContext";

import api from "../services/api";

export default function Cart() {
  const [items, setItems] = useState([]);
  const [successOpen, setSuccessOpen] =
    useState(false);

  const navigate = useNavigate();

  const { clearCart } = useCart();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const response =
        await api.get("/cart/");

      setItems(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const removeItem = async (id) => {
  try {
    await api.delete(`/cart/${id}`);
    fetchCart();
  } catch (error) {
    console.error(error);
  }
};

  const total = items.reduce(
  (sum, item) =>
    sum + Number(item.subtotal || 0),
  0
);

  const placeOrder = async () => {
    try {
      await api.post("/orders/", {
        user_id: 1,
        total_amount: total,
      });

      clearCart();

      setItems([]);

      setSuccessOpen(true);

    } catch (error) {
      console.error(error);

      alert(
        "Failed to place order"
      );
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
          Your Shopping Cart
        </Typography>

        <Typography
          color="text.secondary"
          sx={{ mb: 4 }}
        >
          Review your items before checkout.
        </Typography>

        {items.length === 0 ? (
          <Alert severity="info">
            Your cart is empty.
          </Alert>
        ) : (
          <>
            <Box mt={4}>
              {items.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onRemove={removeItem}
                />
              ))}
            </Box>

            <Paper
              sx={{
                mt: 4,
                p: 4,
                borderRadius: 4,
              }}
            >
              <Typography
                variant="h5"
                fontWeight="bold"
              >
                Order Summary
              </Typography>

              <Divider sx={{ my: 3 }} />

              <Typography
                variant="h4"
                color="primary"
                fontWeight="bold"
              >
                Total:
                {" "}
                ₹{total.toLocaleString()}
              </Typography>

              <Button
                variant="contained"
                size="large"
                sx={{
                  mt: 4,
                  borderRadius: 3,
                }}
                onClick={placeOrder}
              >
                Place Order
              </Button>
            </Paper>
          </>
        )}

        <Dialog
          open={successOpen}
        >
          <DialogTitle>
            <Box
              display="flex"
              alignItems="center"
              gap={1}
            >
              <CheckCircleIcon
                color="success"
              />

              Order Successful
            </Box>
          </DialogTitle>

          <DialogContent>
            Your order has been placed successfully.
          </DialogContent>

          <DialogActions>
            <Button
              variant="contained"
              onClick={() => {
                setSuccessOpen(false);
                navigate("/orders");
              }}
            >
              View Orders
            </Button>

            <Button
              onClick={() => {
                setSuccessOpen(false);
                navigate("/products");
              }}
            >
              Continue Shopping
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </>
  );
}