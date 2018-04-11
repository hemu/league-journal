import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import { RecentGamesContainer } from '../Container';
import RecentGames from '../RecentGames';

const mockFn = jest.fn();

describe('renders RecentGames without crashing', () => {
  it('renders Component without crashing', () => {
    shallow(
      <RecentGames
        games={[]}
        error={null}
        createEntryFromGameId={mockFn}
        showEntry={mockFn}
      />,
    );
  });

  it('renders Container without crashing', () => {
    shallow(
      <RecentGamesContainer
        createEntryFromGameId={mockFn}
        entries={[]}
        fetchRecentGames={mockFn}
        games={[]}
        isFetchingRecentGames={false}
        showEntry={mockFn}
        summonerId=""
        userId=""
      />,
    );
  });

  it('renders Container loading=false without crashing', () => {
    shallow(
      <RecentGamesContainer
        createEntryFromGameId={mockFn}
        entries={[]}
        fetchRecentGames={mockFn}
        games={[]}
        isLoadingEntries={false}
        isFetchingRecentGames={false}
        showEntry={mockFn}
        summonerId=""
        userId=""
      />,
    );
  });

  it('renders Container loading=true without crashing', () => {
    shallow(
      <RecentGamesContainer
        createEntryFromGameId={mockFn}
        entries={[]}
        fetchRecentGames={mockFn}
        games={[]}
        isLoadingEntries={true}
        isFetchingRecentGames={true}
        showEntry={mockFn}
        summonerId=""
        userId=""
      />,
    );
  });
});
