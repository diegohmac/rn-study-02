import { Highlight } from '@components/Highlight';
import { Container } from './styles';
import { Header } from '@components/Header';
import { GroupCard } from '@components/GroupCard';

export default function App() {
  return (
    <Container>
      <Header />
      <Highlight title='Teams' subtitle='play with your team' />
      <GroupCard title='Test Team' />
    </Container>
  );
}
