import React from 'react';
import { Dropdown, Grid } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Control } from 'react-redux-form';
import { FieldLabel } from './FormElements';
import { champOptions } from '../../../staticData';
import { handleDropdownChange } from '../../helpers';

const ChampionDropdown = ({ model, title }) => (
  <div>
    <FieldLabel>{title}</FieldLabel>
    <Control.select
      component={Dropdown}
      model={model}
      fluid
      search
      selection
      options={champOptions}
      mapProps={{
        // eslint-disable-next-line react/prop-types
        value: (props) => props.modelValue,
        onChange: (props) => handleDropdownChange(props),
      }}
    />
  </div>
);

ChampionDropdown.propTypes = {
  model: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

const Matchup = ({ model1, model2, label1, label2, formChange }) => (
  <Grid>
    <Grid.Column width={5}>
      <ChampionDropdown model={model1} formChange={formChange} title={label1} />
    </Grid.Column>
    <Grid.Column width={1}>vs</Grid.Column>
    <Grid.Column width={5}>
      <ChampionDropdown model={model2} formChange={formChange} title={label2} />
    </Grid.Column>
  </Grid>
);

Matchup.propTypes = {
  model1: PropTypes.string.isRequired,
  model2: PropTypes.string.isRequired,
  label1: PropTypes.string.isRequired,
  label2: PropTypes.string.isRequired,
  formChange: PropTypes.func.isRequired,
};

export default Matchup;
