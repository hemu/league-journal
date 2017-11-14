import React from "react";
import EditEntryDetail from "./EditEntryDetail";

class EntryDetail extends React.Component {
  render() {
    // if (this.props.entry) {
    //   return <div>{this.props.entry.id}</div>;
    // }
    // return <div>No Entry Details Found</div>;
    return <EditEntryDetail />;
  }
}

export default EntryDetail;
