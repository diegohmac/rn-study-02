import { useState } from 'react';
import { FlatList } from 'react-native';

import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { ButtonIcon } from '@components/ButtonIcon';
import { Input } from '@components/Input';
import Filter from '@components/Filter';
import PlayerCard from '@components/PlayerCard';
import { EmptyList } from '@components/EmptyList';
import { Button } from '@components/Button';

import { Container, Form, HeaderList, PlayersAmount } from './styles';

export default function Players() {

  const [players, setPlayers] = useState<string[]>(['Diego', 'Caio'])
  const [teams, setTeams] = useState<string[]>(['Team A', 'Team B'])
  const [selectedTeam, setSelectedTeam] = useState<string>('Team A')

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
      <HeaderList>
        <FlatList
          data={teams}
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
