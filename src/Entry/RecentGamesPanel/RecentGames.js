import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import moment from 'moment';
import { Image, Button, Icon, Loader } from 'semantic-ui-react';
import { getChampByName } from '../../staticData/champion';
import { recentGamesColors } from '../../const/colors';
import { GenericErrorBoundary } from '../../Error';
import ErrorDisplay from '../../Error/ErrorDisplay';

moment.updateLocale('en', {
  relativeTime: {
    s: 'seconds',
  },
});

const MainCont = styled.div`
  padding: 20px 8px;
  background-color: ${recentGamesColors.bg};
  color: ${recentGamesColors.font};
  border-left: 1px solid #e8e8e8;
`;

const StyledList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const ChampImg = styled(Image)`
  margin-left: 7px;
`;

const ListItem = styled.li`
  display: grid;
  grid-template-columns: 30px 30px 82px;
  margin: 13px 0;
  justify-content: center;
  align-items: center;
`;

// const TextBtn = styled.button`
//   background: none;
//   border: none;
//   margin: 0;
//   padding: 0;
//   text-decoration: underline;
//   color: #70aeff;
//   cursor: pointer;
// `;

const LinkEntryBtn = styled(Button)`
  &&& {
    background-color: ${recentGamesColors.bg};
    color: ${recentGamesColors.font};
    width: 22px;
    height: 22px;
    padding: 0;
  }
`;

const NewEntryBtn = styled(Button)`
  &&& {
    background-color: ${recentGamesColors.bgNewBtn};
    color: ${recentGamesColors.fontNewBtn};
    width: 22px;
    height: 22px;
    padding: 0;
    :hover {
      background-color: ${recentGamesColors.bgNewBtnHover};
    }
  }
`;

const EndCont = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
`;

const LaneCont = styled.div`
  font-size: 9px;
  color: ${recentGamesColors.font};
  line-height: 11px;
  align-self: end;
  text-align: center;
`;

const DateCont = styled.div`
  font-size: 9px;
  line-height: 11px;
  color: ${recentGamesColors.font};
  align-self: start;
  text-align: center;
  font-style: italic;
`;

const QueueCont = styled.div`
  font-size: 9px;
  line-height: 11px;
  color: ${recentGamesColors.font};
  align-self: start;
  text-align: center;
`;

const QueueRankedCont = styled(QueueCont)`
  font-weight: bold;
`;

// const ChampText = styled.div`
//   font-size: 11px;
//   color: #ccc;
//   text-align: center;
// `;

const Title = styled.div`
  text-align: center;
  font-size: 15px;
  font-weight: bold;
  padding: 10px 0;
`;

const EmptyMessage = styled.div`
  text-align: center;
  padding-top: 10px;
`;

const Game = ({ game, createEntryFromGameId, showEntry }) => (
  <ListItem key={game.gameId}>
    {game.entryId ? (
      <LinkEntryBtn onClick={() => showEntry(game.entryId)} icon>
        <Icon name="external" />
      </LinkEntryBtn>
    ) : (
      <NewEntryBtn onClick={() => createEntryFromGameId(game.gameId)} icon>
        <Icon name="plus" />
      </NewEntryBtn>
    )}
    <ChampImg src={getChampByName(game.champion).img} height={30} rounded />
    <EndCont>
      <LaneCont>{game.lane}</LaneCont>
      {game.queue === 'Ranked' ? (
        <QueueRankedCont>{game.queue}</QueueRankedCont>
      ) : (
        <QueueCont>{game.queue}</QueueCont>
      )}
      <DateCont>{moment(game.timestamp).fromNow()}</DateCont>
    </EndCont>
  </ListItem>
);

Game.propTypes = {
  game: PropTypes.shape({}).isRequired,
  createEntryFromGameId: PropTypes.func.isRequired,
  showEntry: PropTypes.func.isRequired,
};

const GamesList = ({ games, createEntryFromGameId, showEntry }) =>
  (games.length === 0
    ? [
      <EmptyMessage>
          You haven't played any recent Ranked or Normal 5v5 games.
      </EmptyMessage>,
      <EmptyMessage>Come back and check after you play!</EmptyMessage>,
    ]
    : games.map((game) => (
      <Game
        game={game}
        createEntryFromGameId={createEntryFromGameId}
        showEntry={showEntry}
      />
    )));

GamesList.propTypes = {
  createEntryFromGameId: PropTypes.func.isRequired,
  error: PropTypes.string,
  games: PropTypes.arrayOf(
    PropTypes.shape({
      gameId: PropTypes.number.isRequired,
      lane: PropTypes.string.isRequired,
      timestamp: PropTypes.number.isRequired,
      champion: PropTypes.string.isRequired,
      hasEntry: PropTypes.bool,
    }),
  ).isRequired,
  showEntry: PropTypes.func.isRequired,
};

const LoaderCont = styled.div`
  width: 100%;
  text-align: center;
  padding-top: 50px;
`;

const RecentGames = (props) => (
  <MainCont>
    <GenericErrorBoundary>
      <StyledList>
        <Title>Recent Games</Title>
        {props.isLoading ? (
          <LoaderCont>
            <Loader size="small" active inline />
          </LoaderCont>
        ) : props.error ? (
          <ErrorDisplay fontSize={12}>{props.error}</ErrorDisplay>
        ) : (
          <GamesList {...props} />
        )}
      </StyledList>
    </GenericErrorBoundary>
  </MainCont>
);

RecentGames.propTypes = {
  createEntryFromGameId: PropTypes.func.isRequired,
  error: PropTypes.string,
  games: PropTypes.arrayOf(PropTypes.object).isRequired,
  showEntry: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

RecentGames.defaultProps = {
  error: '',
};

export default RecentGames;
