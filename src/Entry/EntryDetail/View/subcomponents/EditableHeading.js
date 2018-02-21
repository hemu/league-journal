import React from 'react';
import PropTypes from 'prop-types';
import { Control } from 'react-redux-form';
import styled from 'styled-components';
import { Input } from 'semantic-ui-react';

const DisplayCont = styled.div`
  cursor: pointer;
  height: 100%;
  padding: 10px 0;
`;

const EmptyDisplayCont = styled.div`
  height: 100%;
  color: #ddd;
  font-style: italic;
  cursor: pointer;
  border: 5px dotted #ececec;
  cursor: pointer;
  padding: 10px 30px;
  margin: 0 auto;
`;

const FormInput = styled(Control.text)`
  width: 100%;
  height: 100%;
  &&& input {
    color: #636262;
    font-size: 17px;
    font-family: 'Lato';
    font-weight: bold;
    line-height: 25px;
  }
`;

const TextDisplay = ({ value, onClick, emptyPlaceholder }) => {
  if (value && value.trim()) {
    return <DisplayCont onClick={onClick}>{value}</DisplayCont>;
  }
  return (
    <EmptyDisplayCont onClick={onClick}>{emptyPlaceholder}</EmptyDisplayCont>
  );
};

TextDisplay.propTypes = {
  value: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  emptyPlaceholder: PropTypes.string.isRequired,
};

class EditableHeading extends React.Component {
  constructor(props) {
    super(props);
    let editMode = props.editMode;
    editMode = props.isLatest ? true : editMode;
    this.state = {
      editMode,
    };
    this.handleDisplayClick = this.handleDisplayClick.bind(this);
    this.handleInputBlur = this.handleInputBlur.bind(this);
    this.inputRef = null;
  }

  componentDidMount() {
    if (this.state.editMode && this.inputRef) {
      this.inputRef.focus();
    }
  }

  componentDidUpdate() {
    if (this.state.editMode && this.inputRef) {
      this.inputRef.focus();
    }
  }

  handleDisplayClick() {
    this.setState({ editMode: true });
  }

  handleInputBlur() {
    this.setState({ editMode: false });
  }

  render() {
    const { isLatest, emptyPlaceholder, editMode, ...validProps } = this.props;
    return (
      <div>
        {this.state.editMode ? (
          <FormInput
            {...validProps}
            component={Input}
            size="mini"
            updateOn="blur"
            onBlur={this.handleInputBlur}
            getRef={(node) => {
              this.inputRef = node;
            }}
            onFocus={(e) => {
              // this trick puts cursor at end of input on focus
              const val = e.target.value;
              e.target.value = '';
              e.target.value = val;
            }}
          />
        ) : (
          <Control
            component={TextDisplay}
            {...this.props}
            onClick={this.handleDisplayClick}
          />
        )}
      </div>
    );
  }
}

EditableHeading.propTypes = {
  isLatest: PropTypes.bool.isRequired,
  emptyPlaceholder: PropTypes.string.isRequired,
  editMode: PropTypes.bool,
};

EditableHeading.defaultProps = {
  editMode: false,
};

export default EditableHeading;
