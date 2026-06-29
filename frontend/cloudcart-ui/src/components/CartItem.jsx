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
        },
      }}
    >
      <CardContent>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box>
            <Typography
              variant="h6"
              fontWeight="bold"
            >
              📦 Product #{item.product_id}
            </Typography>

            <Chip
              label={`Quantity: ${item.quantity}`}
              color="primary"
              size="small"
              sx={{ mt: 1 }}
            />
          </Box>

          <Button
            color="error"
            variant="outlined"
            startIcon={<DeleteIcon />}
            onClick={() =>
              onRemove(item.id)
            }
          >
            Remove
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}