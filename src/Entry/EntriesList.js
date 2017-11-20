import React from "react";
import { inject, observer } from "mobx-react";
import { List, Button, Header } from "semantic-ui-react";
import { isLocalEntry } from "../store/entries";

const EntryListItem = ({ entry, active }) =>
  isLocalEntry(entry.id) ? (
    <List.Item data-id={entry.id} active={active}>
      New Entry (Unsaved)
    </List.Item>
  ) : (
    <List.Item data-id={entry.id} active={active}>
      {entry.champion} vs {entry.opponentChampion}
    </List.Item>
  );

class EntriesList extends React.Component {
  render() {
    if (!this.props.entries) {
      return <div>No entires prop found</div>;
    }

    if (this.props.entries.fetching) {
      return <div>Loading</div>;
    }

    const { entries } = this.props;
    const entryDetailStore = entries.entryDetailStore;

    return (
      <div>
        <Header>Entries</Header>
        <Button type="submit" onClick={entries.createEntry} size="tiny">
          New Entry
        </Button>
        <List
          selection
          onClick={(event, data) => {
            entryDetailStore.setEntry(event.target.dataset.id);
          }}
        >
          {entries.entries.map((entry, i) => (
            <EntryListItem
              key={entry.id + i}
              entry={entry}
              active={entryDetailStore.id === entry.id}
            />
          ))}
        </List>
      </div>
    );
  }
}

export default inject("entries")(observer(EntriesList));
