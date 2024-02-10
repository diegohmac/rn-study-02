import { Highlight } from '@components/Highlight';
import { Container, Content, Icon } from './styles';
import { Header } from '@components/Header';
import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { groupCreate } from '@storage/group/groupCreate';
import { AppError } from '@utils/AppError';
import { Alert } from 'react-native';

export default function NewGroup() {
  const [group, setGroup] = useState('');
  const navigation = useNavigation();

  async function handleNewGroup() {
    try {
      if (!group || group.trim().length === 0) {
        return Alert.alert('New Team', 'Team name is required');
      }

      await groupCreate(group);
      navigation.navigate('players', { group });

    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert('New Team', error.message);
      } else {
        Alert.alert('New Team', 'An error occurred while creating the team');
      }
    }
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
        <Button title='Create' style={{ marginTop: 24 }} onPress={handleNewGroup} />
      </Content>
    </Container>
  );
}
