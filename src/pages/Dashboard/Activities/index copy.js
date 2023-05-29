import { SubTitles, Title } from '../../../components/Hotel/HotelStyle';
import { useEffect, useState } from 'react';
import ticketApi from '../../../services/ticketApi';
import { ActivitiesDataContainer, ContainerAlert, ActivitiesPerDayContainer } from '../../../components/Dashboard/Activities';
import useToken from '../../../hooks/useToken';
import activitiesApi from '../../../services/activitiesApi';
import ActivitiesPerDay from '../../../components/Dashboard/Activities/activitiesDay';
import ActivitiesSelector from '../../../components/Dashboard/Activities/activitiesSelector';

export default function Activities() {
  const token = useToken();
  const [ticket, setTicket] = useState();
  const [activities, setActivities] = useState();
  const [selectedDay, setSelectedDay] = useState();
  const [activitiesDay, setActivitiesDay] = useState();

  async function getTicket() {
    try {
      const ticketData = await ticketApi.getTicket(token);
      setTicket(ticketData);
      console.log(ticketData);
    } catch (error) {
      console.log(error.message);
    }
  }

  async function getActivities() {
    try {
      const activitiesData = await activitiesApi.getAllActivities(token);
      setActivities(activitiesData);
      console.log(activitiesData);
    } catch (error) {
      console.log(error.message);
    }
  }

  async function getActivitiesPerDay(day) {
    try {
      const activitiesPerDayData = await activitiesApi.getAllActivitiesPerDay(day, token);
      setActivitiesDay(activitiesPerDayData);
      console.log(activitiesPerDayData)
    } catch (error) {
      console.log(error.message)
    }
  }

  function toggleSelectedDay(index, day) {
    setSelectedDay(index);
    getActivitiesPerDay(day);
  }

  useEffect(() => {
    getTicket();
    getActivities();
  }, []);

  return (
    <>
      <Title>Escolha de atividades</Title>
      {ticket?.status !== 'PAID' && (
        <ContainerAlert>
          <h2>Você precisa ter confirmado pagamento antes de fazer a escolha das atividades</h2>
        </ContainerAlert>
      )}
      {ticket?.status === 'PAID' && ticket?.TicketType?.isRemote && (
        <ContainerAlert>
          <h2>Sua modalidade de ingresso não necessita escolher atividades. Você terá acesso a todas as atividades.</h2>
        </ContainerAlert>
      )}
      {ticket?.status === 'PAID' && !ticket?.TicketType?.isRemote && (
        <>
          <SubTitles style={{ color: '#8e8e8e', 'margin-top': '20px', 'font-size': '20px' }}>
            Primeiro, filtre pelo dia do evento:{' '}
          </SubTitles>
          <ActivitiesDataContainer>
            {activities?.map((activities, index) => (
              <ActivitiesSelector
                key={index}
                id={index}
                selectedDay={selectedDay}
                text={activities.dataFormatada?.replace('-', '/').slice(0, -5)}
                day={activities.dataFormatada?.split(", ")[1]}
                setSelectedDay={setSelectedDay}
                toggleSelectedDay={toggleSelectedDay}
              />
            ))}
          </ActivitiesDataContainer>
        </>
      )}
      {ticket?.status === 'PAID' && !ticket?.TicketType?.isRemote && activitiesDay && (
        <ActivitiesPerDayContainer>
          {/* <ActivitiesPerDay /> */}
          {activitiesDay?.map((activities, index) => (
            <ActivitiesPerDay key={index} activities={activities}/>
          ))}
        </ActivitiesPerDayContainer>
      )}
    </>
  );
}
