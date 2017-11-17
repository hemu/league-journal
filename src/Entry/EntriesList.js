import React from "react";
import { inject, observer } from "mobx-react";
import { List, Button } from "semantic-ui-react";

const EntryListItem = ({ entry }) =>
  entry.id !== "TEMP_LOCAL_ID" ? (
    <List.Item data-id={entry.id}>
      {entry.champion} vs {entry.opponentChampion}
    </List.Item>
  ) : (
    <List.Item data-id={entry.id}>New Entry (Unsaved)</List.Item>
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
        <Button type="submit" onClick={entries.createEntry}>
          New Entry
        </Button>
        <List
          selection
          onClick={(event, data) => {
            entryDetailStore.setEntry(event.target.dataset.id);
          }}
        >
          {entries.entries.map((entry, i) => (
            <EntryListItem key={entry.id + i} entry={entry} />
          ))}
        </List>
      </div>
    );
  }
}

export default inject("entries")(observer(EntriesList));
