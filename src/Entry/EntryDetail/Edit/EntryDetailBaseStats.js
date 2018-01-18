import React from 'react';
import PropTypes from 'prop-types';
import { Control, actions } from 'react-redux-form';
import { Form, Input, Dropdown, Grid } from 'semantic-ui-react';
import styled from 'styled-components';
import moment from 'moment';

import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

import { FormInput, FieldLabel } from './FormElements';
import {
  formModel,
  handleDropdownChange,
  toNumParser,
  toFloatParser,
} from '../../helpers';
import { rankOptions, outcomeOptions, roleOptions } from '../../../staticData';

const DatePickerCont = styled.div`
  .DayPickerInput-OverlayWrapper {
    z-index: 1;
  }
  font-size: 1em;
`;

const EntryDetailBaseStats = ({ formChange }) => (
  <Grid columns={5} stackable>
    <Grid.Row>
      <Grid.Column width={3}>
        <DatePickerCont>
          <FieldLabel>Date</FieldLabel>
          <div className="ui input fluid">
            <FormInput
              component={DayPickerInput}
              model=".gameDate"
              format="MMM Do"
              mapProps={{
                value: (props) =>
                  // eslint-disable-next-line react/prop-types
                  moment(new Date(props.modelValue)).format('MMM Do'),
              }}
              onDayChange={(day) =>
                formChange(actions.change(formModel('.gameDate'), day.toDate()))
              }
            />
          </div>
        </DatePickerCont>
      </Grid.Column>
      <Grid.Column width={3}>
        <FieldLabel>Rank</FieldLabel>
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
            // eslint-disable-next-line react/prop-types
            value: (props) => props.modelValue,
            onChange: (props) => handleDropdownChange(props),
          }}
        />
      </Grid.Column>
      <Grid.Column width={3}>
        <FieldLabel>W/L</FieldLabel>
        <Control.select
          component={Dropdown}
          model=".outcome"
          fluid
          search
          selection
          options={outcomeOptions}
          mapProps={{
            // eslint-disable-next-line react/prop-types
            value: (props) => props.modelValue,
            onChange: (props) => handleDropdownChange(props),
          }}
        />
      </Grid.Column>
      <Grid.Column width={3}>
        <FieldLabel>Role</FieldLabel>
        <Control.select
          component={Dropdown}
          model=".role"
          fluid
          search
          selection
          options={roleOptions}
          mapProps={{
            // eslint-disable-next-line react/prop-types
            value: (props) => props.modelValue,
            onChange: (props) => handleDropdownChange(props),
          }}
        />
      </Grid.Column>
    </Grid.Row>
    <Grid.Row>
      <Grid.Column width={2}>
        <Form.Field>
          <FieldLabel>Kills</FieldLabel>
          <FormInput
            component={Input}
            type="number"
            parser={toNumParser}
            size="mini"
            model=".kills"
            updateOn="blur"
          />
        </Form.Field>
      </Grid.Column>
      <Grid.Column width={2}>
        <Form.Field>
          <FieldLabel>Deaths</FieldLabel>
          <FormInput
            component={Input}
            type="number"
            parser={toNumParser}
            size="mini"
            model=".deaths"
            updateOn="blur"
          />
        </Form.Field>
      </Grid.Column>
      <Grid.Column width={2}>
        <Form.Field>
          <FieldLabel>Assists</FieldLabel>
          <FormInput
            component={Input}
            type="number"
            parser={toNumParser}
            size="mini"
            model=".assists"
            updateOn="blur"
          />
        </Form.Field>
      </Grid.Column>
    </Grid.Row>
    <Grid.Row>
      <Grid.Column width={2}>
        <Form.Field>
          <FieldLabel>CS / Min</FieldLabel>
          <FormInput
            component={Input}
            type="number"
            parser={toFloatParser}
            size="mini"
            model=".csPerMin"
            updateOn="blur"
          />
        </Form.Field>
      </Grid.Column>
      <Grid.Column width={2}>
        <Form.Field>
          <FieldLabel>CS @ 5</FieldLabel>
          <FormInput
            component={Input}
            type="number"
            parser={toNumParser}
            size="mini"
            model=".csAt5Min"
            updateOn="blur"
          />
        </Form.Field>
      </Grid.Column>
      <Grid.Column width={2}>
        <Form.Field>
          <FieldLabel>CS @ 10</FieldLabel>
          <FormInput
            component={Input}
            type="number"
            parser={toNumParser}
            size="mini"
            model=".csAt10Min"
            updateOn="blur"
          />
        </Form.Field>
      </Grid.Column>
      <Grid.Column width={2}>
        <Form.Field>
          <FieldLabel>CS @ 15</FieldLabel>

          <FormInput
            component={Input}
            type="number"
            parser={toNumParser}
            size="mini"
            model=".csAt15Min"
            updateOn="blur"
          />
        </Form.Field>
      </Grid.Column>
      <Grid.Column width={2}>
        <Form.Field>
          <FieldLabel>CS @ 20</FieldLabel>
          <FormInput
            component={Input}
            type="number"
            parser={toNumParser}
            size="mini"
            model=".csAt20Min"
            updateOn="blur"
          />
        </Form.Field>
      </Grid.Column>
    </Grid.Row>
  </Grid>
);

EntryDetailBaseStats.propTypes = {
  formChange: PropTypes.func.isRequired,
};
export default EntryDetailBaseStats;
