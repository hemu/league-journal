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

export const ContWithMeta = styled.div`
  display: grid;
  grid-template-columns: 50px auto;
  align-items: center;
`;

export const ContNoMeta = styled.div`
`;

const TextDisplay = ({ value, onClick, emptyPlaceholder }) =>
  (value && value.trim() ? (
    <DisplayCont onClick={onClick}>{value}</DisplayCont>
  ) : (
    <EmptyDisplayCont onClick={onClick}>{emptyPlaceholder}</EmptyDisplayCont>
  ));

TextDisplay.propTypes = {
  value: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  emptyPlaceholder: PropTypes.string.isRequired,
};

TextDisplay.defaultProps = {
  value: '',
};


const MetaText = styled.div`
  font-style: italic;
  color: #adadad;
  font-size: 12px;
  font-weight: bold;
`

const MetaElem = ({text}) => {
  if(!text) {
    return <div />
  }
  return <MetaText>{text}</MetaText>
}

class EditableNote extends React.Component {
  constructor(props) {
    super(props);
    let editMode = props.editMode;
    editMode = props.initWithEditFocus ? true : editMode;
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
    const { changeAction, emptyPlaceholder, model, onBlur, meta } = this.props;

    const Container = meta && meta.length > 0 ? ContWithMeta : ContNoMeta; 

    return this.state.editMode ? (
      <Container>
        <MetaElem text={meta}/>
        <FormInput
          component={Input}
          getRef={(node) => {
            this.inputRef = node;
          }}
          model={model}
          onBlur={() => {
            this.handleInputBlur();
            onBlur();
          }}
          onFocus={(e) => {
            // this trick puts cursor at end of input on focus
            const val = e.target.value;
            e.target.value = '';
            e.target.value = val;
          }}
          onKeyPress={this.handleKeyPress}
          size="mini"
          updateOn="blur"
          changeAction={changeAction}
        />
      </Container>
    ) : (
      <Container>
        <MetaElem text={meta}/>
        <Control
          component={TextDisplay}
          model={model}
          emptyPlaceholder={emptyPlaceholder}
          onClick={this.handleDisplayClick}
        />
      </Container>
    );
  }
}

EditableNote.propTypes = {
  changeAction: PropTypes.func.isRequired,
  editMode: PropTypes.bool,
  emptyPlaceholder: PropTypes.string.isRequired,
  initWithEditFocus: PropTypes.bool.isRequired,
  model: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  meta: PropTypes.string
};

EditableNote.defaultProps = {
  editMode: false,
};

export default EditableNote;
