import styled from 'styled-components';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

export const Button = styled.button`
  background-color: #e0e0e0;
  height: 60px;
  width: 200px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  border: none;
  margin-top: 10px;
  p {
    color: #000000;
    font-size: 16px;
    line-height: 20px;
    font-weight: 700;
  }
`;

export const Row = styled.div`
  display: flex;
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledTypography = styled(Typography)`
  margin-bottom: 20px !important;
`;

export const ReserveButton = styled.div`
  width: 162px;
  height: 37px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #e0e0e0;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  font-family: 'Roboto';
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  text-align: center;
  color: #000000;
  cursor: pointer;
`;

export const WithoutEnrollment = styled.div`
  height: calc(100% - 40px);
  display: flex;
  align-items: center;
  justify-content: center;
  p {
    height: 46px;
    width: 388px;
    text-align: center;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
    color: #8e8e8e;
  }
`;

export const TicketBox = styled(Box)`
  margin-top: 30px;
`;

export const Text = styled.p`
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: ${(props) => props.size};
  color: ${(props) => props.color};
`;

export const TicketSelectedBox = styled(Box)`
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

export const PaymentBox = styled(Box)`
  margin-top: 30px;
`;

export const CreditCardBox = styled(Box)`
  margin-top: 40px;
  width: fit-content;
  display: flex;
  gap: 3vw;
`;

export const CreditCardForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const CreditCardFlexBox = styled(Box)`
  display: flex;
  gap: 10px;
`;

export const CreditCardFormButton = styled.button`
  border: none;
  margin-top: 40px;
  text-transform: uppercase;
  padding: 15px 30px;
  cursor: pointer;
`;
