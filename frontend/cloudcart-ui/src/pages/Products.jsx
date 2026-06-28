import { useEffect, useState } from "react";

import {
  Container,
  Grid,
  TextField,
  Typography,
  Snackbar,
} from "@mui/material";

import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import api from "../services/api";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const response = await api.get("/products");

    setProducts(response.data);
  };

  const addToCart = async (productId) => {
    try {
      await api.post("/cart/", {
        product_id: productId,
        quantity: 1,
      });

      setOpen(true);
    } catch (error) {
      alert("Failed to add product to cart");
    }
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Navbar />

      <Container sx={{ mt: 5 }}>
        <Typography
          variant="h3"
          fontWeight="bold"
          gutterBottom
        >
          Products
        </Typography>

        <TextField
          fullWidth
          placeholder="Search products..."
          sx={{ mb: 4 }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <Grid container spacing={3}>
          {filteredProducts.map((product) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={product.id}
            >
              <ProductCard
                product={product}
                onAddToCart={addToCart}
              />
            </Grid>
          ))}
        </Grid>
      </Container>

      <Snackbar
        open={open}
        autoHideDuration={2500}
        message="Added to cart!"
        onClose={() => setOpen(false)}
      />
    </>
  );
}