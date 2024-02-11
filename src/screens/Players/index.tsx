import { useEffect, useRef, useState } from 'react';
import { Alert, FlatList, TextInput } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { ButtonIcon } from '@components/ButtonIcon';
import { Input } from '@components/Input';
import Filter from '@components/Filter';
import PlayerCard from '@components/PlayerCard';
import { EmptyList } from '@components/EmptyList';
import { Button } from '@components/Button';

import { AppError } from '@utils/AppError';
import { playerAddByGroup } from '@storage/player/playerAddByGroup';
import { playerGetByTeam } from '@storage/player/playerGetByTeam';
import { PlayerStorageDTO } from '@storage/player/PlayerStorageDTO';
import { playerRemoveByGroup } from '@storage/player/playerRemoveByGroup';
import { groupRemove } from '@storage/group/groupRemove';

import { Container, Form, HeaderList, PlayersAmount } from './styles';

type RouteParams = {
  Params: {
    group: string;
  }
}

export default function Players() {

  const [players, setPlayers] = useState<PlayerStorageDTO[]>([])
  const [selectedTeam, setSelectedTeam] = useState<string>('Team A')
  const [newPlayerName, setNewPlayerName] = useState('')

  const navigation = useNavigation();
  const inputRef = useRef<TextInput>(null);
  const route = useRoute<RouteProp<RouteParams>>();
  const { group } = route.params;

  async function handleAddPlayer() {
    if (newPlayerName.trim().length === 0) {
      return Alert.alert('Invalid name', 'The player name cannot be empty');
    }
    
    const newPlayer = {
      name: newPlayerName,
      team: selectedTeam,
    }

    try {
      await playerAddByGroup(newPlayer, group);
      setPlayers([...players, newPlayer]);
      setNewPlayerName('')
      inputRef.current?.blur();
    } catch (error) {
      if (error instanceof AppError) {
        return Alert.alert('New Player', error.message);
      }
      console.log(error);
      Alert.alert('New Player', 'An error occurred while adding the player');
    }
  }

  async function handleRemovePlayer(playerName: string) {
    try {
      const updatedPlayers = await playerRemoveByGroup(group, playerName);
      const updatedPlayersByTeam = updatedPlayers.filter(player => player.team === selectedTeam);
      setPlayers(updatedPlayersByTeam);
    } catch (error) {
      console.log(error);
      Alert.alert('Remove Player', 'An error occurred while removing the player');
    }
  }

  async function handleRemoveGroup() {
    Alert.alert('Remove Team', 'Are you sure you want to remove this team?', [
      {
        text: 'Cancel',
        style: 'cancel'
        },
        {
          text: 'Yes',
          style: 'destructive',
          onPress: async () => {
            try {
              await groupRemove(group);
              navigation.navigate('groups');
            } catch (error) {
              console.log(error);
              Alert.alert('Remove Team', 'An error occurred while removing the team');
            }
          }
        },
      ]);
  }


  useEffect(() => {
    async function fetchPlayersByTeam() {
      try {
        const playersByTeam = await playerGetByTeam(group, selectedTeam);
        setPlayers(playersByTeam);
      } catch (error) {
        console.log(error);
        Alert.alert('Players', `An error occurred while fetching the players from ${selectedTeam}`);
      }
    }

    fetchPlayersByTeam();
  }, [group, selectedTeam]);

  return (
    <Container>
      <Header showBackButton />
      <Highlight
        title={group}
        subtitle='add players to teams'
      />
      <Form>
        <Input
          inputRef={inputRef}
          placeholder='Player name'
          autoCorrect={false}
          value={newPlayerName}
          onChangeText={setNewPlayerName}
          onSubmitEditing={handleAddPlayer}
          returnKeyType='done'
        />
        <ButtonIcon icon='add' onPress={handleAddPlayer} />
      </Form>
      <HeaderList>
        <FlatList
          data={['Team A', 'Team B']}
          keyExtractor={item => item}
          horizontal
          renderItem={({ item }) => (
            <Filter
              title={item}
              isActive={item === selectedTeam}
              onPress={() => setSelectedTeam(item)}
            />
          )}
        />
        <PlayersAmount>
          {players.length}
        </PlayersAmount>
      </HeaderList>
      <FlatList
        data={players}
        keyExtractor={item => item.name}
        renderItem={({ item }) => (
          <PlayerCard name={item.name} onRemove={() => handleRemovePlayer(item.name)} />
        )}
        ListEmptyComponent={() => (
          <EmptyList message='No players added' />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[{ paddingBottom: 100 }, players.length === 0 && { flex: 1 }]}
      />
      <Button title='Remove Team' type='SECONDARY' onPress={handleRemoveGroup} />
    </Container>
  );
}
