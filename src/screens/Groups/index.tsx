import { Highlight } from '@components/Highlight';
import { Container } from './styles';
import { Header } from '@components/Header';
import { GroupCard } from '@components/GroupCard';
import { useState } from 'react';
import { FlatList } from 'react-native';
import { EmptyList } from '@components/EmptyList';
import { Button } from '@components/Button';
import { useNavigation } from '@react-navigation/native';

export default function Groups() {

  const [groups, setGroups] = useState(['Gym Team', 'Gaming Team']);
  const navigation = useNavigation();

  function handleNewGroup() {
    navigation.navigate('new');
  }

  return (
    <Container>
      <Header />
      <Highlight title='Teams' subtitle='play with your team' />
      <FlatList
        data={groups}
        keyExtractor={(item) => item}
        renderItem={({ item }) => <GroupCard title={item} />}
        contentContainerStyle={groups.length === 0 && { flex: 1 }}
        ListEmptyComponent={() => <EmptyList message='No team registered yet' />}
      />
      <Button title='Create new team' onPress={handleNewGroup}/>
    </Container>
  );
}
