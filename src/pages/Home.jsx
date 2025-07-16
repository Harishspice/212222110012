import URLForm from '../components/URLForm';
import Container from '@mui/material/Container';

export default function Home() {
  return (
    <Container maxWidth="md">
      <h1>URL Shortener</h1>
      <URLForm />
    </Container>
  );
}