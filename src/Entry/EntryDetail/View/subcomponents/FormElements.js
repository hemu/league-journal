import styled from 'styled-components';
import { Control } from 'react-redux-form';

export const FieldLabel = styled.label`
  font-weight: bold;
  font-size: 0.9em;
  color: #444;
  font-style: italic;
`;

export const FormInput = styled(Control.text)`
  width: 100%;
  height: 100%;
`;
