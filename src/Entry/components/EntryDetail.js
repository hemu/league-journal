import React from "react";
import styled from "styled-components";
import { Control, Field, Form as ReactForm } from "react-redux-form";
import {
  Button,
  Checkbox,
  Form,
  Input,
  Divider,
  Grid
} from "semantic-ui-react";
import DayPickerInput from "react-day-picker/DayPickerInput";
import EntryDetailBaseStats from "./EntryDetailBaseStats";
import ChampionMatchup from "./Matchup";
import YoutubePlayer from "react-youtube";

import { baseFormModel } from "../helpers";

import "react-day-picker/lib/style.css";

const FormSectionCont = styled.div`
  padding-top: 15px;
`;

const multiElemSections = [
  {
    model: "mistakes",
    title: "Mistakes",
    placeholder: "My mistake was..."
  },
  {
    model: "deathReasons",
    title: "Reasons for Deaths",
    placeholder: "I died because..."
  },
  {
    model: "csReasons",
    title: "Why didn't I hit CS goals?",
    placeholder: "I missed CS because..."
  },
  {
    model: "roams",
    title: "Roams",
    placeholder: "First roam was good/bad because..."
  },
  {
    model: "positives",
    title: "Positives",
    placeholder: "I did this well..."
  },
  {
    model: "lessons",
    title: "Lessons",
    placeholder: "My lesson was..."
  }
];

const EntrySection = ({ title, children }) => (
  <FormSectionCont>
    <Divider horizontal>{title}</Divider>
    {children}
  </FormSectionCont>
);

export default props => {
  const { removeEntry, saveEntry, formChange, formAdd } = props;
  return (
    <ReactForm model={baseFormModel} onSubmit={saveEntry}>
      <Button type="submit">Save</Button>

      <EntrySection title={"Game Stats"}>
        <EntryDetailBaseStats formChange={formChange} />
      </EntrySection>
      <EntrySection title={"Matchup"}>
        <ChampionMatchup
          model1=".champion"
          model2=".opponentChampion"
          formChange={formChange}
        />
      </EntrySection>

      <EntrySection title={"Jungle Matchup"}>
        <ChampionMatchup
          model1=".jungler"
          model2=".opponentJungler"
          formChange={formChange}
        />
      </EntrySection>

      <EntrySection title={"Creep Score"}>
        <Grid>
          <Grid.Column width={2}>
            <Form.Field>
              <label>CS / Min</label>
              <Control.text
                component={Input}
                size="mini"
                model=".csPerMin"
                updateOn="blur"
              />
            </Form.Field>
          </Grid.Column>
          <Grid.Column width={2}>
            <Form.Field>
              <label>CS @ 5</label>
              <Control.text
                component={Input}
                size="mini"
                model=".csAt5Min"
                updateOn="blur"
              />
            </Form.Field>
          </Grid.Column>
          <Grid.Column width={2}>
            <Form.Field>
              <label>CS @ 10</label>
              <Control.text
                component={Input}
                size="mini"
                model=".csAt10Min"
                updateOn="blur"
              />
            </Form.Field>
          </Grid.Column>
          <Grid.Column width={2}>
            <Form.Field>
              <label>CS @ 15</label>

              <Control.text
                component={Input}
                size="mini"
                model=".csAt15Min"
                updateOn="blur"
              />
            </Form.Field>
          </Grid.Column>
          <Grid.Column width={2}>
            <Form.Field>
              <label>CS @ 20</label>
              <Control.text
                component={Input}
                size="mini"
                model=".csAt20Min"
                updateOn="blur"
              />
            </Form.Field>
          </Grid.Column>
        </Grid>
      </EntrySection>

      {multiElemSections.map(section => (
        <EntrySection title={section.title} key={section.title}>
          <Button
            type="button"
            size="mini"
            onClick={() => formAdd(`.${section.model}`)}
          >
            Add New
          </Button>
          {props[section.model].map((elem, elemIndex) => (
            <Form.Field key={elemIndex}>
              <Control.text
                component={Input}
                size="mini"
                model={`.${section.model}[${elemIndex}]`}
                placeholder={section.placeholder}
                updateOn="blur"
              />
            </Form.Field>
          ))}
        </EntrySection>
      ))}
    </ReactForm>
  );
};
// export default (EntryDetail = ({ entry, removeEntry, saveEntry }) => (
//   <Form>
//     <Button type="submit" onClick={saveEntry}>
//       Save
//     </Button>
//     <Button type="submit" onClick={() => removeEntry(entry.id)}>
//       Delete
//     </Button>
//     <EntrySection title={"Game Stats"}>
//       <EntryDetailBaseStats />
//     </EntrySection>
//
//     <EntrySection title={"Matchup"}>
//       <ChampionMatchup />
//     </EntrySection>
//     <EntrySection title={"Jungle Matchup"}>
//       <JunglerMatchup />
//     </EntrySection>
//
//     <EntrySection title={"Creep Score"}>
//       <Grid>
//         <Grid.Column width={2}>
//           <Form.Field>
//             <label>CS / Min</label>
//             <Input
//               size="mini"
//               value={entry.csPerMin}
//               onChange={(event, data) => {
//                 entry.changeCsPerMin(data.value);
//               }}
//             />
//           </Form.Field>
//         </Grid.Column>
//         <Grid.Column width={2}>
//           <Form.Field>
//             <label>CS @ 5</label>
//             <Input
//               size="mini"
//               value={entry.csAt5Min}
//               onChange={(event, data) => {
//                 entry.changeCsAt5Min(data.value);
//               }}
//             />
//           </Form.Field>
//         </Grid.Column>
//         <Grid.Column width={2}>
//           <Form.Field>
//             <label>CS @ 10</label>
//             <Input
//               size="mini"
//               value={entry.csAt10Min}
//               onChange={(event, data) => {
//                 entry.changeCsAt10Min(data.value);
//               }}
//             />
//           </Form.Field>
//         </Grid.Column>
//         <Grid.Column width={2}>
//           <Form.Field>
//             <label>CS @ 15</label>
//             <Input
//               size="mini"
//               value={entry.csAt15Min}
//               onChange={(event, data) => {
//                 entry.changeCsAt15Min(data.value);
//               }}
//             />
//           </Form.Field>
//         </Grid.Column>
//         <Grid.Column width={2}>
//           <Form.Field>
//             <label>CS @ 20</label>
//             <Input
//               size="mini"
//               value={entry.csAt20Min}
//               onChange={(event, data) => {
//                 entry.changeCsAt20Min(data.value);
//               }}
//             />
//           </Form.Field>
//         </Grid.Column>
//       </Grid>
//     </EntrySection>
//
//     {multiElemSections.map(section => (
//       <EntrySection title={section.title} key={section.title}>
//         <Button size="mini" onClick={section.addCallback}>
//           Add New
//         </Button>
//         {entry[section.key].map((elem, elemIndex) => (
//           <Form.Field key={elemIndex}>
//             <Input
//               size="mini"
//               placeholder={section.placeholder}
//               value={elem}
//               onChange={event => {
//                 section.changeCallback(elemIndex, event.target.value);
//               }}
//             />
//           </Form.Field>
//         ))}
//       </EntrySection>
//     ))}
//
//     {/* <EntrySection title={"Video"}>
//       <Input
//         size="mini"
//         value={entry.video}
//         onChange={(event, data) => {
//           entry.changeVideo(data.value);
//         }}
//       />
//       {entry.video &&
//         entry.video && (
//           <YoutubePlayer videoId={entry.video.split("/").pop()} />
//         )}
//     </EntrySection> */}
//   </Form>
// ));
