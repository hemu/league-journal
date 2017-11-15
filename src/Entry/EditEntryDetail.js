import React from "react";
import { Button, Checkbox, Form, Input, Divider } from "semantic-ui-react";
import styled from "styled-components";
import { inject, observer } from "mobx-react";

const FormSectionTitle = styled.div`
  font-size: 13px;
  font-weight: bold;
`;

const EntrySection = ({ title, children }) => (
  <div>
    <Divider />
    <FormSectionTitle>{title}</FormSectionTitle>
    {children}
  </div>
);

class EntryDetail extends React.Component {
  render() {
    const { entryDetail: entry } = this.props;

    if (entry.detailEntryId == "" && !entry.fetching) {
      return <div>Choose an Entry</div>;
    }

    if (entry.detailEntryId == "" && entry.fetching) {
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
        key: "lessons",
        title: "Lessons",
        addCallback: entry.addLesson,
        changeCallback: entry.changeLesson,
        placeholder: "My lesson was..."
      },
      {
        key: "positives",
        title: "Positives",
        addCallback: entry.addPositive,
        changeCallback: entry.changePositive,
        placeholder: "I did this well..."
      },
      {
        key: "deathReasons",
        title: "Reasons for Deaths",
        addCallback: entry.addDeathReason,
        changeCallback: entry.changeDeathReason,
        placeholder: "I died because..."
      },
      {
        key: "roams",
        title: "Roams",
        addCallback: entry.addRoam,
        changeCallback: entry.changeRoam,
        placeholder: "First roam was good/bad because..."
      },
      {
        key: "csReasons",
        title: "Why didn't I hit CS goals?",
        addCallback: entry.addCsReason,
        changeCallback: entry.changeCsReason,
        placeholder: "I missed CS because..."
      }
    ];

    return (
      <div>
        <Form>
          <Button type="submit" onClick={entry.saveEntry}>
            Save
          </Button>
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
        </Form>
      </div>
    );
  }
}

export default inject("entryDetail")(observer(EntryDetail));
