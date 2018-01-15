import React from 'react';
import styled from 'styled-components';
import { Form as ReactForm, actions } from 'react-redux-form';
import { Button, Form, Input, Icon } from 'semantic-ui-react';
// import DayPickerInput from 'react-day-picker/DayPickerInput';
// import YoutubePlayer from 'react-youtube';
import 'react-day-picker/lib/style.css';
import PropTypes from 'prop-types';
import EntryDetailBaseStats from './EntryDetailBaseStats';
import ChampionMatchup from './Matchup';
import { FormInput, FieldLabel } from './FormElements';
import EditableText from './EditableText';

import { baseFormModel, toNumParser, toFloatParser } from '../helpers';

const multiElemSections = [
  {
    model: 'csReasons',
    title: "Why didn't I hit CS goals?",
    addLabel: 'A REASON FOR LOW CS',
    placeholder: 'I missed CS because...',
  },
  {
    model: 'deathReasons',
    title: 'Reasons for Deaths',
    addLabel: 'A REASON I DIED',
    placeholder: 'My death reason is...',
  },
  {
    model: 'positives',
    title: 'Positives',
    addLabel: 'SOMETHING I DID WELL',
    placeholder: 'I did this well...',
  },
];

const FormSectionCont = styled.div`
  padding-top: 15px;
  padding-bottom: 20px;
  border-bottom: 1px solid #eaeaea;
`;

const SectionTitle = styled.div`
  font-size: 15px;
  font-weight: bold;
  padding: 10px 0 25px 0;
`;

const FormContainer = styled.div`
  padding: 20px;
`;

const AddBtn = styled(Button)`
  &&& {
    color: #aaa;
    background-color: #fff;
    border: 3px dashed #f0f0f0;
    margin-top: 5px;
  }
`;

const DelBtn = styled(Button)`
  &&& {
    background-color: #fff;
    color: #aaa;
    font-size: 1.1em;
  }
`;

const ListGrid = styled.div`
  display: grid;
  ${''};
`;

const ListGridRow = styled.div`
  display: grid;
  grid-template-columns: 80% auto;
  align-items: center;
`;

const EntrySection = ({ title, children }) => (
  <FormSectionCont>
    <SectionTitle>{title}</SectionTitle>
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
    formRemove,
    updateMistake,
    updateLesson,
    removeMistake,
    removeMistakeLocal,
    removeLesson,
    removeLessonLocal,
    setEditMode,
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
    <FormContainer>
      <ReactForm model={baseFormModel} onSubmit={saveEntry}>
        <Button type="submit">Save</Button>
        <Button type="button" onClick={() => setEditMode(false)}>
          Done
        </Button>
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

        {/* <EntrySection title="Creep Score">
          <Grid stackable>
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
          </Grid>
        </EntrySection> */}

        <EntrySection title="Mistakes" key="Mistakes">
          <ListGrid>
            {props.mistakes.map((elem, elemIndex) => (
              <ListGridRow key={elemIndex}>
                <Form.Field>
                  <EditableText
                    model={`.mistakes[${elemIndex}].text`}
                    changeAction={(model, value) =>
                      changeMistake(model, elem.id, value)}
                    emptyPlaceholder="My mistake was..."
                    isLatest={elem.isLatest}
                  />
                </Form.Field>
                <DelBtn
                  type="button"
                  onClick={() => {
                    removeMistake(elem.id, elemIndex, props.id);
                    removeMistakeLocal(elem.id, elemIndex);
                  }}
                >
                  <Icon name="minus circle" />
                </DelBtn>
              </ListGridRow>
            ))}
          </ListGrid>
          <AddBtn type="button" onClick={() => formAdd('.mistakes')} fluid>
            <Icon name="add" />ADD MISTAKE
          </AddBtn>
        </EntrySection>

        <EntrySection title="Lessons" key="Lessons">
          <ListGrid>
            {props.lessons.map((elem, elemIndex) => (
              <ListGridRow key={elemIndex}>
                <Form.Field>
                  <EditableText
                    model={`.lessons[${elemIndex}].text`}
                    changeAction={(model, value) =>
                      changeLesson(model, elem.id, value)}
                    emptyPlaceholder="I learned this lesson..."
                    isLatest={elem.isLatest}
                  />
                </Form.Field>
                <DelBtn
                  type="button"
                  onClick={() => {
                    removeLesson(elem.id, elemIndex, props.id);
                    removeLessonLocal(elem.id, elemIndex);
                  }}
                >
                  <Icon name="minus circle" />
                </DelBtn>
              </ListGridRow>
            ))}
          </ListGrid>
          <AddBtn type="button" onClick={() => formAdd('.lessons')} fluid>
            <Icon name="add" />ADD LESSON
          </AddBtn>
        </EntrySection>

        {multiElemSections.map(section => (
          <EntrySection title={section.title} key={section.title}>
            <ListGrid>
              {props[section.model].map((elem, elemIndex) => (
                <ListGridRow key={elemIndex}>
                  <Form.Field>
                    <EditableText
                      model={`.${section.model}[${elemIndex}].text`}
                      emptyPlaceholder={section.placeholder}
                      isLatest={elem.isLatest}
                    />
                  </Form.Field>
                  <DelBtn
                    type="button"
                    onClick={() => formRemove(`.${section.model}`, elemIndex)}
                  >
                    <Icon name="minus circle" />
                  </DelBtn>
                </ListGridRow>
              ))}
            </ListGrid>
            <AddBtn
              type="button"
              onClick={() => formAdd(`.${section.model}`)}
              fluid
            >
              <Icon name="add" />ADD {section.addLabel}
            </AddBtn>
          </EntrySection>
        ))}
      </ReactForm>
    </FormContainer>
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
