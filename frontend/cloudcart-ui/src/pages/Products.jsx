import Navbar from "../components/Navbar";
import { Container, Typography } from "@mui/material";

export default function Products() {
  return (
    <>
      <Navbar />

      <Container sx={{ mt: 4 }}>
        <Typography variant="h3" fontWeight="bold">
          Products
        </Typography>

        <Typography color="text.secondary">
          Browse CloudCart products.
        </Typography>
      </Container>
    </>
  );
}