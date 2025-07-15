import { Typography, Container } from "@mui/material";

export default function StatsPage() {
  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Statistics Page
      </Typography>
      <Typography variant="body1">
        Implement click tracking & analytics here.
      </Typography>
    </Container>
  );
}
