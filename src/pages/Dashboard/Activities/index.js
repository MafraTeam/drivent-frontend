import { useState } from 'react';
import styled from 'styled-components';
import { SubTitles, Title } from '../../../components/Hotel/HotelStyle';
import { DaysBox, ReserveButton } from '../../../components/Dashboard/Payments';

export default function Activities() {
  const [isPaid, setIsPaid] = useState(true);
  const [actiDates, setActiDates] = useState([  //mock
    { d: '01', m: '07' },
    { d: '01', m: '07' },
    { d: '02', m: '07' },
    { d: '03', m: '07' }
  ]);

  return (
    <>
      {!isPaid ? '' : <>
        <Title>Escolha de atividades</Title>
        <SubTitles style={{ color: '#8e8e8e', 'margin-top': '20px', 'font-size': '20px' }}>Primeiro, filtre pelo dia do evento: </SubTitles>
        <DaysBox>
          {actiDates.map((item, index) => (
            <ReserveButton> Sexta</ReserveButton>

          ))}

        </DaysBox>
      </>
      }
    </>
  );
}

