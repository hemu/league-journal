import React from 'react';
import { shallow } from 'enzyme';
import { Goal, TextCont } from '../Goal';

describe('Goal', () => {
  let props;
  let shallowGoal;
  const goalComponent = () => {
    if (!shallowGoal) {
      shallowGoal = shallow(<Goal {...props} />).dive();
    }
    return shallowGoal;
  };

  beforeEach(() => {
    props = {
      goal: '',
      placeholder: 'Click to set a new goal',
    };
    shallowGoal = undefined;
  });

  it('always renders a div', () => {
    const divs = goalComponent().find('div');
    expect(divs.length).toBeGreaterThan(0);
  });

  it('shows placeholder for undefined goal', () => {
    const comp = goalComponent()
      .find(TextCont)
      .dive();
    expect(comp.text()).toEqual(props.placeholder);
  });

  describe('with defined goal', () => {
    beforeEach(() => {
      props.goal = 'Win';
    });

    it('displays given goal prop', () => {
      const comp = goalComponent()
        .find(TextCont)
        .dive();
      expect(comp.text()).toEqual('Win');
    });
  });
});
