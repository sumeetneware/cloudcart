import {
  Card,
  CardContent,
  Typography,
  Chip,
  Stack,
  Divider,
  Box,
} from "@mui/material";

import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PendingIcon from "@mui/icons-material/Pending";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CancelIcon from "@mui/icons-material/Cancel";

export default function OrderCard({ order }) {
  const getStatusChip = () => {
    switch (order.status?.toLowerCase()) {
      case "completed":
        return (
          <Chip
            icon={<CheckCircleIcon />}
            label="Completed"
            color="success"
          />
        );

      case "processing":
        return (
          <Chip
            icon={<PendingIcon />}
            label="Processing"
            color="warning"
          />
        );

      case "shipped":
        return (
          <Chip
            icon={<LocalShippingIcon />}
            label="Shipped"
            color="info"
          />
        );

      default:
        return (
          <Chip
            icon={<CancelIcon />}
            label={order.status}
            color="error"
          />
        );
    }
  };

  return (
    <Card
      elevation={4}
      sx={{
        mb: 3,
        borderRadius: 4,
        transition: "0.3s",
        "&:hover": {
          transform: "translateY(-4px)",
        },
      }}
    >
      <CardContent>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          flexWrap="wrap"
        >
          <Box>
            <Typography
              variant="h6"
              fontWeight="bold"
            >
              <ShoppingBagIcon
                sx={{
                  mr: 1,
                  verticalAlign: "middle",
                }}
              />
              Order #{order.id}
            </Typography>

            <Typography
              color="text.secondary"
              sx={{ mt: 1 }}
            >
              Order ID:
              {" "}
              {order.id}
            </Typography>
          </Box>

          {getStatusChip()}
        </Stack>

        <Divider sx={{ my: 2 }} />

        <Stack
          direction={{
            xs: "column",
            md: "row",
          }}
          spacing={4}
        >
          <Box>
            <Typography
              variant="body2"
              color="text.secondary"
            >
              Total Amount
            </Typography>

            <Typography
              variant="h5"
              fontWeight="bold"
            >
              ₹{Number(order.total_amount).toLocaleString()}
            </Typography>
          </Box>

          <Box>
            <Typography
              variant="body2"
              color="text.secondary"
            >
              Order Status
            </Typography>

            {getStatusChip()}
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}