import styled from 'styled-components';
import { IoEnterOutline } from 'react-icons/io5';
import { AiOutlineCloseCircle, AiOutlineCheckCircle } from 'react-icons/ai';

export default function ActivitiesPerDay({ activities }) {
  const { id, startDate, finishDate, eventName, localName, vacancies, isSubscribed, subscribed } = activities;

  const dataInicio = new Date(startDate);
  const horaFormatadaInicio = dataInicio.getHours().toString().padStart(2, '0');
  const minutoFormatadoInicio = dataInicio.getMinutes().toString().padStart(2, '0');
  const horarioInicio = `${horaFormatadaInicio}:${minutoFormatadoInicio}`;

  const dataFinal = new Date(finishDate);
  const horaFormatadaFinal = dataFinal.getHours().toString().padStart(2, '0');
  const minutoFormatadoFinal = dataFinal.getMinutes().toString().padStart(2, '0');
  const horarioFinal = `${horaFormatadaFinal}:${minutoFormatadoFinal}`;

  const vagas = vacancies - subscribed;
  const diffMinutes = Math.round((dataFinal - dataInicio) / 60000);

  function minutosAltura(minutos) {
    const alturaMinuto = 80 / 60;
    const altura = minutos * alturaMinuto;
    return altura;
  }

  return (
    <>
      <ActivitiesPerDayStyled>
        <div>
          <h1>{localName}</h1>
        </div>
        <ActivitiesContainer isSubscribed={isSubscribed} diffMinutes={diffMinutes} minutosAltura={minutosAltura}>
          <ActivitiesContainerDiv>
            <h2>{eventName}</h2>
            <h3>
              {horarioInicio} - {horarioFinal}
            </h3>
          </ActivitiesContainerDiv>
          <VacanciesContainer isSubscribed={isSubscribed} vagas={vagas} diffMinutes={diffMinutes} minutosAltura={minutosAltura}>
            {isSubscribed ? (
              <>
                <Subscribed />
                <p>Inscrito</p>
              </>
            ) : vagas !== 0 ? (
              <>
                <Vacancies />
                <p>{vagas} vagas</p>
              </>
            ) : (
              <>
                <NoVacancies />
                <p>Esgotado</p>
              </>
            )}
          </VacanciesContainer>
        </ActivitiesContainer>
      </ActivitiesPerDayStyled>
    </>
  );
}

const ActivitiesPerDayStyled = styled.div`
  width: 288px;
  height: 392px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 60px;
  border: 1px solid #d7d7d7;
  div {
    margin-bottom: 13px;
  }
  h1 {
    font-style: normal;
    font-weight: 400;
    font-size: 17px;
    line-height: 20px;
    text-align: center;
    color: #7b7b7b;
    margin-top: 13px;
  }
`;

const ActivitiesContainer = styled.div`
  width: 265px;
  height: ${({ minutosAltura, diffMinutes }) => minutosAltura(diffMinutes)}px;
  background-color: ${(props) => (props.isSubscribed ? '#d0ffdb' : '#f1f1f1')};
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  h2 {
    font-style: normal;
    font-weight: 700;
    font-size: 12px;
    line-height: 14px;
    margin-top: 12px;
    margin-left: 10px;
  }
  h3 {
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
    margin-top: 6px;
    margin-left: 10px;
  }
`;

const ActivitiesContainerDiv = styled.div`
  width: 199px;
`;

const VacanciesContainer = styled.div`
  height: ${({ minutosAltura, diffMinutes }) => minutosAltura(diffMinutes)}px;
  width: 66px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: 18px;
  border-left: 1px solid #d7d7d7;
  p {
    font-style: normal;
    font-weight: 400;
    font-size: 9px;
    line-height: 11px;
    color: ${(props) => (props.isSubscribed || props.vagas !== 0 ? '#078632' : '#ed2939')};
  }
`;

const Vacancies = styled(IoEnterOutline)`
  color: #078632;
  width: 20px;
  height: 20px;
`;

const NoVacancies = styled(AiOutlineCloseCircle)`
  color: #ed2939;
  width: 20px;
  height: 20px;
`;

const Subscribed = styled(AiOutlineCheckCircle)`
  color: #078632;
  width: 20px;
  height: 20px;
`;
