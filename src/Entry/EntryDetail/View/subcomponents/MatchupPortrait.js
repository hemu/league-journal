import React from 'react';
import { Image } from 'semantic-ui-react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { entryColors, white } from '../../../../const/colors';
import { getChampByName } from '../../../../staticData/champion';
import { getRoleImg, champOptions } from '../../../../staticData';

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
  position: relative;
  text-align: center;
  ${''};
`;

// const LaneImage = styled(Image)`
//   grid-row-start: 3;
//   grid-column-start: 2;
//   z-index: 20;
// `;

const ChampImage = styled.div`
  &&& {
    position: absolute;
    margin-left: 55px;
    top: 3px;
    z-index: 2;
    img {
      border: ${(props) => champInnerBorder(props.outcome, false)};
      box-shadow: ${(props) => champBorder(props.outcome, false)};
      box-sizing: border-box;
      -moz-box-sizing: border-box;
      -webkit-box-sizing: border-box;
    }
  }
`;

const OpponentImage = styled(ChampImage)`
  &&& {
    margin-left: 153px;
    top: 31px;
    z-index: 1;
    img {
      border: ${(props) => champInnerBorder(props.outcome, true)};
      box-shadow: ${(props) => champBorder(props.outcome, true)};
    }
    pointer: cursor;
  }
`;

const SeparatorContainer = styled.div`
  display: grid;
  grid-template-rows: repeat(3, 1fr);
`;

const RoleImg = styled(Image)`
  height: 35px;
  grid-row-start: 2;
  margin: 0 auto;
`;

const MatchupPortrait = ({ champion, opponentChampion, role, outcome }) => {
  const { img: champImg } = getChampByName(champion);
  const { img: opponentImg } = getChampByName(opponentChampion);
  return (
    <Container>
      <ChampImage outcome={outcome}>
        <Image src={champImg} height={120} circular />
      </ChampImage>
      <OpponentImage
        outcome={outcome}
        onClick={() => console.log('editing opponent image...')}
      >
        <Image src={opponentImg} height={70} circular />
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
