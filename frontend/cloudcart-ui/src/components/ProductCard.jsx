import {
  Card,
  CardContent,
  Typography,
  Button,
  CardActions,
} from "@mui/material";

export default function ProductCard({ product, onAddToCart }) {
  return (
    <Card
      sx={{
        height: "100%",
        borderRadius: 4,
        transition: "0.3s",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: 8,
        },
      }}
    >
      <CardContent>
        <Typography variant="h5" fontWeight="bold">
          {product.name}
        </Typography>

        <Typography
          variant="h6"
          color="primary"
          sx={{ mt: 2 }}
        >
          ₹{Number(product.price).toLocaleString()}
        </Typography>

        <Typography
          color="text.secondary"
          sx={{ mt: 2 }}
        >
          {product.description}
        </Typography>

        <Typography
          sx={{ mt: 2 }}
          variant="body2"
        >
          Stock: {product.stock}
        </Typography>
      </CardContent>

      <CardActions sx={{ p: 2 }}>
        <Button
          variant="contained"
          fullWidth
          onClick={() => onAddToCart(product.id)}
        >
          Add To Cart
        </Button>
      </CardActions>
    </Card>
  );
}