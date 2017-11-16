import React from "react";
import { inject, observer } from "mobx-react";
import {
  Button,
  Checkbox,
  Form,
  Input,
  Divider,
  Grid
} from "semantic-ui-react";
import styled from "styled-components";
import DayPickerInput from "react-day-picker/DayPickerInput";
import EntryDetailBaseStats from "./EntryDetailBaseStats";
import { ChampionMatchup, JunglerMatchup } from "./Matchup";
import YoutubePlayer from "react-youtube";

import "react-day-picker/lib/style.css";

const FormSectionCont = styled.div`
  padding-top: 15px;
`;

const EntrySection = ({ title, children }) => (
  <FormSectionCont>
    <Divider horizontal>{title}</Divider>
    {children}
  </FormSectionCont>
);

class EntryDetail extends React.Component {
  render() {
    const { entries } = this.props;
    const entry = entries.entryDetailStore;

    if (!entry.fetching && !entry.loaded) {
      return <div>Choose an Entry</div>;
    }

    if (entry.fetching) {
      return <div>Fetching entry details...</div>;
    }

    const multiElemSections = [
      {
        key: "mistakes",
        title: "Mistakes",
        addCallback: entry.addMistake,
        changeCallback: entry.changeMistake,
        placeholder: "My mistake was..."
      },
      {
        key: "deathReasons",
        title: "Reasons for Deaths",
        addCallback: entry.addDeathReason,
        changeCallback: entry.changeDeathReason,
        placeholder: "I died because..."
      },
      {
        key: "csReasons",
        title: "Why didn't I hit CS goals?",
        addCallback: entry.addCsReason,
        changeCallback: entry.changeCsReason,
        placeholder: "I missed CS because..."
      },
      {
        key: "roams",
        title: "Roams",
        addCallback: entry.addRoam,
        changeCallback: entry.changeRoam,
        placeholder: "First roam was good/bad because..."
      },
      {
        key: "positives",
        title: "Positives",
        addCallback: entry.addPositive,
        changeCallback: entry.changePositive,
        placeholder: "I did this well..."
      },
      {
        key: "lessons",
        title: "Lessons",
        addCallback: entry.addLesson,
        changeCallback: entry.changeLesson,
        placeholder: "My lesson was..."
      }
    ];

    return (
      <div>
        <Form>
          <Button type="submit" onClick={entry.saveEntry}>
            Save
          </Button>
          <EntrySection title={"Game Stats"}>
            <EntryDetailBaseStats />
          </EntrySection>

          <EntrySection title={"Matchup"}>
            <ChampionMatchup />
          </EntrySection>
          <EntrySection title={"Jungle Matchup"}>
            <JunglerMatchup />
          </EntrySection>

          <EntrySection title={"Creep Score"}>
            <Grid>
              <Grid.Column width={2}>
                <Form.Field>
                  <label>CS / Min</label>
                  <Input
                    size="mini"
                    value={entry.csPerMin}
                    onChange={(event, data) => {
                      entry.changeCsPerMin(data.value);
                    }}
                  />
                </Form.Field>
              </Grid.Column>
              <Grid.Column width={2}>
                <Form.Field>
                  <label>CS @ 5</label>
                  <Input
                    size="mini"
                    value={entry.csAt5Min}
                    onChange={(event, data) => {
                      entry.changeCsAt5Min(data.value);
                    }}
                  />
                </Form.Field>
              </Grid.Column>
              <Grid.Column width={2}>
                <Form.Field>
                  <label>CS @ 10</label>
                  <Input
                    size="mini"
                    value={entry.csAt10Min}
                    onChange={(event, data) => {
                      entry.changeCsAt10Min(data.value);
                    }}
                  />
                </Form.Field>
              </Grid.Column>
              <Grid.Column width={2}>
                <Form.Field>
                  <label>CS @ 15</label>
                  <Input
                    size="mini"
                    value={entry.csAt15Min}
                    onChange={(event, data) => {
                      entry.changeCsAt15Min(data.value);
                    }}
                  />
                </Form.Field>
              </Grid.Column>
              <Grid.Column width={2}>
                <Form.Field>
                  <label>CS @ 20</label>
                  <Input
                    size="mini"
                    value={entry.csAt20Min}
                    onChange={(event, data) => {
                      entry.changeCsAt20Min(data.value);
                    }}
                  />
                </Form.Field>
              </Grid.Column>
            </Grid>
          </EntrySection>

          {multiElemSections.map(section => (
            <EntrySection title={section.title} key={section.title}>
              <Button size="mini" onClick={section.addCallback}>
                Add New
              </Button>
              {entry[section.key].map((elem, elemIndex) => (
                <Form.Field key={elemIndex}>
                  <Input
                    size="mini"
                    placeholder={section.placeholder}
                    value={elem}
                    onChange={event => {
                      section.changeCallback(elemIndex, event.target.value);
                    }}
                  />
                </Form.Field>
              ))}
            </EntrySection>
          ))}

          <EntrySection title={"Video"}>
            <Input
              size="mini"
              value={entry.video}
              onChange={(event, data) => {
                entry.changeVideo(data.value);
              }}
            />
            {entry.video &&
              entry.video && (
                <YoutubePlayer videoId={entry.video.split("/").pop()} />
              )}
          </EntrySection>
        </Form>
      </div>
    );
  }
}

export default inject("entries")(observer(EntryDetail));
