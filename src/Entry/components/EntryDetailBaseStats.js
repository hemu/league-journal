import React from "react";
import { Control, actions } from "react-redux-form";
import {
  Button,
  Checkbox,
  Form,
  Input,
  Divider,
  Dropdown,
  Grid
} from "semantic-ui-react";
import styled from "styled-components";
import moment from "moment";

import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";

import { formModel } from "../helpers";
import { rankOptions, outcomeOptions, roleOptions } from "../../staticData";
import { handleDropdownChange } from "../helpers";

const DatePickerCont = styled.div`
  .DayPickerInput-OverlayWrapper {
    z-index: 1;
  }
`;

export default ({ formChange }) => (
  <Grid columns={5}>
    <Grid.Row>
      <Grid.Column width={3}>
        <DatePickerCont>
          <Control.text
            component={DayPickerInput}
            model=".gameDate"
            format={"MMM Do"}
            mapProps={{
              value: props =>
                moment(new Date(props.modelValue)).format("MMM Do")
            }}
            onDayChange={day =>
              formChange(actions.change(formModel(".gameDate"), day.toDate()))}
          />
        </DatePickerCont>
      </Grid.Column>
      <Grid.Column width={4}>
        <Control.select
          component={Dropdown}
          model=".rank"
          placeholder="Rank"
          fluid
          search
          selection
          options={rankOptions}
          selectOnBlur={false}
          mapProps={{
            value: props => props.modelValue,
            onChange: props => handleDropdownChange(props)
          }}
        />
      </Grid.Column>
      <Grid.Column width={2}>
        <Control.select
          component={Dropdown}
          model=".outcome"
          fluid
          search
          selection
          options={outcomeOptions}
          mapProps={{
            value: props => props.modelValue,
            onChange: props => handleDropdownChange(props)
          }}
        />
      </Grid.Column>
      <Grid.Column>
        <Control.select
          component={Dropdown}
          model=".role"
          fluid
          search
          selection
          options={roleOptions}
          mapProps={{
            value: props => props.modelValue,
            onChange: props => handleDropdownChange(props)
          }}
        />
      </Grid.Column>
    </Grid.Row>
    <Grid.Row>
      <Grid.Column width={2}>
        <Form.Field>
          <label>Kills</label>
          <Control.text
            component={Input}
            size="mini"
            model=".kills"
            updateOn="blur"
          />
        </Form.Field>
      </Grid.Column>
      <Grid.Column width={2}>
        <Form.Field>
          <label>Deaths</label>
          <Control.text
            component={Input}
            size="mini"
            model=".deaths"
            updateOn="blur"
          />
        </Form.Field>
      </Grid.Column>
      <Grid.Column width={2}>
        <Form.Field>
          <label>Assists</label>
          <Control.text
            component={Input}
            size="mini"
            model=".assists"
            updateOn="blur"
          />
        </Form.Field>
      </Grid.Column>
    </Grid.Row>
  </Grid>
);
