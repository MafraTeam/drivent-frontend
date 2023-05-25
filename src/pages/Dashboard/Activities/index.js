import { useState } from 'react';
import { SubTitles, Title } from '../../../components/Hotel/HotelStyle';

export default function Activities() {
  const [isPaid, setIsPaid] = useState(true);

  return (
    <>
      {!isPaid ? '' : <>
        <Title>Escolha de atividades</Title>
        <SubTitles style={{ color: '#8e8e8e', 'margin-top': '20px', 'font-size': '20px' }}>Primeiro, filtre pelo dia do evento: </SubTitles>
      </>
      }
    </>
  );
}
