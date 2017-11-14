import React from "react";
import { inject, observer } from "mobx-react";
import { List } from "semantic-ui-react";

const EntryListItem = ({ entry }) => (
  <List.Item data-id={entry.id}>
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

    const { entries, entryDetail } = this.props;
    return (
      <List
        selection
        onClick={(event, data) => {
          entryDetail.setEntry(event.target.dataset.id);
        }}
      >
        {entries.entries.map(entry => (
          <EntryListItem key={entry.id} entry={entry} />
        ))}
      </List>
    );
  }
}

export default inject("entries", "entryDetail")(observer(EntriesList));
