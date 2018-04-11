import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import { EntryListContainer } from '../Container';
import EntryList from '../EntryList';

const mockFn = jest.fn();

describe('renders EntryList without crashing', () => {
  it('renders Component without crashing', () => {
    shallow(
      <EntryList
        entries={[]}
        onSelectEntry={mockFn}
        createEntry={mockFn}
        selectedId=""
      />,
    );
  });

  it('renders Container loading=true without crashing', () => {
    shallow(
      <EntryListContainer
        isLoadingEntries
        entries={[]}
        setEntryDetailId={mockFn}
        userId=""
        match={{ params: {} }}
      />,
    );
  });

  it('renders Container loading=false without crashing', () => {
    shallow(
      <EntryListContainer
        isLoadingEntries={false}
        entries={[]}
        setEntryDetailId={mockFn}
        userId=""
        match={{ params: {} }}
      />,
    );
  });
});
