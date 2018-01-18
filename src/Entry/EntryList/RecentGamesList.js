import React from 'react';
import { List, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const GameItem = ({ game, gameIndex }) => (
  <List.Item data-id={game.gameId} data-game-index={gameIndex}>
    {game.role} {game.champion}
  </List.Item>
);

GameItem.propTypes = {
  game: PropTypes.shape({
    gameId: PropTypes.string,
    role: PropTypes.string,
    champion: PropTypes.string,
  }).isRequired,
  gameIndex: PropTypes.number.isRequired,
};

const RecentGamesList = ({ recentGames, entries }) => {
  if (recentGames.fetching) {
    return <div>Loading recent games...</div>;
  }

  return (
    <div>
      <Header>Recent Games</Header>
      <List
        selection
        onClick={(event) => {
          const { target: { dataset: { gameIndex } } } = event;
          entries.createEntryFromRecentGame(recentGames.games[gameIndex]);
        }}
      >
        {recentGames.games.map((game, i) => (
          <GameItem key={game.gameId} game={game} gameIndex={i} />
        ))}
      </List>
    </div>
  );
};

RecentGamesList.propTypes = {
  recentGames: PropTypes.arrayOf(PropTypes.object).isRequired,
  entries: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default RecentGamesList;
