import { Highlight } from '@components/Highlight';
import { Container } from './styles';
import { Header } from '@components/Header';
import { GroupCard } from '@components/GroupCard';
import { useCallback, useState } from 'react';
import { Alert, FlatList } from 'react-native';
import { EmptyList } from '@components/EmptyList';
import { Button } from '@components/Button';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { groupGetAll } from '@storage/group/groupGetAll';

export default function Groups() {

  const [groups, setGroups] = useState<string[]>([]);
  const navigation = useNavigation();

  function handleNewGroup() {
    navigation.navigate('new');
  }

  function handleGroupDetails(group: string) {
    navigation.navigate('players', { group });
  }

  useFocusEffect(useCallback(() => {
    async function fetchGroups() {
      try {
        const data = await groupGetAll();
        setGroups(data);
      } catch (error) {
        console.log(error);
        Alert.alert('Groups', 'An error occurred while fetching the teams');
      }
    }

    fetchGroups();
  }, []));

  return (
    <Container>
      <Header />
      <Highlight title='Teams' subtitle='play with your team' />
      <FlatList
        data={groups}
        keyExtractor={(item) => item}
        renderItem={({ item }) => <GroupCard title={item} onPress={() => handleGroupDetails(item)}/>}
        contentContainerStyle={groups.length === 0 && { flex: 1 }}
        ListEmptyComponent={() => <EmptyList message='No team registered yet' />}
      />
      <Button title='Create new team' onPress={handleNewGroup} />
    </Container>
  );
}
