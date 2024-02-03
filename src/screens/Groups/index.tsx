import { Highlight } from '@components/Highlight';
import { Container } from './styles';
import { Header } from '@components/Header';

export default function App() {
  return (
    <Container>
      <Header />
      <Highlight title='Teams' subtitle='play with your team' />
    </Container>
  );
}
