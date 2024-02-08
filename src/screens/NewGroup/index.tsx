import { Highlight } from '@components/Highlight';
import { Container, Content, Icon } from './styles';
import { Header } from '@components/Header';
import { Input } from '@components/Input';
import { Button } from '@components/Button';

export default function NewGroup() {
  return (
    <Container>
      <Header showBackButton />
      <Content>
        <Icon />
        <Highlight 
          title='New Team'
          subtitle='create a team to add players'
        />
        <Input 
          placeholder='Team name'
        />
        <Button title='Create' style={{ marginTop: 24 }} />
      </Content>
    </Container>
  );
}
