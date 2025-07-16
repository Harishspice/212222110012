import StatsTable from '../components/StatsTable';
import Container from '@mui/material/Container';

export default function Stats() {
  return (
    <Container maxWidth="lg">
      <h1>Shortened URL Stats</h1>
      <StatsTable />
    </Container>
  );
}