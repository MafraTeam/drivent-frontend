import { SubTitles, Title } from '../../../components/Hotel/HotelStyle';
import { useEffect, useState } from 'react';
import ticketApi from '../../../services/ticketApi';
import { ContainerAlert } from '../../../components/Dashboard/Activities';
import useToken from '../../../hooks/useToken';

export default function Activities() {
  const token = useToken();
  const [isPaid, setIsPaid] = useState(true);
  const [ticket, setTicket] = useState();

  async function getTicket() {
    try {
      const ticketData = await ticketApi.getTicket(token);
      setTicket(ticketData);
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    getTicket();
  }, []);

  return (
    <>
      {!isPaid ? '' : <>
        <Title>Escolha de atividades</Title>
      </>
      }
      {ticket?.status !== 'PAID' && (
        <ContainerAlert>
          <h2>Você precisa ter confirmado pagamento antes de fazer a escolha das atividades</h2>
        </ContainerAlert>
      )}
      {(ticket?.status === 'PAID' && !ticket?.TicketType?.isRemote) && (
        <ContainerAlert>
          <h2>Sua modalidade de ingresso não necessita escolher atividades. Você terá acesso a todas as atividades.</h2>
        </ContainerAlert>
      )}
      {!isPaid ? '' : <>
        <SubTitles style={{ color: '#8e8e8e', 'margin-top': '20px', 'font-size': '20px' }}>Primeiro, filtre pelo dia do evento: </SubTitles>
      </>
      }
    </>
  );
}
