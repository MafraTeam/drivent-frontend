import { useState, useContext } from 'react';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import { OptionBox } from '../../../layouts/OptionBox.js';

import { useNavigate } from 'react-router-dom';

import EventInfoContext from '../../../contexts/EventInfoContext';

export default function Payment() {
  const { eventInfo } = useContext(EventInfoContext);

  const navigate = useNavigate();

  return (
    <>
      <StyledTypography variant="h4">Ingresso e pagamento</StyledTypography>
      <StyledTypography variant="h6" style={{ 'color': '#8E8E8E', 'font-weight': '400', 'margin-top': '32px' }}>
        Primeiro, escolha sua modalidade de ingresso
      </StyledTypography>
      <Container>
        <OptionBox>
          <h1>Presencial</h1>
          <h2>R$X</h2>
        </OptionBox>

        <OptionBox>
          <h1>Online</h1>
          <h2>R$X</h2>
        </OptionBox>
      </Container>

    </>
  );
}

const Container = styled.div` 
  display: flex;
`;

const StyledTypography = styled(Typography)`
  margin-bottom: 20px!important;
`;
