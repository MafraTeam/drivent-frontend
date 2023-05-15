import { useState } from 'react';
import Cards from 'react-credit-cards-2';
import { OptionBox } from '../../../layouts/OptionBox.js';
import {
  Column,
  CreditCardBox,
  CreditCardFlexBox,
  CreditCardForm,
  CreditCardFormButton,
  PaymentBox,
  ReserveButton,
  Row,
  StyledTypography,
  Text,
  TicketBox,
  TicketSelectedBox,
  WithoutEnrollment,
} from '../../../components/Dashboard/Payments';
import useEnrollment from '../../../hooks/api/useEnrollment.js';
import Input from '../../../components/Form/Input.js';

export default function Payment() {
  const [type, setType] = useState('');
  const [includesHotel, setIncludesHotel] = useState('');
  const [price, setPrice] = useState(0);
  const [isInPayment, setIsInPayment] = useState(false);
  const [creditCardInfos, setCreditCardInfos] = useState({
    number: '',
    expiry: '',
    cvc: '',
    name: '',
  });

  const { enrollment } = useEnrollment();

  const pricePr = 150;
  const priceOn = 50;

  function withHotel() {
    setIncludesHotel(true);
    setPrice(400);
  }

  function withoutHotel() {
    setIncludesHotel(false);
    setPrice(200);
  }

  function isOnline() {
    setType('Online');
    setPrice(priceOn);
    setIncludesHotel('');
  }

  function fillInfo(event) {
    const { name, value } = event.target;

    setCreditCardInfos((infos) => ({ ...infos, [name]: value }));
  }

  if (!enrollment) {
    return (
      <>
        <StyledTypography>Ingresso e Pagamento</StyledTypography>
        <WithoutEnrollment>
          <p>Você precisa completar sua inscrição antes de prosseguir pra escolha de ingresso</p>
        </WithoutEnrollment>
      </>
    );
  }

  return (
    <>
      <StyledTypography variant="h4">Ingresso e pagamento</StyledTypography>
      {!isInPayment && (
        <>
          <StyledTypography variant="h6" style={{ color: '#8E8E8E', 'font-weight': '400', 'margin-top': '32px' }}>
            Primeiro, escolha sua modalidade de ingresso
          </StyledTypography>

          <Row>
            <OptionBox
              onClick={() => setType('Presencial')}
              style={{ 'background-color': type === 'Presencial' ? '#FFEED2' : 'white' }}
            >
              <h1>Presencial</h1>
              <h2>R${pricePr}</h2>
            </OptionBox>
            <OptionBox
              onClick={() => isOnline()}
              style={{ 'background-color': type === 'Online' ? '#FFEED2' : 'white' }}
            >
              <h1>Online</h1>
              <h2>R${priceOn}</h2>
            </OptionBox>
          </Row>

          {type !== 'Online' ? (
            ''
          ) : (
            <Column>
              <StyledTypography variant="h6" style={{ color: '#8E8E8E', 'font-weight': '400', 'margin-top': '32px' }}>
                Fechado! O price ficou em <span style={{ 'font-weight': '500' }}>R$ {priceOn}.</span> Agora é só
                confirmar:
              </StyledTypography>
              <ReserveButton onClick={() => setIsInPayment(true)}>RESERVAR INGRESSO</ReserveButton>
            </Column>
          )}

          {type === 'Presencial' ? (
            <>
              <StyledTypography variant="h6" style={{ color: '#8E8E8E', 'font-weight': '400', 'margin-top': '32px' }}>
                Ótimo! Agora escolha sua modalidade de hospedagem
              </StyledTypography>
              <Row>
                <OptionBox
                  onClick={() => withoutHotel()}
                  style={{ 'background-color': includesHotel === false ? '#FFEED2' : 'white' }}
                >
                  <h1>Sem hotel</h1>
                  <h2 className="price"> R$50,00</h2>
                </OptionBox>
                <OptionBox
                  onClick={() => withHotel()}
                  style={{ 'background-color': includesHotel === true ? '#FFEED2' : 'white' }}
                >
                  <h1>Com hotel</h1>
                  <h2 className="price"> R$250,00</h2>
                </OptionBox>
              </Row>
            </>
          ) : (
            ''
          )}

          {includesHotel !== '' ? (
            <>
              <StyledTypography variant="h6" style={{ color: '#8E8E8E', 'font-weight': '400', 'margin-top': '32px' }}>
                Fechado! O total ficou em <span style={{ 'font-weight': '500' }}>R${price},00</span> .Agora é só
                confirmar:
              </StyledTypography>
              <ReserveButton onClick={() => setIsInPayment(true)}>RESERVAR INGRESSO</ReserveButton>
            </>
          ) : (
            ''
          )}
        </>
      )}
      {isInPayment && (
        <>
          <TicketBox>
            <Text size="20px" color="#8E8E8E">
              Ingresso escolhido
            </Text>
            <TicketSelectedBox>
              <Text size="16px" color="#454545">
                {type === 'Online' ? type : `${type} (${includesHotel ? 'Com Hotel' : 'Sem Hotel'})`}
              </Text>
              <Text size="14px" color="#898989">
                R$ {price}
              </Text>
            </TicketSelectedBox>
          </TicketBox>
          <PaymentBox>
            <Text size="20px" color="#8E8E8E">
              Pagamento
            </Text>
            <CreditCardBox>
              <Cards
                number={creditCardInfos.number}
                expiry={creditCardInfos.expiry}
                cvc={creditCardInfos.cvc}
                name={creditCardInfos.name}
              />
              <CreditCardForm>
                <Input
                  mask="9999 9999 9999 9999"
                  value={creditCardInfos?.number || ''}
                  onChange={fillInfo}
                  type="text"
                  maxLength="16"
                  name="number"
                  label="Número do Cartão"
                  helperText="E.g.: 49...,51,,,,36...,97..."
                  variant="outlined"
                />
                <Input
                  value={creditCardInfos?.name || ''}
                  onChange={fillInfo}
                  type="text"
                  name="name"
                  label="Nome"
                  variant="outlined"
                />
                <CreditCardFlexBox>
                  <Input
                    mask="99/99"
                    value={creditCardInfos?.expiry || ''}
                    onChange={fillInfo}
                    type="text"
                    maxLength="4"
                    name="expiry"
                    label="Validade"
                    variant="outlined"
                  />
                  <Input
                    mask="999"
                    value={creditCardInfos?.cvc || ''}
                    onChange={fillInfo}
                    type="text"
                    maxLength="3"
                    name="cvc"
                    label="CVV"
                    variant="outlined"
                  />
                </CreditCardFlexBox>
              </CreditCardForm>
            </CreditCardBox>
            <CreditCardFormButton>
              <Text size="14px" color="#000000">
                Finalizar Pagamento
              </Text>
            </CreditCardFormButton>
          </PaymentBox>
        </>
      )}
    </>
  );
}
