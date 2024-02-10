import { Highlight } from '@components/Highlight';
import { Container, Content, Icon } from './styles';
import { Header } from '@components/Header';
import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { groupCreate } from '@storage/group/groupCreate';

export default function NewGroup() {
  const [group, setGroup] = useState('');
  const navigation = useNavigation();

  async function handleNewGroup() {
    await groupCreate(group);
    navigation.navigate('players', { group });
  };

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
          onChangeText={setGroup}
        />
        <Button title='Create' style={{ marginTop: 24 }} onPress={handleNewGroup} disabled={!group} />
      </Content>
    </Container>
  );
}
