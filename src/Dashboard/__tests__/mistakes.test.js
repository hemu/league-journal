import React from 'react';
import { shallow } from 'enzyme';
import { Mistakes } from '../Mistakes';

describe('Mistake', () => {
  let props;
  let shallowGoal;
  const mainComp = () => {
    if (!shallowGoal) {
      shallowGoal = shallow(<Mistakes {...props} />).dive();
    }
    return shallowGoal;
  };

  beforeEach(() => {
    props = {
      mistakes: [],
      placeholder: 'Star your top mistakes to see them here.',
    };
    shallowGoal = undefined;
  });

  it('always renders a div', () => {
    const divs = mainComp().find('div');
    expect(divs.length).toBeGreaterThan(0);
  });
});
