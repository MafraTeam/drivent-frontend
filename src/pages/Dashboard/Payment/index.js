import { useState, useContext } from 'react';
import { OptionBox } from '../../../layouts/OptionBox.js';
import { useNavigate } from 'react-router-dom';
import { Container, Options, Option, Button, Row, Column, StyledTypography, ReserveButton } from '../../../components/Dashboard/Payments';

export default function Payment() {
  const navigate = useNavigate();

  const [pricePr, setPricePr] = useState(150);
  const [priceOn, setPriceOn] = useState(50);
  const [type, setType] = useState('');
  const [includesHotel, setIncludesHotel] = useState('');
  const [total, setTotal] = useState(0);

  return (
    <>
      <StyledTypography variant="h4">Ingresso e pagamento</StyledTypography>
      <StyledTypography variant="h6" style={{ 'color': '#8E8E8E', 'font-weight': '400', 'margin-top': '32px' }}>
        Primeiro, escolha sua modalidade de ingresso
      </StyledTypography>

      <Row>
        <OptionBox onClick={() => setType('presencial')} style={{ 'background-color': type === 'presencial' ? '#FFEED2' : 'white' }}>
          <h1>Presencial</h1>
          <h2 onClick={() => setTotal(pricePr)}>R${pricePr}</h2>
        </OptionBox>
        <OptionBox onClick={() => setType('online')} style={{ 'background-color': type === 'online' ? '#FFEED2' : 'white' }}>
          <h1>Online</h1>
          <h2 onClick={() => setTotal(priceOn)}>R${priceOn}</h2>
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

      {type == 'presencial' ?
        <>
          <StyledTypography variant="h6" style={{ 'color': '#8E8E8E', 'font-weight': '400', 'margin-top': '32px' }}>Ótimo! Agora escolha sua modalidade de hospedagem</StyledTypography>
          <Row>
            <OptionBox onClick={() => setIncludesHotel(false)} style={{ 'background-color': includesHotel === false ? '#FFEED2' : 'white' }}>
              <p>Sem hotel</p>
              <p className='price' onClick={() => setTotal(200)}> R$50,00</p>
            </OptionBox>
            <OptionBox onClick={() => setIncludesHotel(true)} style={{ 'background-color': includesHotel === true ? '#FFEED2' : 'white' }}>
              <p>Com hotel</p>
              <p className='price' onClick={() => setTotal(400)}> R$250,00</p>
            </OptionBox>
          </Row>
        </>
        : ''
      }

      {includesHotel !== '' ?
        <>
          <StyledTypography variant="h6" style={{ 'color': '#8E8E8E', 'font-weight': '400', 'margin-top': '32px' }}>
            Fechado! O total ficou em <span style={{ 'font-weight': '500' }}>R$ {total}.</span> Agora é só confirmar:
          </StyledTypography>
          <ReserveButton><p>RESERVAR INGRESSO</p></ReserveButton>
        </>
        : ''
      }

    </>
  );
}
