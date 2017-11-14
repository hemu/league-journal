import Entries from "./entry";
import makeInspectable from "mobx-devtools-mst";

const entries = Entries.create();
entries.fetchEntries();

makeInspectable(entries);

export default { entries };
