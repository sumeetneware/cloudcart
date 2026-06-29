import {
  Card,
  CardContent,
  Typography,
  Button,
  CardActions,
  Box,
  Chip,
} from "@mui/material";

export default function ProductCard({
  product,
  onAddToCart,
}) {
  const category = product.category || "";

  const categoryConfig = {
    Laptop: {
      icon: "💻",
      gradient: "linear-gradient(135deg,#2563eb,#1d4ed8)",
    },
    Phone: {
      icon: "📱",
      gradient: "linear-gradient(135deg,#7c3aed,#6d28d9)",
    },
    Camera: {
      icon: "📷",
      gradient: "linear-gradient(135deg,#db2777,#be185d)",
    },
    TV: {
      icon: "📺",
      gradient: "linear-gradient(135deg,#059669,#047857)",
    },
  };

  const currentCategory =
    categoryConfig[category] || {
      icon: "📦",
      gradient: "linear-gradient(135deg,#2563eb,#7c3aed)",
    };

  return (
    <Card
      sx={{
        height: "100%",
        borderRadius: 5,
        overflow: "hidden",
        transition: "all 0.3s ease",

        "&:hover": {
          transform: "translateY(-10px)",
          boxShadow: 10,
        },
      }}
    >
      <Box
        sx={{
          height: 180,
          background: currentCategory.gradient,

          display: "flex",
          justifyContent: "center",
          alignItems: "center",

          fontSize: 72,
        }}
      >
        {currentCategory.icon}
      </Box>

      <CardContent>
        {category && (
          <Chip
            label={category}
            size="small"
            color="primary"
            sx={{ mb: 2 }}
          />
        )}

        <Typography
          variant="h5"
          fontWeight="bold"
        >
          {product.name}
        </Typography>

        <Typography
          variant="h6"
          color="primary"
          sx={{
            mt: 2,
            fontWeight: 700,
          }}
        >
          ₹{Number(product.price).toLocaleString()}
        </Typography>

        <Typography
          color="text.secondary"
          sx={{
            mt: 2,
            minHeight: 70,
            lineHeight: 1.7,
          }}
        >
          {product.description ||
            "Premium quality product available on CloudCart."}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            mt: 2,
            color:
              product.stock > 0
                ? "success.main"
                : "error.main",

            fontWeight: 600,
          }}
        >
          {product.stock > 0
            ? `In Stock (${product.stock})`
            : "Out of Stock"}
        </Typography>
      </CardContent>

      <CardActions sx={{ p: 2 }}>
        <Button
          variant="contained"
          fullWidth
          size="large"
          disabled={product.stock === 0}
          onClick={() =>
            onAddToCart(product.id)
          }
          sx={{
            borderRadius: 3,
            py: 1.3,
            textTransform: "none",
            fontWeight: "bold",
          }}
        >
          {product.stock > 0
            ? "Add To Cart"
            : "Out of Stock"}
        </Button>
      </CardActions>
    </Card>
  );
}