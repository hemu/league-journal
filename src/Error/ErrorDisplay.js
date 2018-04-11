import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ErrorImage from './amumu_cry.png';
import { Image } from 'semantic-ui-react';

const Display = styled.div`
  height: 100%;
  width: 100%;
  font-size: ${(props) => `${props.fontSize}px`};
  text-align: center;
  margin-top: 50px;
  padding: 10px;
`;

// const Cont = styled.div`
//   margin: auto;
//   width: 50%;
//   height: 50px;
// `;

// const ErrorImage = styled.`

// `

const ErrorDisplay = ({ children, fontSize }) => (
  <div>
    <Display fontSize={fontSize}>{children}</Display>
    <Image src={ErrorImage} centered />
  </div>
);

ErrorDisplay.propTypes = {
  fontSize: PropTypes.number,
};

ErrorDisplay.defaultProps = {
  fontSize: 14,
};

export default ErrorDisplay;
