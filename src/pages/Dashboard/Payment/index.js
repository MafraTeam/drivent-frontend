import { useState } from 'react';
import { Container, Options, Option, Button } from '../../../components/Dashboard/Payments';

export default function Payment() {
  const [total, setTotal] = useState(0);
  return (<>
    <Container>
      <h1> Ingressos e Pagamento</h1>
      <h2>Primeiro, escolha a modalidade de ingresso</h2>
      <Options>
        <Option>
          <p>Presencial</p>
          <p className='price'> R$XXXX,00</p>
        </Option>
        <Option>
          <p>Online</p>
          <p className='price'> R$XXXX,00</p>
        </Option>
      </Options>
      <h2>Ótimo! Agora escolha sua modalidade de hospedagem</h2>
      <Options>
        <Option>
          <p>Sem hotel</p>
          <p className='price'> R$XXXX,00</p>
        </Option>
        <Option>
          <p>Com hotel</p>
          <p className='price'> R$XXXX,00</p>
        </Option>
      </Options>
      <h2>Fechado! O total ficou em ${total}. Agora é só confirmar!</h2>
      
      <Button><p>RESERVAR INGRESSO</p></Button>
    </Container>
  </>);
}
