import React, { useEffect, useState } from 'react';

import './App.css';
import { PlayersTable } from './components/PlayersTable/PlayersTable';
import { Player } from './types/Player';

const App: React.FC = () => {
  const [playersFromServer, setPlayersFromServer] = useState<Player[]>(JSON.parse(sessionStorage.getItem('players') || '[]'));
  const [ascendingSort, setAscendingSort] = useState<boolean>(JSON.parse(sessionStorage.getItem('sortOrder') || 'true'));

  useEffect(() => {
    const evtSource = new EventSource('http://localhost:5000');

    evtSource.onmessage = function(event) {
      const { player, score } = JSON.parse(event.data);
      const newPlayer: Player = {
        fullName: player,
        score,
        id: event.timeStamp, //used only as unique value for the iteration(should change to normal id)
      }

      setPlayersFromServer(curr => {
        sessionStorage.setItem('players', JSON.stringify([...curr, newPlayer]));
        return [...curr, newPlayer]
      });;
    }

    evtSource.onerror = function(error) {
      evtSource.close();
    }
  }, [])

  const handleSortOrder = () => {
    setAscendingSort(() => {
      sessionStorage.setItem('sortOrder', JSON.stringify(!ascendingSort));
      return !ascendingSort
    });
  };

  const sortedPlayers = playersFromServer.sort((a, b) => (
    ascendingSort ? a.score - b.score : b.score - a.score
  ));

  return (
    <div className="App">
      <h1>Player's Scores</h1>
      <PlayersTable
        sortedPlayers={sortedPlayers}
        ascendingSort={ascendingSort}
        handleSortOrder={handleSortOrder}
      />
    </div>
  );
}

export default App;
