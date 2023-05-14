import { useState } from 'react';
import styled from 'styled-components';
import Cards from 'react-credit-cards-2';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import Input from '../Form/Input';

import 'react-credit-cards-2/dist/es/styles-compiled.css';

export default function CheckoutPayment() {
  const [creditCardInfos, setCreditCardInfos] = useState({
    number: '',
    expiry: '',
    cvc: '',
    name: '',
  });

  function fillInfo(event) {
    const { name, value } = event.target;

    setCreditCardInfos((infos) => ({ ...infos, [name]: value }));
  }

  return (
    <>
      <StyledTypography variant="h4">Ingresso e Pagamento</StyledTypography>
      <TicketBox>
        <Text size="20px" color="#8E8E8E">
          Ingresso escolhido
        </Text>
        <TicketSelectedBox>
          <Text size="16px" color="#454545">
            Presencial + Com Hotel
          </Text>
          <Text size="14px" color="#898989">
            R$ 600
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
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px !important;
`;

const TicketBox = styled(Box)`
  margin-top: 30px;
`;

const Text = styled.p`
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: ${(props) => props.size};
  color: ${(props) => props.color};
`;

const TicketSelectedBox = styled(Box)`
  margin-top: 30px;
  width: fit-content;
  padding: 34px 66px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  background-color: #ffeed2;
  border-radius: 20px;
`;

const PaymentBox = styled(Box)`
  margin-top: 30px;
`;

const CreditCardBox = styled(Box)`
  margin-top: 40px;
  width: fit-content;
  display: flex;
  gap: 3vw;
`;

const CreditCardForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const CreditCardFlexBox = styled(Box)`
  display: flex;
  gap: 10px;
`;

const CreditCardFormButton = styled.button`
  border: none;
  margin-top: 40px;
  text-transform: uppercase;
  padding: 15px 30px;
  cursor: pointer;
`;
