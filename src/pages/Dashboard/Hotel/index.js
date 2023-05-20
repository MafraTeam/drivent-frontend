import styled from 'styled-components';
import { useEffect, useState } from 'react';
import useToken from '../../../hooks/useToken';
import { Typography } from '@material-ui/core';
import Room from '../../../components/Room/Room';
import hotelApi from '../../../services/hotelsApi';
import ticketApi from '../../../services/ticketApi';
import HotelCard from '../../../components/Hotel/HotelCard';

export default function Hotel() {
  const [ticket, setTicket] = useState();
  const [hotels, setHotels] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(0);
  const [rooms, setRooms] = useState([]);
  const [fullRooms, setFullRooms] = useState([]);
  const token = useToken();
  const [selectedRoom, setSelectedRoom] = useState('');

  async function getTicket() {
    try {
      const ticketData = await ticketApi.getTicket(token);
      setTicket(ticketData);
    } catch (error) {
      console.log(error.message);
    }
  }

  async function getHotels() {
    try {
      const hotelsData = await hotelApi.getHotels(token);
      setHotels(hotelsData);
    } catch (error) {
      console.log(error.message);
    }
  }

  function checkCapacity() {
    const newList = [];
    for (let i = 0; i < rooms.length; i++) {
      if (rooms[i].capacity === rooms[i].takenPlaces) {
        newList.push(rooms[i].id);
      }
    }
    setFullRooms(newList);
  }

  async function selectHotel(id) {
    try {
      const RoomData = await hotelApi.getHotelRooms(token, id);
      setSelectedHotel(id);
      setRooms(RoomData);
      console.log(RoomData);
    } catch (error) {
      console.log(error.message);
    }
  }

  function handleClickOnRoom(roomIndex) {
    setSelectedRoom(roomIndex);
  }

  useEffect(() => {
    checkCapacity();
    getTicket();
    getHotels();
  }, [rooms, selectedRoom]);

  return (
    <>
      <Title>Escolha de hotel e Quarto</Title>
      {ticket?.status !== 'PAID' && (
        <ContainerAlert>
          <h2>Você precisa ter confirmado pagamento antes de fazer a escolha de hospedagem</h2>
        </ContainerAlert>
      )}
      {!ticket?.TicketType?.includesHotel && (
        <ContainerAlert>
          <h2>Sua modalidade de ingresso não inclui hospedagem. Prossiga para a escolha de atividades</h2>
        </ContainerAlert>
      )}
      {
        <>
          <SubTitles>Primeiro, escolha seu hotel</SubTitles>
          <ContainerHotels>
            {hotels?.map((hotel, index) => (
              <HotelCard hotel={hotel} key={index} selectHotel={selectHotel} selectedHotel={selectedHotel} />
            ))}
          </ContainerHotels>
        </>
      }
      {selectedHotel !== 0 && (
        <RoomsContainer>
          <SubTitles>Ótima pedida! Agora escolha seu quarto</SubTitles>
          <RoomsStyled>
            {rooms?.map((room, index) => (
              <Room room={room} key={index} fullRooms={fullRooms} index={index} handleClickOnRoom={handleClickOnRoom} selectedRoom={selectedRoom}/>
            ))}
          </RoomsStyled>
        </RoomsContainer>
      )}
    </>
  );
}

const SubTitles = styled(Typography)`
  margin-bottom: 20px !important;
`;

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

const RoomsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 52px;
`;

const RoomsStyled = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 32px;
  gap: 17px;
`;
