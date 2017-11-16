import Entries from "./entries";
// import EntryDetail from "./entryDetail";
import makeInspectable from "mobx-devtools-mst";

const entries = Entries.create();
entries.fetchEntries();
makeInspectable(entries);

// const entryDetail = EntryDetail.create();
// makeInspectable(entryDetail);
//
export default { entries };
