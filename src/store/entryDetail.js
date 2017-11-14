import { types, flow } from "mobx-state-tree";
import { Entry } from "./entries";
import client from "../api/client";
import gql from "graphql-tag";

export const entryQuery = gql`
  query EntryQuery($entryId: ID!) {
    Entry(id: $entryId) {
      id
      mistakes
      positives
      lessons
      deathReasons
      roams
      csReasons
      video
    }
  }
`;

const EditEntry = types
  .model("EditEntry", {
    detailEntryId: types.optional(types.string, ""),
    fetching: types.optional(types.boolean, false),
    loaded: types.optional(types.boolean, false),
    mistakes: types.optional(types.array(types.string), []),
    positives: types.optional(types.array(types.string), []),
    lessons: types.optional(types.array(types.string), []),
    deathReasons: types.optional(types.array(types.string), []),
    roams: types.optional(types.array(types.string), []),
    csReasons: types.optional(types.array(types.string), []),
    video: types.optional(types.string, "")
  })
  .views(self => ({}))
  .actions(self => {
    const setEntry = entryId => {
      console.log(`trying to set entry with id ${entryId}`);
      const fetchEntry = flow(function*() {
        self.fetching = true;
        self.loaded = false;
        // const { data: { Entry: fetchedEntry } } = yield client.query({
        const results = yield client.query({
          query: entryQuery,
          variables: { entryId: entryId },
          fetchPolicy: "network-only"
        });

        console.log(results);

        const { data: { Entry: fetchedEntry } } = results;
        self.fetching = false;
        self.loaded = true;

        self.mistakes = fetchedEntry.mistakes;
        self.positives = fetchedEntry.positives;
        self.lessons = fetchedEntry.lessons;
        self.deathReasons = fetchedEntry.deathReasons;
        self.roams = fetchedEntry.roams;
        self.csReasons = fetchedEntry.csReasons;
        self.video = fetchedEntry.video;
      });
      fetchEntry();
    };

    const addString = stringKey => {
      self[stringKey].push("");
    };
    const changeString = (stringKey, elemIndex, newString) => {
      if (self[stringKey].length > elemIndex - 1) {
        self[stringKey][elemIndex] = newString;
      }
    };

    const addMistake = () => addString("mistakes");
    const changeMistake = (elemIndex, newText) =>
      changeString("mistakes", elemIndex, newText);

    const addPositive = () => addString("positives");
    const changePositive = (elemIndex, newText) =>
      changeString("positives", elemIndex, newText);

    const addLesson = () => addString("lessons");
    const changeLesson = (elemIndex, newText) =>
      changeString("lessons", elemIndex, newText);

    const addDeathReason = () => addString("deathReasons");
    const changeDeathReason = (elemIndex, newText) =>
      changeString("deathReasons", elemIndex, newText);

    const addRoam = () => addString("roams");
    const changeRoam = (elemIndex, newText) =>
      changeString("roams", elemIndex, newText);

    const addGank = () => addString("ganks");
    const changeGank = (elemIndex, newText) =>
      changeString("ganks", elemIndex, newText);

    const addCsReason = () => addString("csReasons");
    const changeCsReason = (elemIndex, newText) =>
      changeString("csReasons", elemIndex, newText);

    const changeVideo = newText => (self.video = newText);

    return {
      setEntry,
      addMistake,
      changeMistake,
      addPositive,
      changePositive,
      addLesson,
      changeLesson,
      addDeathReason,
      changeDeathReason,
      addRoam,
      changeRoam,
      addGank,
      changeGank,
      addCsReason,
      changeCsReason,
      changeVideo
    };
  });

export default EditEntry;
