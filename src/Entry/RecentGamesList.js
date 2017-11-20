import React from "react";
import { inject, observer } from "mobx-react";
import { List, Button, Header } from "semantic-ui-react";

const GameItem = ({ game, gameIndex }) => (
  <List.Item data-id={game.gameId} data-game-index={gameIndex}>
    {game.role} {game.champion}
  </List.Item>
);

class RecentGamesList extends React.Component {
  render() {
    if (this.props.recentGames.fetching) {
      return <div>Loading recent games...</div>;
    }

    const { recentGames, entries } = this.props;

    return (
      <div>
        <Header>Recent Games</Header>
        <List
          selection
          onClick={(event, data) => {
            const gameIndex = event.target.dataset.gameIndex;
            entries.createEntryFromRecentGame(recentGames.games[gameIndex]);
          }}
        >
          {recentGames.games.map((game, i) => (
            <GameItem key={game.gameId} game={game} gameIndex={i} />
          ))}
        </List>
      </div>
    );
  }
}

export default inject("recentGames", "entries")(observer(RecentGamesList));
