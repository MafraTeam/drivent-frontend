import axios from 'axios';
import { useState, useEffect } from 'react';
import Cards from 'react-credit-cards-2';
import { OptionBox } from '../../../layouts/OptionBox.js';
import {
  Column,
  ConfirmationBox,
  ConfirmationIcon,
  ConfirmationTextBox,
  CreditCardBox,
  CreditCardFlexBox,
  CreditCardForm,
  CreditCardFormButton,
  PayedBox,
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
import useToken from '../../../hooks/useToken.js';

import 'react-credit-cards-2/dist/es/styles-compiled.css';

export default function Payment() {
  const [userTicket, setUserTicket] = useState({});
  const [type, setType] = useState('');
  const [includesHotel, setIncludesHotel] = useState('');
  const [price, setPrice] = useState(0);
  const [isInPayment, setIsInPayment] = useState(false);
  const [isPayed, setIsPayed] = useState(false);
  const [creditCardInfos, setCreditCardInfos] = useState({
    number: '',
    expiry: '',
    cvc: '',
    name: '',
  });

  const { enrollment } = useEnrollment();
  const token = useToken();

  const pricePr = 150;
  const priceOn = 50;

  function withHotel() {
    setIncludesHotel(true);
    setPrice(400);
  }

  function withoutHotel() {
    setIncludesHotel(false);
    setPrice(150);
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

  async function getTicket() {
    try {
      const ticket = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/tickets`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserTicket(ticket.data);
      setIsInPayment(true);
      if (ticket.data.status === 'RESERVED') setIsPayed(false);
      else setIsPayed(true);
    } catch (error) {
      if (error.response.status === 404 && error.response.data.message === 'No result for this search!') {
        setUserTicket({});
        setIsInPayment(false);
      } else {
        alert('Erro ao obter ticket do usuário.');
      }
    }
  }

  async function createTicket() {
    try {
      const ticketTypes = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/tickets/types`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const ticketTypeId = ticketTypes.data.filter((ticketType) =>
        type === 'Online'
          ? ticketType.isRemote
          : includesHotel
            ? !ticketType.isRemote && ticketType.includesHotel
            : !ticketType.isRemote && !ticketType.includesHotel
      );
      const createTicket = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/tickets`,
        {
          ticketTypeId: ticketTypeId[0].id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUserTicket(createTicket.data);
      setIsInPayment(true);
    } catch (error) {
      alert('Erro ao criar ticket.');
    }
  }

  async function buyTicket() {
    if (/^[0-9]{4} [0-9]{4} [0-9]{4} [0-9]{4}$/.test(creditCardInfos.number)) {
      if (creditCardInfos.name && creditCardInfos.name.length >= 6) {
        if (/^[0-9]{2}\/[0-9]{2}$/.test(creditCardInfos.expiry)) {
          if (/^[0-9]{3}$/.test(creditCardInfos.cvc)) {
            try {
              await axios.post(
                `${process.env.REACT_APP_API_BASE_URL}/payments/process`,
                {
                  ticketId: userTicket.id,
                  cardData: {
                    issuer: creditCardInfos.name,
                    number: creditCardInfos.number,
                    name: creditCardInfos.name,
                    expirationDate: creditCardInfos.expiry,
                    cvv: creditCardInfos.cvc,
                  },
                },
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );
              setIsPayed(true);
            } catch (error) {
              alert('Erro ao realizar compra - Tente novamente mais tarde!');
            }
          } else {
            alert('Preencha todas as informações corretamente antes de continuar.');
          }
        } else {
          alert('Preencha todas as informações corretamente antes de continuar.');
        }
      } else {
        alert('Preencha todas as informações corretamente antes de continuar.');
      }
    } else {
      alert('Preencha todas as informações corretamente antes de continuar.');
    }
  }

  useEffect(() => {
    getTicket();
  }, []);

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
              <ReserveButton onClick={() => createTicket()}>RESERVAR INGRESSO</ReserveButton>
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
                  <h2 className="price"> R$0,00</h2>
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
              <ReserveButton onClick={() => createTicket()}>RESERVAR INGRESSO</ReserveButton>
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
                {userTicket['TicketType'].name}
              </Text>
              <Text size="14px" color="#898989">
                R$ {userTicket['TicketType'].price}
              </Text>
            </TicketSelectedBox>
          </TicketBox>
          {!isPayed && (
            <>
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
                  <Text size="14px" color="#000000" onClick={() => buyTicket()}>
                    Finalizar Pagamento
                  </Text>
                </CreditCardFormButton>
              </PaymentBox>
            </>
          )}
          {isPayed && (
            <>
              <PayedBox>
                <Text size="20px" color="#8E8E8E">
                  Pagamento
                </Text>
                <ConfirmationBox>
                  <ConfirmationIcon />
                  <ConfirmationTextBox>
                    <Text size="16px" color="#454545" weight={700}>
                      Pagamento confirmado!
                    </Text>
                    <Text size="16px" color="#454545">
                      Prossiga para escolha de hospedagem e atividades.
                    </Text>
                  </ConfirmationTextBox>
                </ConfirmationBox>
              </PayedBox>
            </>
          )}
        </>
      )}
    </>
  );
}
