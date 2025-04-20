import { Grid, Container, Skeleton } from '@mui/material';
import ProductCard from './ProductCard';

function ProductList({ products, loading = false, onAddToCart }) {
  return (
    <Container sx={{ py: 4 }}>
      <Grid container spacing={3}>
        {loading
          ? Array.from(new Array(6)).map((_, index) => (
              <Grid
                size={{xs: 12, sm: 6, md: 4}}
                key={index}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height={300}
                  sx={{ maxWidth: 345, borderRadius: 1 }}
                />
              </Grid>
            ))
          : products.map((product) => (
              <Grid
                size={{xs: 12, sm: 6, md: 4}}
                key={product.id}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <ProductCard product={product} onAddToCart={onAddToCart} />
              </Grid>
            ))}
      </Grid>
    </Container>
  );
}

export default ProductList;