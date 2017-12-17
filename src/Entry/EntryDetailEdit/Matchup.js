import React from 'react';
import { Dropdown, Grid } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Control } from 'react-redux-form';
import { champOptions } from '../../staticData';
import { handleDropdownChange } from '../helpers';

const ChampionDropdown = ({ model }) => (
  <Control.select
    component={Dropdown}
    model={model}
    fluid
    search
    selection
    options={champOptions}
    mapProps={{
      value: props => props.modelValue,
      onChange: props => handleDropdownChange(props),
    }}
  />
);

ChampionDropdown.propTypes = {
  model: PropTypes.shape({}).isRequired,
};

const Matchup = ({ model1, model2, formChange }) => (
  <Grid>
    <Grid.Column width={5}>
      <ChampionDropdown model={model1} formChange={formChange} />
    </Grid.Column>
    <Grid.Column width={1}>vs</Grid.Column>
    <Grid.Column width={5}>
      <ChampionDropdown model={model2} formChange={formChange} />
    </Grid.Column>
  </Grid>
);

Matchup.propTypes = {
  model1: PropTypes.shape({}).isRequired,
  model2: PropTypes.shape({}).isRequired,
  formChange: PropTypes.func.isRequired,
};

export default Matchup;
