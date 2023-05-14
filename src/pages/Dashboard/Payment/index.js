import { useState, useContext } from 'react';
import { OptionBox } from '../../../layouts/OptionBox.js';
import { useNavigate } from 'react-router-dom';
import { Row, Column, StyledTypography, ReserveButton } from '../../../components/Dashboard/Payments';

export default function Payment() {
  const navigate = useNavigate();

  const [pricePr, setPricePr] = useState(150);
  const [priceOn, setPriceOn] = useState(50);
  const [type, setType] = useState('');
  const [includesHotel, setIncludesHotel] = useState('');
  const [price, setPrice] = useState(0);

  function withHotel() {
    setIncludesHotel(true);
    setPrice(400);
  }

  function withoutHotel() {
    setIncludesHotel(false);
    setPrice(200);
  }

  function isOnline() {
    setType('online');
    setPrice(priceOn);
    setIncludesHotel('');
  }

  function sendData() {
    const data = {
      isRemote: type,
      includesHotel,
      price,
    };
    navigate('*', data);
  }

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
        <OptionBox onClick={() => isOnline()} style={{ 'background-color': type === 'online' ? '#FFEED2' : 'white' }}>
          <h1>Online</h1>
          <h2>R${priceOn}</h2>
        </OptionBox>
      </Row>

      {type !== 'online' ? '' :
        <Column>
          <StyledTypography variant="h6" style={{ 'color': '#8E8E8E', 'font-weight': '400', 'margin-top': '32px' }}>
            Fechado! O price ficou em <span style={{ 'font-weight': '500' }}>R$ {priceOn}.</span> Agora é só confirmar:
          </StyledTypography>
          <ReserveButton>
            RESERVAR INGRESSO
          </ReserveButton>
        </Column>
      }

      {type === 'presencial' ?
        <>
          <StyledTypography variant="h6" style={{ 'color': '#8E8E8E', 'font-weight': '400', 'margin-top': '32px' }}>Ótimo! Agora escolha sua modalidade de hospedagem</StyledTypography>
          <Row>
            <OptionBox onClick={() => withoutHotel()} style={{ 'background-color': includesHotel === false ? '#FFEED2' : 'white' }}>
              <h1>Sem hotel</h1>
              <h2 className='price'> R$50,00</h2>
            </OptionBox>
            <OptionBox onClick={() => withHotel()} style={{ 'background-color': includesHotel === true ? '#FFEED2' : 'white' }}>
              <h1>Com hotel</h1>
              <h2 className='price'> R$250,00</h2>
            </OptionBox>
          </Row>
        </>
        : ''
      }

      {includesHotel !== '' ?
        <>
          <StyledTypography variant="h6" style={{ 'color': '#8E8E8E', 'font-weight': '400', 'margin-top': '32px' }}>
            Fechado! O total ficou em <span style={{ 'font-weight': '500' }}>R${price},00</span> .Agora é só confirmar:
          </StyledTypography>
          <ReserveButton onClick={() => sendData()}>RESERVAR INGRESSO</ReserveButton>
        </>
        : ''
      }

    </>
  );
}
