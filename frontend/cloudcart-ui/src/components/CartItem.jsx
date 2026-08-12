import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Chip,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";

export default function CartItem({
  item,
  onRemove,
}) {
  return (
    <Card
      sx={{
        mb: 3,
        borderRadius: 4,
        transition: "0.3s",

        "&:hover": {
          boxShadow: 6,
          transform: "translateY(-3px)",
        },
      }}
    >
      <CardContent>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          flexWrap="wrap"
          gap={2}
        >
          <Box>
            <Typography
              variant="h6"
              fontWeight="bold"
            >
              📦 {item.product_name}
            </Typography>

            <Typography
              color="text.secondary"
              sx={{ mt: 1 }}
            >
              Unit Price:{" "}
              <strong>
                ₹{Number(item.price).toLocaleString()}
              </strong>
            </Typography>

            <Chip
              label={`Quantity: ${item.quantity}`}
              color="primary"
              size="small"
              sx={{
                mt: 2,
                mr: 1,
              }}
            />

            <Chip
              label={`Subtotal: ₹${Number(
                item.subtotal
              ).toLocaleString()}`}
              color="success"
              size="small"
              sx={{
                mt: 2,
              }}
            />
          </Box>

          <Button
            color="error"
            variant="outlined"
            startIcon={<DeleteIcon />}
            onClick={() => onRemove(item.id)}
          >
            Remove
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}