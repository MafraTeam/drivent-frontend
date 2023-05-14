import { useState, useContext } from 'react';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import { OptionBox } from '../../../layouts/OptionBox.js';
import { useNavigate } from 'react-router-dom';

export default function Payment() {
  const navigate = useNavigate();

  const [pricePr, setPricePr] = useState('X');
  const [priceOn, setPriceOn] = useState('Y');
  const [type, setType] = useState('');

  return (
    <>
      <StyledTypography variant="h4">Ingresso e pagamento</StyledTypography>
      <StyledTypography variant="h6" style={{ 'color': '#8E8E8E', 'font-weight': '400', 'margin-top': '32px' }}>
        Primeiro, escolha sua modalidade de ingresso
      </StyledTypography>

      <Row>
        <OptionBox onClick={() => setType('presencial')} style={{ 'background-color': type === 'presencial' ? '#FFEED2' : 'white' }}>
          <h1>Presencial</h1>
          <h2>R${pricePr}</h2>
        </OptionBox>
        <OptionBox onClick={() => setType('online')} style={{ 'background-color': type === 'online' ? '#FFEED2' : 'white' }}>
          <h1>Online</h1>
          <h2>R${priceOn}</h2>
        </OptionBox>
      </Row>

      {type !== 'online' ? '' :
        <Column>
          <StyledTypography variant="h6" style={{ 'color': '#8E8E8E', 'font-weight': '400', 'margin-top': '32px' }}>
            Fechado! O total ficou em <span style={{ 'font-weight': '500' }}>R$ {priceOn}.</span> Agora é só confirmar:
          </StyledTypography>
          <ReserveButton>
            RESERVAR INGRESSO
          </ReserveButton>
        </Column>
      }
    </>
  );
}

const Row = styled.div` 
  display: flex;
`;

const Column = styled.div` 
  display: flex;
  flex-direction: column;
`;

const StyledTypography = styled(Typography)`
  margin-bottom: 20px!important;
`;

const ReserveButton = styled.div`
  width: 162px;
  height: 37px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #E0E0E0;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  font-family: 'Roboto';
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  text-align: center;
  color: #000000;
`;
