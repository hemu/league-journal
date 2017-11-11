import React from "react";

class EntryDetail extends React.Component {
  render() {
    if (this.props.entry) {
      return <div>{this.props.entry.id}</div>;
    }
    return <div>No Entry Details Found</div>;
  }
}

export default EntryDetail;
