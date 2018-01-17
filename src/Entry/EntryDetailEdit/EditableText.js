import React from 'react';
import PropTypes from 'prop-types';
import { Control } from 'react-redux-form';
import styled from 'styled-components';
import { Input } from 'semantic-ui-react';
import { FormInput } from './FormElements';

const DisplayCont = styled.div`
  cursor: pointer;
`;

const EmptyDisplayCont = styled.div`
  color: #ddd;
  font-style: italic;
  cursor: pointer;
`;

const TextDisplay = ({ value, onClick, emptyPlaceholder }) => {
  if (value) {
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

class EditableText extends React.Component {
  constructor(props) {
    super(props);
    let editMode = props.editMode != null ? props.editMode : false;
    editMode = props.isLatest ? true : editMode;
    console.log(editMode);
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
    console.log('handleInputBlur');
    this.setState({ editMode: false });
  }

  render() {
    const { isLatest, emptyPlaceholder, ...validProps } = this.props;
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

EditableText.propTypes = {
  isLatest: PropTypes.bool.isRequired,
  emptyPlaceholder: PropTypes.string.isRequired,
  editMode: PropTypes.bool.isRequired,
};

export default EditableText;
