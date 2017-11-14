import React from "react";
import { Button, Checkbox, Form, Input, Divider } from "semantic-ui-react";

class EntryDetail extends React.Component {
  render() {
    return (
      <div>
        <Form>
          <div>Mistakes</div>
          <Form.Field>
            <Input />
          </Form.Field>
          <Divider />
          <Form.Field>
            <Input />
          </Form.Field>
          <Divider />
          <Button type="submit">Submit</Button>
        </Form>
      </div>
    );
  }
}

export default EntryDetail;
