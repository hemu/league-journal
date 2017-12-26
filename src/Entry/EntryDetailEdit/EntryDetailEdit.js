import React from 'react';
import styled from 'styled-components';
import { Control, Form as ReactForm, actions } from 'react-redux-form';
import { Button, Form, Input, Divider, Grid } from 'semantic-ui-react';
// import DayPickerInput from 'react-day-picker/DayPickerInput';
// import YoutubePlayer from 'react-youtube';
import 'react-day-picker/lib/style.css';
import PropTypes from 'prop-types';
import EntryDetailBaseStats from './EntryDetailBaseStats';
import ChampionMatchup from './Matchup';

import { baseFormModel, toNumParser, toFloatParser } from '../helpers';

const FormSectionCont = styled.div`
  padding-top: 15px;
`;

const multiElemSections = [
  {
    model: 'deathReasons',
    title: 'Reasons for Deaths',
    placeholder: 'I died because...',
  },
  {
    model: 'csReasons',
    title: "Why didn't I hit CS goals?",
    placeholder: 'I missed CS because...',
  },
  {
    model: 'roams',
    title: 'Roams',
    placeholder: 'First roam was good/bad because...',
  },
  {
    model: 'positives',
    title: 'Positives',
    placeholder: 'I did this well...',
  },
];

const EntrySection = ({ title, children }) => (
  <FormSectionCont>
    <Divider horizontal>{title}</Divider>
    {children}
  </FormSectionCont>
);

const EntryDetailEdit = (props) => {
  const {
    id: entryId,
    removeEntry,
    saveEntry,
    formChange,
    formAdd,
    formAddString,
    formRemove,
    updateMistake,
    updateLesson,
    removeMistake,
    removeLesson,
  } = props;

  function changeMistake(model, id, value) {
    return (dispatch) => {
      dispatch(actions.change(model, value));
      dispatch(updateMistake(id, value));
    };
  }

  function changeLesson(model, id, value) {
    return (dispatch) => {
      dispatch(actions.change(model, value));
      dispatch(updateLesson(id, value));
    };
  }

  return (
    <ReactForm model={baseFormModel} onSubmit={saveEntry}>
      <Button type="submit">Save</Button>
      <Button
        type="button"
        onClick={() => removeEntry(entryId, props.mistakes, props.lessons)}
      >
        Delete
      </Button>

      <EntrySection title="Game Stats">
        <EntryDetailBaseStats formChange={formChange} />
      </EntrySection>
      <EntrySection title="Matchup">
        <ChampionMatchup
          model1=".champion"
          model2=".opponentChampion"
          formChange={formChange}
        />
      </EntrySection>

      <EntrySection title="Jungle Matchup">
        <ChampionMatchup
          model1=".jungler"
          model2=".opponentJungler"
          formChange={formChange}
        />
      </EntrySection>

      <EntrySection title="Creep Score">
        <Grid>
          <Grid.Column width={2}>
            <Form.Field>
              <label>CS / Min</label>
              <Control.text
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
              <label>CS @ 5</label>
              <Control.text
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
              <label>CS @ 10</label>
              <Control.text
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
              <label>CS @ 15</label>

              <Control.text
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
              <label>CS @ 20</label>
              <Control.text
                component={Input}
                type="number"
                parser={toNumParser}
                size="mini"
                model=".csAt20Min"
                updateOn="blur"
              />
            </Form.Field>
          </Grid.Column>
        </Grid>
      </EntrySection>

      <EntrySection title="Mistakes" key="Mistakes">
        <Button type="button" size="mini" onClick={() => formAdd('.mistakes')}>
          Add New
        </Button>
        {props.mistakes.map((elem, elemIndex) => (
          <Form.Field key={elemIndex}>
            <Button
              type="button"
              size="mini"
              onClick={() => removeMistake(elem.id, elemIndex)}
            >
              X
            </Button>
            <Control.text
              component={Input}
              size="mini"
              model={`.mistakes[${elemIndex}].text`}
              placeholder="My mistake was..."
              changeAction={(model, value) =>
                changeMistake(model, elem.id, value)}
              updateOn="blur"
            />
          </Form.Field>
        ))}
      </EntrySection>

      <EntrySection title="Lessons" key="Lessons">
        <Button type="button" size="mini" onClick={() => formAdd('.lessons')}>
          Add New
        </Button>
        {props.lessons.map((elem, elemIndex) => (
          <Form.Field key={elemIndex}>
            <Button
              type="button"
              size="mini"
              onClick={() => removeLesson(elem.id, elemIndex)}
            >
              X
            </Button>
            <Control.text
              component={Input}
              size="mini"
              model={`.lessons[${elemIndex}].text`}
              placeholder="My lesson was..."
              changeAction={(model, value) =>
                changeLesson(model, elem.id, value)}
              updateOn="blur"
            />
          </Form.Field>
        ))}
      </EntrySection>

      {multiElemSections.map(section => (
        <EntrySection title={section.title} key={section.title}>
          <Button
            type="button"
            size="mini"
            onClick={() => formAddString(`.${section.model}`)}
          >
            Add New
          </Button>
          {props[section.model].map((elem, elemIndex) => (
            <Form.Field key={elemIndex}>
              <Button
                type="button"
                size="mini"
                onClick={() => formRemove(`.${section.model}`, elemIndex)}
              >
                X
              </Button>
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

EntryDetailEdit.propTypes = {
  id: PropTypes.string.isRequired,
  removeEntry: PropTypes.func.isRequired,
  saveEntry: PropTypes.func.isRequired,
  formChange: PropTypes.func.isRequired,
  formAdd: PropTypes.func.isRequired,
  formRemove: PropTypes.func.isRequired,
  updateLesson: PropTypes.func.isRequired,
  updateMistake: PropTypes.func.isRequired,
  removeMistake: PropTypes.func.isRequired,
  removeLesson: PropTypes.func.isRequired,
};

export default EntryDetailEdit;
