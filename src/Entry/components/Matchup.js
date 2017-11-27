import React from "react";
import { Dropdown } from "semantic-ui-react";
import { champOptions } from "../../staticData";
import { Grid } from "semantic-ui-react";
import { Control, actions } from "react-redux-form";
import { formModel } from "../helpers";
import { handleDropdownChange } from "./entryHelpers";

const ChampionDropdown = ({ model, formChange }) => (
  <Control.select
    component={Dropdown}
    model={model}
    fluid
    search
    selection
    options={champOptions}
    mapProps={{
      value: props => props.modelValue,
      onChange: props => handleDropdownChange(props)
    }}
  />
);

export default ({ model1, model2, formChange }) => (
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
