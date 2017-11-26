import React from "react";
import { inject, observer } from "mobx-react";
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

import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";

import { rankOptions, outcomeOptions, roleOptions } from "../staticData";
import { intValidationWrapper } from "./entryHelpers";

const DatePickerCont = styled.div`
  .DayPickerInput-OverlayWrapper {
    z-index: 1;
  }
`;

class EntryDetailBaseStats extends React.Component {
  render() {
    const { entries } = this.props;
    const entry = entries.entryDetailStore;

    return (
      <Grid columns={5}>
        <Grid.Row>
          <Grid.Column width={3}>
            <DatePickerCont>
              <DayPickerInput
                value={entry.formattedGameDate}
                format={"MMM Do"}
                onDayChange={day => {
                  entry.changeGameDate(day.toDate());
                }}
              />
            </DatePickerCont>
          </Grid.Column>
          <Grid.Column width={4}>
            <Dropdown
              placeholder="Rank"
              fluid
              search
              selection
              options={rankOptions}
              value={entry.rank}
              onChange={(event, data) => {
                entry.changeRank(data.value);
              }}
            />
          </Grid.Column>
          <Grid.Column width={2}>
            <Dropdown
              placeholder="Win/Loss"
              fluid
              selection
              options={outcomeOptions}
              value={entry.outcome}
              onChange={(event, data) => {
                entry.changeOutcome(data.value);
              }}
            />
          </Grid.Column>
          <Grid.Column>
            <Dropdown
              placeholder="Role"
              fluid
              selection
              options={roleOptions}
              value={entry.role}
              onChange={(event, data) => {
                entry.changeRole(data.value);
              }}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={2}>
            <Form.Field>
              <label>Kills</label>
              <Input
                size="small"
                value={entry.kills}
                onChange={(event, data) => {
                  entry.changeKills(data.value);
                }}
              />
            </Form.Field>
          </Grid.Column>
          <Grid.Column width={2}>
            <Form.Field>
              <label>Deaths</label>
              <Input
                size="small"
                value={entry.deaths}
                onChange={(event, data) => {
                  entry.changeDeaths(data.value);
                }}
              />
            </Form.Field>
          </Grid.Column>
          <Grid.Column width={2}>
            <Form.Field>
              <label>Assists</label>
              <Input
                size="small"
                value={entry.assists}
                onChange={(event, data) => {
                  entry.changeAssists(data.value);
                }}
              />
            </Form.Field>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default inject("entries")(observer(EntryDetailBaseStats));
