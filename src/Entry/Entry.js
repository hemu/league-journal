import React from "react";
import { EntryDetail } from ".";
import { inject, observer } from "mobx-react";

class Entry extends React.Component {
  // handleChange(values) {}
  // handleUpdate(form) {}
  // handleSubmit(values) {}
  render() {
    if (!this.props.entries) {
      return <div>No entires prop found</div>;
    }

    if (this.props.entries.fetching) {
      return <div>Loading</div>;
    }

    // if (this.props.entries && this.props.entries.error) {
    //   return <div>Error</div>;
    // }

    const entries = this.props.entries.entries;
    return (
      <div>
        {entries.map(entry => <EntryDetail key={entry.id} entry={entry} />)}
        {/* <div>
          <LocalForm
            onUpdate={form => this.handleUpdate(form)}
            onChange={values => this.handleChange(values)}
            onSubmit={values => this.handleSubmit(values)}
            model="entry"
          >
            <Control.text model=".date" />
            <Control.text model=".rank" />
            <Control.text model=".outcome" />
            <Control.text model=".role" />
            <Control.text model=".champ" />
            <Control.text model=".matchup" />
            <Control.text model=".jungler" />
            <Control.text model=".score" />
            <Control.text model=".mistake" />
            <Control.text model=".positive" />
            <Control.text model=".lesson" />
            <Control.text model=".deathReason" />
            <Control.text model=".roam" />
            <Control.text model=".gank" />
            <Control.text model=".csFail" />
            <Control.text model=".video" />
          </LocalForm>
        </div> */}
      </div>
    );
  }
}

// export default graphql(allEntriesQuery, { name: "allEntriesQuery" })(Entry);
export default inject("entries")(observer(Entry));
