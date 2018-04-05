import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import moment from 'moment';
import { Image, Button, Icon } from 'semantic-ui-react';
import { getChampByName } from '../../staticData/champion';
import { grayBlue } from '../../const/colors';
import { GenericErrorBoundary } from '../../Error';

moment.updateLocale('en', {
  relativeTime: {
    s: 'seconds',
  },
});

const MainCont = styled.div`
  padding: 20px 8px;
  background-color: ${grayBlue};
  color: #fff;
`;

const StyledList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const ListItem = styled.li`
  display: grid;
  grid-template-columns: 30px 30px 82px;
  padding: 5px 0;
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
    background-color: ${grayBlue};
    color: #fff;
    width: 22px;
    height: 22px;
    padding: 0;
  }
`;

const NewEntryBtn = styled(Button)`
  &&& {
    background-color: #5f7885;
    color: #fff;
    width: 22px;
    height: 22px;
    padding: 0;
  }
`;

const EndCont = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
`;

const LaneCont = styled.div`
  font-size: 11px;
  color: #ccc;
  line-height: 11px;
  align-self: end;
  text-align: center;
`;

const DateCont = styled.div`
  font-size: 9px;
  line-height: 11px;
  color: #999;
  align-self: start;
  text-align: center;
  font-style: italic;
`;

// const ChampText = styled.div`
//   font-size: 11px;
//   color: #ccc;
//   text-align: center;
// `;

const ChampImg = styled(Image)`
  margin-left: 8px;
`;

const Title = styled.div`
  text-align: center;
  font-size: 13px;
  font-weight: bold;
  padding: 10px 0;
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
    <ChampImg src={getChampByName(game.champion).img} height={30} />
    <EndCont>
      <LaneCont>{game.lane}</LaneCont>
      <DateCont>{moment(game.timestamp).fromNow()}</DateCont>
    </EndCont>
  </ListItem>
);

Game.propTypes = {
  game: PropTypes.shape({}).isRequired,
  createEntryFromGameId: PropTypes.func.isRequired,
  showEntry: PropTypes.func.isRequired,
};

const GamesList = ({ games, createEntryFromGameId, showEntry }) => (
  <MainCont>
    <GenericErrorBoundary>
      <StyledList>
        <Title>Recent Games</Title>
        {games.length === 0 ? (
          <div>No recent games found</div>
        ) : (
          games.map((game) => (
            <Game
              game={game}
              createEntryFromGameId={createEntryFromGameId}
              showEntry={showEntry}
            />
          ))
        )}
      </StyledList>
    </GenericErrorBoundary>
  </MainCont>
);

GamesList.propTypes = {
  games: PropTypes.arrayOf(
    PropTypes.shape({
      gameId: PropTypes.number.isRequired,
      lane: PropTypes.string.isRequired,
      timestamp: PropTypes.number.isRequired,
      champion: PropTypes.string.isRequired,
      hasEntry: PropTypes.bool,
    }),
  ).isRequired,
  createEntryFromGameId: PropTypes.func.isRequired,
  showEntry: PropTypes.func.isRequired,
};

const RecentGames = (props) => (
  // <DashboardItem title="Recent Games" mainColor={mainColor}>
  <GamesList {...props} />
  // </DashboardItem>
);

RecentGames.propTypes = {
  games: PropTypes.arrayOf(PropTypes.object).isRequired,
  createEntryFromGameId: PropTypes.func.isRequired,
  showEntry: PropTypes.func.isRequired,
};

export default RecentGames;
