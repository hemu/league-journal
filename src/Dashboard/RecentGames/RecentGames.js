import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import moment from 'moment';
import { Image, Button } from 'semantic-ui-react';
import { getChampByName } from '../../staticData/champion';
import DashboardItem from '../shared/DashboardItem';

moment.updateLocale('en', {
  relativeTime: {
    s: 'seconds',
  },
});

const StyledList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const ListItem = styled.li`
  display: grid;
  grid-template-columns: 1fr 2fr 2fr 2fr 1fr;
  padding: 5px 0;
  justify-content: center;
  align-items: center;
`;

const TextBtn = styled.button`
  background: none;
  border: none;
  margin: 0;
  padding: 0;
  text-decoration: underline;
  color: #70aeff;
  cursor: pointer;
`;

const GamesList = ({ games }) => (
  <StyledList>
    {games.map((game) => (
      <ListItem key={game.id}>
        <Image src={getChampByName(game.champion).img} height={30} />
        <div>{game.champion}</div>
        <div>{game.lane}</div>
        <div>{moment(game.timestamp).fromNow()}</div>
        <TextBtn>New Entry</TextBtn>
      </ListItem>
    ))}
  </StyledList>
);

GamesList.propTypes = {
  games: PropTypes.arrayOf(
    PropTypes.shape({
      game: PropTypes.string.isRequired,
      lane: PropTypes.string.isRequired,
      timestamp: PropTypes.number.isRequired,
    }),
  ).isRequired,
};

const RecentGames = ({ mainColor, games }) => (
  <DashboardItem title="Recent Games" mainColor={mainColor}>
    <GamesList games={games} />
  </DashboardItem>
);

RecentGames.propTypes = {
  games: PropTypes.arrayOf(PropTypes.string).isRequired,
  mainColor: PropTypes.string.isRequired,
};

export default RecentGames;