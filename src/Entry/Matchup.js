import React from "react";
import { Dropdown } from "semantic-ui-react";
import { champOptions } from "../staticData";
import { Grid } from "semantic-ui-react";
import { inject, observer } from "mobx-react";

const ChampionDropdown = ({ champ, onChange }) => (
  <Dropdown
    selection
    search
    options={champOptions}
    value={champ}
    onChange={onChange}
  />
);

const TwoChampMatchup = ({ champ1, champ2, onChange1, onChange2 }) => (
  <Grid>
    <Grid.Column width={5}>
      <ChampionDropdown champ={champ1} onChange={onChange1} />
    </Grid.Column>
    <Grid.Column width={1}>vs</Grid.Column>
    <Grid.Column width={5}>
      <ChampionDropdown champ={champ2} onChange={onChange2} />
    </Grid.Column>
  </Grid>
);

const _ChampionMatchup = ({ entries: { entryDetailStore: entry } }) => (
  <TwoChampMatchup
    champ1={entry.champion}
    champ2={entry.opponentChampion}
    onChange1={(event, data) => {
      entry.changeChampion(data.value);
    }}
    onChange2={(event, data) => {
      entry.changeOpponentChampion(data.value);
    }}
  />
);
export const ChampionMatchup = inject("entries")(observer(_ChampionMatchup));

const _JunglerMatchup = ({ entries: { entryDetailStore: entry } }) => (
  <TwoChampMatchup
    champ1={entry.jungler}
    champ2={entry.opponentJungler}
    onChange1={(event, data) => {
      entry.changeJungler(data.value);
    }}
    onChange2={(event, data) => {
      entry.changeOpponentJungler(data.value);
    }}
  />
);
export const JunglerMatchup = inject("entries")(observer(_JunglerMatchup));
