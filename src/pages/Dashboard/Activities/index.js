import { SubTitles, Title } from '../../../components/Hotel/HotelStyle';
import { DaysBox, ReserveButton } from '../../../components/Dashboard/Payments';
import { useEffect, useState } from 'react';
import ticketApi from '../../../services/ticketApi';
import { ActivitiesDataContainer, ContainerAlert, ActivitiesPerDayContainer } from '../../../components/Dashboard/Activities';
import useToken from '../../../hooks/useToken';
import activityApi from '../../../services/activitiesApi';
import DayButton from '../../../components/Activities/DayButton';

export default function Activities() {
  const token = useToken();
  const [isPaid, setIsPaid] = useState(true);

  async function getActivities() {
    try {
      const activitiesData = await activityApi.getActivities(token);
      setActivities(activitiesData);
    } catch (error) {
      console.log(error.message);
    }
  };

  function handleClickOnDay(index) {
    setSelectedDay(index);
  };

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
      {!isPaid ? '' : <>
        <SubTitles style={{ color: '#8e8e8e', 'margin-top': '20px', 'font-size': '20px' }}>Primeiro, filtre pelo dia do evento: </SubTitles>
        <DaysBox>
          {activities.map((item, index) => (
            <DayButton item={item} index={index} selectedDay={selectedDay} handleClickOnDay={handleClickOnDay} />
          ))}
        </DaysBox>
      </>
      }
    </>
  );
}

