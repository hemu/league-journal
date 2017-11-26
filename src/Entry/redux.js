// import PropTypes from "prop-types";
// import { fetchAllEntries, fetchDetailEntry } from "../api/entry";
// import { isLocalEntry } from "./helpers";
// import { RequestStatus } from "../const";
// import { action } from "../helpers/redux";
//
// const FETCH_ALL_REQUEST = "entries/FETCH_ALL_REQUEST";
// const FETCH_ALL_SUCCESS = "entries/FETCH_ALL_SUCCESS";
// const FETCH_ALL_ERROR = "entries/FETCH_ALL_ERROR";
//
// const FETCH_DETAIL_REQUEST = "entries/FETCH_DETAIL_REQUEST";
// const FETCH_DETAIL_SUCCESS = "entries/FETCH_DETAIL_SUCCESS";
// const FETCH_DETAIL_ERROR = "entries/FETCH_DETAIL_ERROR";
//
// const SET_ENTRY_INDEX = "entries/SET_ENTRY_INDEX";
//
// export const fetchAllRequest = action(FETCH_ALL_REQUEST);
// export const fetchAllSuccess = action(FETCH_ALL_SUCCESS, "entries");
// export const fetchDetailRequest = action(FETCH_DETAIL_REQUEST, "entryId");
// export const fetchDetailSuccess = action(FETCH_DETAIL_SUCCESS, "entry");
// export const setEntryIndex = action(SET_ENTRY_INDEX, "index");
//
// export default function reducer(state = {}, action = {}) {
//   switch (action.type) {
//     default:
//       return state;
//   }
// }
//
// // const entriesLogic = kea({
// //   actions: ({ constants }) => ({
// //     fetchAllRequest: () => {},
// //     fetchAllSuccess: result => result,
// //     fetchAllError: error => error,
// //     fetchDetailRequest: entryId => entryId,
// //     fetchDetailSuccess: result => result,
// //     fetchDetailError: error => error,
// //     setEntryIndex: index => index
// //   }),
// //
// //   thunks: ({ actions, get, fetch, dispatch, getState }) => ({
// //     fetchEntries: async () => {
// //       actions.fetchAllRequest();
// //       const { data: { allEntries } } = await fetchAllEntries();
// //       actions.fetchAllSuccess(allEntries);
// //     },
// //     fetchEntryDetail: async entryId => {
// //       const results = await fetchDetailEntry(entryId);
// //       const { data: { Entry: fetchedEntry } } = results;
// //       actions.fetchDetailSuccess({
// //         ...fetchedEntry,
// //         gameDate: new Date(fetchedEntry.gameDate)
// //       });
// //     },
// //     setEntryDetail: async entryIndex => {
// //       const entriesState = fetch("entries").entries;
// //       const entries = entriesState.entries;
// //       if (entries && entryIndex < entries.length) {
// //         actions.setEntryIndex(entryIndex);
// //         const entry = entries[entryIndex];
// //         const entryId = entry.id;
// //         actions.fetchDetailRequest(entryId);
// //         if (isLocalEntry(entryId)) {
// //           actions.fetchDetailSuccess({
// //             id: entryId,
// //             gameDate: new Date()
// //           });
// //         } else {
// //           actions.fetchEntryDetail(entryId);
// //         }
// //       }
// //     }
// //   }),
// //   reducers: ({ actions, constants }) => ({
// //     entries: [
// //       {
// //         entries: [],
// //         fetchAllStatus: RequestStatus.None,
// //         fetchDetailStatus: RequestStatus.None,
// //         detailEntryId: "",
// //         selectedEntryIndex: 0
// //       },
// //       PropTypes.object,
// //       {
// //         [actions.fetchAllRequest]: (state, payload) => {
// //           return {
// //             ...state,
// //             fetchAllStatus: RequestStatus.Request
// //           };
// //         },
// //         [actions.fetchAllSuccess]: (state, payload) => {
// //           return {
// //             ...state,
// //             entries: payload,
// //             fetchAllStatus: RequestStatus.Success
// //           };
// //         },
// //         [actions.fetchDetailRequest]: (state, payload) => {
// //           return {
// //             ...state,
// //             fetchDetailStatus: RequestStatus.Request,
// //             detailEntryId: payload
// //           };
// //         },
// //         [actions.fetchDetailSuccess]: (state, payload) => {
// //           return {
// //             ...state,
// //             entries: state.entries.map(entry => {
// //               if (entry.id === state.detailEntryId) {
// //                 return payload;
// //               }
// //               return entry;
// //             }),
// //             fetchDetailStatus: RequestStatus.Success
// //           };
// //         },
// //         [actions.setEntryIndex]: (state, payload) => {
// //           return {
// //             ...state,
// //             selectedEntryIndex: payload
// //           };
// //         }
// //       }
// //     ]
// //   })
// // });
//
// // export default entriesLogic;
