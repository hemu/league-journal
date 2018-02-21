import React from 'react';
import PropTypes from 'prop-types';
import { Control } from 'react-redux-form';
import styled from 'styled-components';
import { Input } from 'semantic-ui-react';

const DisplayCont = styled.div`
  cursor: pointer;
  padding: 10px 0;
  font-size: 13px;
  text-align: left;
`;

const EmptyDisplayCont = styled.div`
  color: #aaa;
  font-style: italic;
  font-size: 13px;
  text-align: center;
  cursor: pointer;
  ${'' /* border: 1px #c7c7c7;
  border-style: dashed; */} padding: 10px 0;
  margin: 0 auto;
`;

export const FormInput = styled(Control.text)`
  height: 50px;
  width: 100%;
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

class EditableNote extends React.Component {
  constructor(props) {
    super(props);
    let editMode = props.editMode;
    editMode = props.isLatest ? true : editMode;
    this.state = {
      editMode,
    };
    this.handleDisplayClick = this.handleDisplayClick.bind(this);
    this.handleInputBlur = this.handleInputBlur.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
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

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.inputRef.inputRef.blur();
    }
  }

  render() {
    const { isLatest, emptyPlaceholder, editMode, ...validProps } = this.props;
    return this.state.editMode ? (
      <FormInput
        {...validProps}
        component={Input}
        size="mini"
        updateOn="blur"
        onBlur={this.handleInputBlur}
        getRef={(node) => {
          this.inputRef = node;
        }}
        onKeyPress={this.handleKeyPress}
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
    );
  }
}

EditableNote.propTypes = {
  isLatest: PropTypes.bool.isRequired,
  emptyPlaceholder: PropTypes.string.isRequired,
  editMode: PropTypes.bool,
};

EditableNote.defaultProps = {
  editMode: false,
};

export default EditableNote;
