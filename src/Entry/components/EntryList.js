import React from "react";
import { List, Button, Header } from "semantic-ui-react";
import { isLocalEntry } from "../helpers";
import EntryListItem from "./EntryListItem";

export default ({ entries, onSelectEntry }) => (
  <div>
    <Header>Entries</Header>
    <Button type="submit" onClick={console.log("clicked submit")} size="tiny">
      New Entry
    </Button>
    <List
      selection
      onClick={(event, _) => {
        onSelectEntry(parseInt(event.target.dataset.entryIndex, 10));
      }}
    >
      {entries.map((entry, i) => (
        <EntryListItem
          key={entry.id + i}
          entry={entry}
          entryIndex={i}
          // active={entryDetailStore.id === entry.id}
          isLocalEntry={isLocalEntry(entry.id)}
        />
      ))}
    </List>
  </div>
);
