import React from 'react';
import { Image } from 'semantic-ui-react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { entryColors, white } from '../../../const/colors';
import { getChampByName } from '../../../staticData/champion';
import { getRoleImg } from '../../../staticData';

function separatorColor(outcome) {
  return outcome === 'W' ? entryColors.win : entryColors.loss;
}

function champInnerBorder(outcome, isOpponent) {
  if ((outcome === 'W' && !isOpponent) || (outcome !== 'W' && isOpponent)) {
    return `3px solid ${white}`;
  }
  return 'none';
}

function champBorder(outcome, isOpponent) {
  let color = '';
  if (outcome === 'W') {
    if (isOpponent) {
      return 'none';
    }
    color = entryColors.win;
  } else if (outcome === 'L') {
    if (!isOpponent) {
      return 'none';
    }
    color = entryColors.loss;
  }
  return `0 0 0 7px ${color}`;
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  text-align: center;
  min-width: 320px;
`;

// const LaneImage = styled(Image)`
//   grid-row-start: 3;
//   grid-column-start: 2;
//   z-index: 20;
// `;

const ChampImage = styled.div`
  &&& {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    img {
      border: ${props => champInnerBorder(props.outcome, false)};
      box-shadow: ${props => champBorder(props.outcome, false)};
      box-sizing: border-box;
      -moz-box-sizing: border-box;
      -webkit-box-sizing: border-box;
    }
  }
`;

const OpponentImage = styled(ChampImage)`
  &&& {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    img {
      border: ${props => champInnerBorder(props.outcome, true)};
      box-shadow: ${props => champBorder(props.outcome, true)};
    }
  }
`;

const SeparatorContainer = styled.div`
  display: grid;
  grid-template-rows: repeat(5, 1fr);
`;

const ChampSeparator = styled.hr`
  border: 3px solid ${props => separatorColor(props.outcome)};
  width: 100%;
  margin-left: -2px;
  margin-right: -2px;
  grid-row-start: 3;
  ${''} &:after {
    background: url(${props => props.icon}) no-repeat top center;
    content: '';
    display: block;
    height: 50px; /* height of the ornament */
    position: relative;
    top: -25px; /* half the height of the ornament */
  }
`;

const MatchupPortrait = ({
  champion, opponentChampion, role, outcome,
}) => {
  const { img: champImg } = getChampByName(champion);
  const { img: opponentImg } = getChampByName(opponentChampion);
  return (
    <Container>
      <ChampImage outcome={outcome}>
        <Image src={champImg} height={110} circular />
      </ChampImage>
      <SeparatorContainer>
        <ChampSeparator rowPos={1} icon={getRoleImg(role)} outcome={outcome} />
      </SeparatorContainer>
      <OpponentImage outcome={outcome}>
        <Image src={opponentImg} height={75} circular />
      </OpponentImage>
    </Container>
  );
};

MatchupPortrait.propTypes = {
  champion: PropTypes.string.isRequired,
  opponentChampion: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  outcome: PropTypes.string.isRequired,
};

export default MatchupPortrait;
