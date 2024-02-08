import { Highlight } from '@components/Highlight';
import { Container, Form } from './styles';
import { Header } from '@components/Header';
import { ButtonIcon } from '@components/ButtonIcon';
import { Input } from '@components/Input';

export default function Players() {
  return (
    <Container>
      <Header showBackButton />
      <Highlight 
        title="Players" 
        subtitle='add players to teams'
      />
      <Form>
        <Input 
          placeholder='Player name'
          autoCorrect={false}
        />
        <ButtonIcon icon='add' />
      </Form>
    </Container>
  );
}
