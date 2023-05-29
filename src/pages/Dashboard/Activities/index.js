import { SubTitles, Title } from '../../../components/Hotel/HotelStyle';
import { DaysBox } from '../../../components/Dashboard/Payments';
import { useEffect, useState } from 'react';
import ticketApi from '../../../services/ticketApi';
import { ContainerAlert, ActivitiesPerDayContainer } from '../../../components/Dashboard/Activities/style';
import ActivitiesPerDay from '../../../components/Dashboard/Activities/activitiesDay';
import useToken from '../../../hooks/useToken';
import activityApi from '../../../services/activitiesApi';
import DayButton from '../../../components/Activities/DayButton';

export default function Activities() {
  const token = useToken();
  const [ticket, setTicket] = useState();
  const [activities, setActivities] = useState();
  const [selectedDay, setSelectedDay] = useState();
  const [activitiesDay, setActivitiesDay] = useState();
  const [madeEnroll, setMadeEnroll] = useState(false);

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
      const activitiesData = await activityApi.getActivities(token);
      setActivities(activitiesData);
      console.log(activitiesData);
    } catch (error) {
      console.log(error.message);
    }
  }

  async function getActivitiesPerDay(day) {
    try {
      const activitiesPerDayData = await activityApi.getAllActivitiesPerDay(day, token);
      setActivitiesDay(activitiesPerDayData);
      console.log(activitiesPerDayData);
    } catch (error) {
      console.log(error.message);
    }
  }

  function handleClickOnDay(index, day) {
    setSelectedDay(index);
    getActivitiesPerDay(day);
    setMadeEnroll(false);
  }

  async function subscribedToActivity(activityId) {
    try {
      const activityEnrollData = await activityApi.enrollOnActivity(activityId, token);
      console.log(activityEnrollData);
      setMadeEnroll(true);
      setSelectedDay();
    } catch (error) {
      console.log(error.message);
    }
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
          <DaysBox>
            {activities?.map((item, index) => (
              <DayButton
                key={index}
                item={item}
                index={index}
                selectedDay={selectedDay}
                handleClickOnDay={handleClickOnDay}
              />
            ))}
          </DaysBox>
        </>
      )}
      {ticket?.status === 'PAID' &&
        !ticket?.TicketType?.isRemote &&
        (selectedDay === 0 || selectedDay) &&
        activitiesDay && (
          <ActivitiesPerDayContainer>
            {activitiesDay?.map((activities, index) => (
              <ActivitiesPerDay key={index} activities={activities} subscribedToActivity={subscribedToActivity} />
            ))}
          </ActivitiesPerDayContainer>
        )}
      {madeEnroll && (
        <ContainerAlert>
          <h2>Parabéns. Você escolheu uma atividade, escolha outra ou vá para o certificado</h2>
        </ContainerAlert>
      )}
    </>
  );
}
