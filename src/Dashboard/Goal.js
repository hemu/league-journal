import React from 'react';
import { Button, Input } from 'semantic-ui-react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import { goalQuery, saveGoalMutation } from '../api/goal';

const Cont = styled.div`
  font-size: 18px;
  grid-template-columns: 160px auto 100px;
  height: 50px;
  width: 100%;
  display: grid;
  background-color: #fff;
  margin-bottom: 20px;
`;

export const TextCont = styled.div`
  padding-left: 40px;
  text-align: center;
  align-self: center;
  width: 100%;
  color: #555;
`;

export const GoalInput = styled(Input)`
  padding-left: 40px;
`;

const EditBtn = styled(Button)`
  &&& {
    background-color: #d6d6d6;
    justify-self: center;
    align-self: center;
  }
`;

const AcceptBtn = styled(Button)`
  &&& {
    justify-self: center;
    align-self: center;
    background-color: #59c9a5;
  }
`;

const FlagLabel = styled.div`
  font-size: 16px;
  position: relative;
  background: #59c9a5;
  width: 100%;
  color: #fff;
  font-style: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  &:after {
    left: 100%;
    top: 50%;
    border: solid transparent;
    content: ' ';
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
    border-color: rgb(89, 201, 165, 0);
    border-left-color: #59c9a5;
    border-width: 25px;
    margin-top: -25px;
  }
`;

class Goal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: false,
      value: '',
      goal: {},
    };
    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleInputBlur = this.handleInputBlur.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.inputRef = null;
  }

  componentDidMount() {
    if (this.state.editMode && this.inputRef) {
      this.inputRef.focus();
    }
  }

  componentWillReceiveProps(nextProps) {
    const { data } = nextProps;
    if (data.allGoals && data.allGoals.length > 0) {
      this.setState({
        value: data.allGoals[0].text,
        goal: data.allGoals[0],
      });
    }
  }

  componentDidUpdate() {
    if (this.state.editMode && this.inputRef) {
      this.inputRef.focus();
    }
  }

  handleEditClick() {
    this.setState({
      editMode: true,
    });
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleInputBlur() {
    if (this.state.value !== this.state.goal) {
      console.log('graphql goal update...');
      this.props.saveGoal(this.state.goal.id, this.state.value);
    }
    this.setState({
      editMode: false,
      goal: { ...this.state.goal, text: this.state.value },
    });
  }

  render() {
    return (
      <Cont>
        <FlagLabel>Focus Goal</FlagLabel>
        {this.state.editMode ? (
          <GoalInput
            value={this.state.value}
            onFocus={(e) => {
              // this trick puts cursor at end of input on focus
              const val = e.target.value;
              e.target.value = '';
              e.target.value = val;
            }}
            onBlur={this.handleInputBlur}
            innerRef={(input) => {
              this.inputRef = input;
            }}
            onChange={this.handleChange}
            transparent
          />
        ) : (
          <TextCont>{this.state.value}</TextCont>
        )}
        {this.state.editMode ? (
          <AcceptBtn
            circular
            icon="check circle"
            color="black"
            size="big"
            onClick={this.handleEditClick}
          />
        ) : (
          <EditBtn
            circular
            icon="write"
            color="black"
            size="big"
            onClick={this.handleEditClick}
          />
        )}
      </Cont>
    );
  }
}

Goal.propTypes = {
  data: PropTypes.shape({ loading: PropTypes.bool, allGoals: PropTypes.array })
    .isRequired,
  saveGoal: PropTypes.func.isRequired,
};
export default compose(
  graphql(goalQuery),
  graphql(saveGoalMutation, {
    props: ({ mutate }) => ({
      saveGoal: (id, text) =>
        mutate({
          variables: {
            id,
            text,
          },
          optimisticResponse: {
            __typename: 'Mutation',
            updateGoal: {
              __typename: 'Goal',
              id,
              text,
            },
          },
        }),
    }),
  }),
  connect(),
)(Goal);
