import { useState } from 'react';
import { Alert, FlatList } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';

import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { ButtonIcon } from '@components/ButtonIcon';
import { Input } from '@components/Input';
import Filter from '@components/Filter';
import PlayerCard from '@components/PlayerCard';
import { EmptyList } from '@components/EmptyList';
import { Button } from '@components/Button';

import { Container, Form, HeaderList, PlayersAmount } from './styles';
import { AppError } from '@utils/AppError';
import { playerAddByGroup } from '@storage/player/playerAddByGroup';

type RouteParams = {
  Params: {
    group: string;
  }
}

export default function Players() {

  const [players, setPlayers] = useState<string[]>([])
  const [selectedTeam, setSelectedTeam] = useState<string>('Team A')
  const [newPlayerName, setNewPlayerName] = useState('')

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
    } catch (error) {
      if (error instanceof AppError) {
        return Alert.alert('New Player', error.message);
      }
      console.log(error);
      Alert.alert('New Player', 'An error occurred while adding the player');
    }

  }

  return (
    <Container>
      <Header showBackButton />
      <Highlight
        title={group}
        subtitle='add players to teams'
      />
      <Form>
        <Input
          placeholder='Player name'
          autoCorrect={false}
          onChangeText={setNewPlayerName}
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
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <PlayerCard name={item} onRemove={() => { }} />
        )}
        ListEmptyComponent={() => (
          <EmptyList message='No players added' />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[{ paddingBottom: 100 }, players.length === 0 && { flex: 1 }]}
      />
      <Button title='Remove Team' type='SECONDARY' />
    </Container>
  );
}
