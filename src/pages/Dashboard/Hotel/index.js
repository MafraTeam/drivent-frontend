import { useEffect, useState } from 'react';
import useToken from '../../../hooks/useToken';
import Room from '../../../components/Room/Room';
import hotelApi from '../../../services/hotelsApi';
import ticketApi from '../../../services/ticketApi';
import HotelCard from '../../../components/Hotel/HotelCard';
import { ReserveButton } from '../../../components/Dashboard/Payments';
import {
  SubTitles,
  Title,
  ContainerAlert,
  ContainerHotels,
  RoomsContainer,
  RoomsStyled,
} from '../../../components/Hotel/HotelStyle';
import { HotelCardStyled } from '../../../components/Hotel/HotelCard';

export default function Hotel() {
  const [ticket, setTicket] = useState();
  const [hotels, setHotels] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(0);
  const [rooms, setRooms] = useState([]);
  const [fullRooms, setFullRooms] = useState([]);
  const token = useToken();
  const [selectedRoom, setSelectedRoom] = useState('');
  const [showHotelResume, setShowHotelResume] = useState(false);
  const [selectedRoomType, setSelectedRoomType] = useState('');
  const [selectedRoomCapacity, setSelectedRoomCapacity] = useState('');
  const [guests, setGuests] = useState(0);
  const [roomName, setRoomName] = useState('');

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
        newList.push(rooms[i].id - 1);
      }
    }
    setFullRooms(newList);
  }

  async function selectHotel(id) {
    try {
      const RoomData = await hotelApi.getHotelRooms(token, id);
      setSelectedHotel(id);
      setRooms(RoomData);
    } catch (error) {
      console.log(error.message);
    }
  }

  function handleClickOnRoom(roomIndex) {
    if (!fullRooms.includes(roomIndex)) {
      setSelectedRoom(roomIndex);
    }
  }

  function showResume() {
    const bookingData = {
      hotelId: selectedHotel,
      roomId: selectedRoom,
    };
    const room = rooms[selectedRoom].name.replace('Room ', '');
    setRoomName(room);
    const otherPeople = rooms[selectedRoom].capacity - 1;
    setGuests(otherPeople);
    const capacity = rooms[selectedRoom].capacity;
    if (capacity === 1) {
      setSelectedRoomType('Single');
      setSelectedRoomCapacity('Somente você');
    }
    else if (capacity === 2) {
      setSelectedRoomType('Double');
      setSelectedRoomCapacity('Você e mais ');
    }
    else if (capacity === 3) {
      setSelectedRoomType('Triple');
      setSelectedRoomCapacity('Você e mais ');
    };
    setShowHotelResume(true);
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
      {showHotelResume === false ?
        <>
          <SubTitles style={{ 'color': '#8e8e8e', 'margin-top': '20px' }}>Primeiro, escolha seu hotel</SubTitles>
          <ContainerHotels>
            {hotels?.map((hotel, index) => (
              <HotelCard hotel={hotel} key={index} selectHotel={selectHotel} selectedHotel={selectedHotel} />
            ))}
          </ContainerHotels>
        </> : ''
      }
      {(showHotelResume === false && selectedHotel !== 0) && (
        <RoomsContainer>
          <SubTitles style={{ 'color': '#8e8e8e', 'margin-top': '20px' }}>Ótima pedida! Agora escolha seu quarto</SubTitles>
          <RoomsStyled>
            {rooms?.map((room, index) => (
              <Room room={room} key={index} fullRooms={fullRooms} index={index} handleClickOnRoom={handleClickOnRoom} selectedRoom={selectedRoom} />
            ))}
          </RoomsStyled>
        </RoomsContainer>
      )}
      {(showHotelResume === false && selectedRoom) ? <ReserveButton style={{ 'margin-top': '46px' }} onClick={() => showResume()}>RESERVAR QUARTO</ReserveButton> : ''}

      {showHotelResume === true ? <>
        <SubTitles style={{ 'color': '#8e8e8e', 'margin-top': '20px' }}>Você já escolheu seu quarto: </SubTitles>
        <HotelCardStyled>
          <img src={hotels[selectedHotel].image} alt="hotel" />
          <h2>{hotels[selectedHotel].name}</h2>
          <h3>Quarto reservado</h3>
          <h4>{roomName} ({selectedRoomType})</h4>
          <h3>Pessoas no seu quarto</h3>
          <h4>{selectedRoomCapacity}{guests}</h4>
        </HotelCardStyled>
        <ReserveButton style={{ 'margin-top': '46px' }} onClick={() => console.log('Alterar quarto')}>TROCAR DE QUARTO</ReserveButton>
      </> : ''}
    </>
  );
}
