import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import PropTypes from 'prop-types';
import { entryColors } from '../../../const/colors';

import MatchupPortrait from './MatchupPortrait';

function outcomeColor(outcome) {
  return outcome === 'W' ? entryColors.win : entryColors.loss;
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 95px 310px 90px;
  width: 485px;
  height: 150px;
  margin: 0 auto 15px auto;
  font-family: 'Roboto', sans-serif;
`;

const OutcomeCont = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const OutcomeText = styled.div`
  font-weight: bold;
  font-size: 95px;
  color: ${(props) => outcomeColor(props.outcome)};
  text-align: center;
  height: 90px;
  line-height: 90px;
`;

const KDACont = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr 1fr 1fr;
`;

const HeaderText = styled.div`
  font-size: 14px;
  text-align: center;
  grid-row-start: ${(props) => props.rowPos};
`;

const KDAText = styled(HeaderText)`
  font-size: 25px;
  font-weight: bold;
  font-style: italic;
  align-self: end;
  padding-bottom: 5px;
`;

const DeathText = styled.span`
  ${''};
`;

const Header = ({
  kills,
  deaths,
  assists,
  outcome,
  gameDate,
  champion,
  opponentChampion,
  role,
}) => (
  <Container>
    <OutcomeCont>
      <OutcomeText outcome={outcome}>{outcome}</OutcomeText>
    </OutcomeCont>
    <MatchupPortrait
      champion={champion}
      opponentChampion={opponentChampion}
      role={role}
      outcome={outcome}
    />
    <KDACont>
      <KDAText rowPos={2}>
        {kills}/<DeathText>{deaths}</DeathText>/{assists}
      </KDAText>
      <HeaderText rowPos={3}>
        {moment(new Date(gameDate)).format('MMM Do')}
      </HeaderText>
    </KDACont>
  </Container>
  // <Grid columns="equal">
  //   <Grid.Column width={4}>
  //     <Container>
  //       <Grid.Row>
  //         <OutcomeText>W</OutcomeText>
  //       </Grid.Row>
  //       <Grid.Row>
  //         <KDAText>20/12/13</KDAText>
  //       </Grid.Row>
  //     </Container>
  //   </Grid.Column>
  //   <Grid.Column width={8}>
  //     <MatchupPortrait champion={"Twisted Fate"} opponentChampion={"Ahri"} />
  //   </Grid.Column>
  //   <Grid.Column width={4}>
  //     <RightContainer>
  //       <Grid.Row>Nov 1st</Grid.Row>
  //       <Grid.Row>Gold 4</Grid.Row>
  //     </RightContainer>
  //   </Grid.Column>
  // </Grid>
);

Header.propTypes = {
  kills: PropTypes.number.isRequired,
  deaths: PropTypes.number.isRequired,
  assists: PropTypes.number.isRequired,
  outcome: PropTypes.string.isRequired,
  gameDate: PropTypes.string.isRequired,
  champion: PropTypes.string.isRequired,
  opponentChampion: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
};

export default Header;
