import { useEffect, useState } from 'react';
import styled from 'styled-components';
import useToken from '../../../hooks/useToken';
import axios from 'axios';
import HotelCard from '../../../components/Hotel/HotelCard';

export default function Hotel() {
  const [teste, setTeste] = useState(false);
  const token = useToken();

  const arrayHoteisTeste = [
    {
      id: 1,
      name: 'Driven Resort',
      image: 'https://img.freepik.com/fotos-gratis/salao-de-beleza-spa-com-vista-para-a-praia_53876-31335.jpg',
      createdAt: '2023-05-14T05:22:25.397Z',
      updatedAt: '2023-05-14T05:22:25.399Z',
    },
    {
      id: 2,
      name: 'Driven Palace',
      image:
        'https://img.freepik.com/fotos-gratis/tipo-complexo-de-entretenimento-o-popular-resort-com-piscinas-e-parques-aquaticos-na-turquia-hotel-de-luxo-recorrer_146671-18827.jpg',
      createdAt: '2023-05-14T05:22:25.408Z',
      updatedAt: '2023-05-14T05:22:25.409Z',
    },
    {
      id: 3,
      name: 'Driven World',
      image: 'https://img.freepik.com/fotos-gratis/viagens-maritimas-moderno-ninguem-infinito_1203-4520.jpg',
      createdAt: '2023-05-14T05:22:25.415Z',
      updatedAt: '2023-05-14T05:22:25.417Z',
    },
  ];

  async function getHotels() {
    try {
      const promise = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/hotels`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(promise.data);
    } catch (error) {
      console.log(error.message);
    }
  }

  // useEffect(() => {
  //   getHotels();
  // }, []);

  return (
    <>
      <Title>Escolha de hotel e Quarto</Title>
      {/* {teste ? (
        <ContainerAlert>
          <h2>Sua modalidade de ingresso não inclui hospedagem. Prossiga para a escolha de atividades</h2>
        </ContainerAlert>
      ) : (
        <ContainerAlert>
          <h2>Você precisa ter confirmado pagamento antes de fazer a escolha de hospedagem</h2>
        </ContainerAlert>
      )} */}
      <ContainerHotels>
        {arrayHoteisTeste.map((hotel) => (
          <HotelCard hotel={hotel} />
        ))}
      </ContainerHotels>
    </>
  );
}

const Title = styled.h1`
  font-style: normal;
  font-weight: 400;
  font-size: 34px;
  line-height: 40px;
  color: #000000;
`;

const ContainerAlert = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  h2 {
    width: 600px;
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
    text-align: center;
    color: #8e8e8e;
  }
`;

const ContainerHotels = styled.div`
  display: flex;
  width: 860px;
  flex-wrap: wrap;
  align-items: center;
`;
