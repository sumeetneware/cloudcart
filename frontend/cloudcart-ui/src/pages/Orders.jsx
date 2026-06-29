import {
  Container,
  Typography,
  Card,
  CardContent
} from "@mui/material";

import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import api from "../services/api";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const response =
      await api.get("/orders/");

    setOrders(response.data);
  };

  return (
    <>
      <Navbar />

      <Container sx={{ mt: 5 }}>
        <Typography
          variant="h3"
          fontWeight="bold"
          gutterBottom
        >
          Order History
        </Typography>

        {orders.map((order) => (
          <Card
            key={order.id}
            sx={{
              mb: 3,
              borderRadius: 3
            }}
          >
            <CardContent>
              <Typography variant="h6">
                Order #{order.id}
              </Typography>

              <Typography>
                Total: ₹{order.total_amount}
              </Typography>

              <Typography>
                Status: {order.status}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Container>
    </>
  );
}