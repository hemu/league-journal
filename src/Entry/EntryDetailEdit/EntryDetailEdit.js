// import React from 'react';
// import styled from 'styled-components';
// import { Control, Form as ReactForm } from 'react-redux-form';
// import { Button, Form, Input, Divider, Grid } from 'semantic-ui-react';
// // import DayPickerInput from 'react-day-picker/DayPickerInput';
// // import YoutubePlayer from 'react-youtube';
// import 'react-day-picker/lib/style.css';
// import EntryDetailBaseStats from './EntryDetailBaseStats';
// import ChampionMatchup from './Matchup';
//
// import { baseFormModel } from '../helpers';
//
// const FormSectionCont = styled.div`
//   padding-top: 15px;
// `;
//
// const multiElemSections = [
//   {
//     model: 'mistakes',
//     title: 'Mistakes',
//     placeholder: 'My mistake was...',
//   },
//   {
//     model: 'deathReasons',
//     title: 'Reasons for Deaths',
//     placeholder: 'I died because...',
//   },
//   {
//     model: 'csReasons',
//     title: "Why didn't I hit CS goals?",
//     placeholder: 'I missed CS because...',
//   },
//   {
//     model: 'roams',
//     title: 'Roams',
//     placeholder: 'First roam was good/bad because...',
//   },
//   {
//     model: 'positives',
//     title: 'Positives',
//     placeholder: 'I did this well...',
//   },
//   {
//     model: 'lessons',
//     title: 'Lessons',
//     placeholder: 'My lesson was...',
//   },
// ];
//
// const EntrySection = ({ title, children }) => (
//   <FormSectionCont>
//     <Divider horizontal>{title}</Divider>
//     {children}
//   </FormSectionCont>
// );
//
// export default (props) => {
//   const {
//     entryId,
//     removeEntry,
//     saveEntry,
//     formChange,
//     formAdd,
//     formRemove,
//   } = props;
//   return (
//     <ReactForm model={baseFormModel} onSubmit={saveEntry}>
//       <Button type="submit">Save</Button>
//       <Button type="button" onClick={() => removeEntry(entryId)}>
//         Delete
//       </Button>
//
//       <EntrySection title="Game Stats">
//         <EntryDetailBaseStats formChange={formChange} />
//       </EntrySection>
//       <EntrySection title="Matchup">
//         <ChampionMatchup
//           model1=".champion"
//           model2=".opponentChampion"
//           formChange={formChange}
//         />
//       </EntrySection>
//
//       <EntrySection title="Jungle Matchup">
//         <ChampionMatchup
//           model1=".jungler"
//           model2=".opponentJungler"
//           formChange={formChange}
//         />
//       </EntrySection>
//
//       <EntrySection title="Creep Score">
//         <Grid>
//           <Grid.Column width={2}>
//             <Form.Field>
//               <label>CS / Min</label>
//               <Control.text
//                 component={Input}
//                 size="mini"
//                 model=".csPerMin"
//                 updateOn="blur"
//               />
//             </Form.Field>
//           </Grid.Column>
//           <Grid.Column width={2}>
//             <Form.Field>
//               <label>CS @ 5</label>
//               <Control.text
//                 component={Input}
//                 size="mini"
//                 model=".csAt5Min"
//                 updateOn="blur"
//               />
//             </Form.Field>
//           </Grid.Column>
//           <Grid.Column width={2}>
//             <Form.Field>
//               <label>CS @ 10</label>
//               <Control.text
//                 component={Input}
//                 size="mini"
//                 model=".csAt10Min"
//                 updateOn="blur"
//               />
//             </Form.Field>
//           </Grid.Column>
//           <Grid.Column width={2}>
//             <Form.Field>
//               <label>CS @ 15</label>
//
//               <Control.text
//                 component={Input}
//                 size="mini"
//                 model=".csAt15Min"
//                 updateOn="blur"
//               />
//             </Form.Field>
//           </Grid.Column>
//           <Grid.Column width={2}>
//             <Form.Field>
//               <label>CS @ 20</label>
//               <Control.text
//                 component={Input}
//                 size="mini"
//                 model=".csAt20Min"
//                 updateOn="blur"
//               />
//             </Form.Field>
//           </Grid.Column>
//         </Grid>
//       </EntrySection>
//
//       {multiElemSections.map(section => (
//         <EntrySection title={section.title} key={section.title}>
//           <Button
//             type="button"
//             size="mini"
//             onClick={() => formAdd(`.${section.model}`)}
//           >
//             Add New
//           </Button>
//           {props[section.model].map((elem, elemIndex) => (
//             <Form.Field key={elemIndex}>
//               <Button
//                 type="button"
//                 size="mini"
//                 onClick={() => formRemove(`.${section.model}`, elemIndex)}
//               >
//                 X
//               </Button>
//               <Control.text
//                 component={Input}
//                 size="mini"
//                 model={`.${section.model}[${elemIndex}]`}
//                 placeholder={section.placeholder}
//                 updateOn="blur"
//               />
//             </Form.Field>
//           ))}
//         </EntrySection>
//       ))}
//     </ReactForm>
//   );
// };
