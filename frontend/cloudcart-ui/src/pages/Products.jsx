import { useEffect, useState } from "react";

import {
  Container,
  Grid,
  Typography,
  TextField,
  Snackbar,
  Alert,
  Box,
  CircularProgress,
  InputAdornment,
  Paper,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";

import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import { useCart } from "../context/CartContext";
import api from "../services/api";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState(false);

  const { setCount } = useCart();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await api.get("/products/");
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId) => {
    try {
      await api.post("/cart/", {
        product_id: productId,
        quantity: 1,
      });

      setCount((prev) => prev + 1);
      setSnackbar(true);
    } catch (error) {
      console.error(error);
      alert("Failed to add product");
    }
  };

  const filteredProducts = products.filter((product) =>
    product.name
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <>
      <Navbar />

      <Container maxWidth="xl" sx={{ py: 5 }}>
        {/* HERO SECTION */}

        <Paper
          elevation={0}
          sx={{
            mb: 6,
            p: { xs: 4, md: 6 },

            borderRadius: 6,

            background:
              "linear-gradient(135deg,#2563eb,#7c3aed)",

            color: "white",

            overflow: "hidden",
          }}
        >
          <Typography
            variant="h2"
            fontWeight="bold"
            sx={{
              fontSize: {
                xs: "2.2rem",
                md: "3.5rem",
              },
            }}
          >
            Summer Sale 2026
          </Typography>

          <Typography
            variant="h5"
            sx={{
              mt: 2,
              opacity: 0.9,
              maxWidth: 700,
            }}
          >
            Discover premium electronics at
            unbeatable prices.
          </Typography>

          <Box
            sx={{
              mt: 4,
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <LocalOfferIcon />

            <Typography>
              Up to 40% off on selected products
            </Typography>
          </Box>
        </Paper>

        {/* PAGE HEADER */}

        <Typography
          variant="h3"
          fontWeight="bold"
          gutterBottom
        >
          Discover Products
        </Typography>

        <Typography
          color="text.secondary"
          sx={{ mb: 4 }}
        >
          Browse our latest collection.
        </Typography>

        {/* SEARCH */}

        <TextField
          fullWidth
          placeholder="Search products..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          sx={{ mb: 5 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        {/* LOADING */}

        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: 10,
            }}
          >
            <CircularProgress size={60} />
          </Box>
        ) : filteredProducts.length === 0 ? (
          <Paper
            sx={{
              p: 6,
              textAlign: "center",
              borderRadius: 4,
            }}
          >
            <Typography variant="h4">
              🔍 No products found
            </Typography>

            <Typography
              color="text.secondary"
              sx={{ mt: 2 }}
            >
              Try searching for something else.
            </Typography>
          </Paper>
        ) : (
          <Grid container spacing={4}>
            {filteredProducts.map((product) => (
              <Grid
                key={product.id}
                item
                xs={12}
                sm={6}
                md={4}
                lg={3}
              >
                <ProductCard
                  product={product}
                  onAddToCart={addToCart}
                />
              </Grid>
            ))}
          </Grid>
        )}

        {/* SNACKBAR */}

        <Snackbar
          open={snackbar}
          autoHideDuration={2500}
          onClose={() => setSnackbar(false)}
        >
          <Alert
            severity="success"
            variant="filled"
          >
            Product added to cart!
          </Alert>
        </Snackbar>
      </Container>
    </>
  );
}