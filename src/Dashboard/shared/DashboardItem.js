import React from 'react';
import { Grid, Card, Button, Accordion, Icon } from 'semantic-ui-react';
import styled from 'styled-components';

const MainCard = styled(Card)`
  height: 400px;
  &&& {
    border-radius: 0;
  }
`;

const CardHeader = styled.div`
  font-size: 18px;
  color: #fff;
  font-weight: 600;
  padding: 20px 20px 5px;
  height: 50px;
  background-color: ${(p) => p.color};
  &&& {
    border-radius: 0 !important;
  }
`;

const CardContentList = styled.div`
  &&& {
    padding: 10px 20px;
    border-top: none;
  }
`;

const DashboardItem = ({ title, titleColor, children, mainColor }) => (
  <MainCard raised fluid>
    <CardHeader color={mainColor}>{title}</CardHeader>
    <CardContentList>{children}</CardContentList>
  </MainCard>
);

export default DashboardItem;
