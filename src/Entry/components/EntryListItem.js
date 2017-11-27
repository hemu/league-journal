import React from "react";
import { List, Button, Header } from "semantic-ui-react";

const EntryListItem = ({ entry, isLocalEntry, active, entryIndex }) =>
  isLocalEntry ? (
    <List.Item data-id={entry.id} active={active} data-entry-index={entryIndex}>
      New Entry (Unsaved)
    </List.Item>
  ) : (
    <List.Item data-id={entry.id} active={active} data-entry-index={entryIndex}>
      {entry.champion || "Unknown"} vs {entry.opponentChampion || "Unknown"}
    </List.Item>
  );

export default EntryListItem;
