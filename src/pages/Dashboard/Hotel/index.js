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
import bookingApi from '../../../services/bookingApi';

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
  const [guests, setGuests] = useState('');
  const [roomName, setRoomName] = useState('');
  const [booking, setBooking] = useState();
  const [isChange, setIsChange] = useState(false);

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

  async function getBooking() {
    try {
      const bookingData = await bookingApi.getBookingByUser(token);
      if (bookingData) {
        const RoomData = await hotelApi.getHotelRooms(token, bookingData.Room.hotelId);
        const setagem = await setBookingsFunction(bookingData, RoomData);
        showResume();
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function setBookingsFunction(bookingData, RoomData) {
    try {
      setBooking(bookingData);
      setSelectedHotel(bookingData.Room.hotelId);
      setRooms(RoomData);
      setSelectedRoom(bookingData.Room.id);
    } catch (error) {
      console.log(error);
    }
  }

  function checkCapacity() {
    const newList = [];
    for (let i = 0; i < rooms.length; i++) {
      if (rooms[i].capacity === rooms[i].takenPlaces) {
        newList.push(rooms[i].id);
      }
    }
    console.log(newList);
    setFullRooms(newList);
  }

  async function selectHotel(id) {
    try {
      setSelectedRoom('');
      const RoomData = await hotelApi.getHotelRooms(token, id);
      setSelectedHotel(id);
      setRooms(RoomData);
      checkCapacity();
    } catch (error) {
      console.log(error.message);
    }
  }

  function handleClickOnRoom(roomIndex) {
    if (!fullRooms.includes(roomIndex)) {
      setSelectedRoom(roomIndex);
    }
  }

  async function postBooking() {
    const reservation = await bookingApi.bookingRoom(selectedRoom, token);
    console.log(reservation);
  }

  async function showResume() {
    const objroom = rooms.filter((room) => room.id === selectedRoom);
    const room = objroom[0]?.name.replace('Room', '');
    setRoomName(room);
    const otherPeople = objroom[0]?.capacity - 1;
    if (otherPeople !== 0) {
      setGuests(otherPeople);
    }
    const capacity = objroom[0]?.capacity;
    if (capacity === 1) {
      setSelectedRoomType('Single');
      setSelectedRoomCapacity('Somente você');
    } else if (capacity === 2) {
      setSelectedRoomType('Double');
      setSelectedRoomCapacity('Você e mais ');
    } else if (capacity === 3) {
      setSelectedRoomType('Triple');
      setSelectedRoomCapacity('Você e mais ');
    }
    setShowHotelResume(true);
  }

  async function returnToHotels() {
    setIsChange(true);
    setSelectedHotel(0);
    setSelectedRoom('');
    setShowHotelResume(false);
  }

  async function changeRoom() {
    try {
      const promise = await bookingApi.changeBooking(booking.id, selectedRoom, token);
      setIsChange(false);
      showResume();
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    checkCapacity();
    getTicket();
    getHotels();
    getBooking();
  }, []);

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
      {showHotelResume === false ? (
        <>
          <SubTitles style={{ color: '#8e8e8e', 'margin-top': '20px' }}>Primeiro, escolha seu hotel</SubTitles>
          <ContainerHotels>
            {hotels?.map((hotel, index) => (
              <HotelCard hotel={hotel} key={index} selectHotel={selectHotel} selectedHotel={selectedHotel} />
            ))}
          </ContainerHotels>
        </>
      ) : (
        ''
      )}
      {showHotelResume === false && selectedHotel !== 0 && (
        <RoomsContainer>
          <SubTitles style={{ color: '#8e8e8e', 'margin-top': '20px' }}>
            Ótima pedida! Agora escolha seu quarto
          </SubTitles>
          <RoomsStyled>
            {rooms?.map((room, index) => (
              <Room
                room={room}
                key={index}
                fullRooms={fullRooms}
                index={room.id}
                handleClickOnRoom={handleClickOnRoom}
                selectedRoom={selectedRoom}
              />
            ))}
          </RoomsStyled>
        </RoomsContainer>
      )}
      {showHotelResume === false && selectedRoom !== '' && isChange === false && (
        <ReserveButton
          style={{ 'margin-top': '46px' }}
          onClick={() => {
            showResume();
            postBooking();
          }}
        >
          RESERVAR QUARTO
        </ReserveButton>
      )}
      {showHotelResume === false && selectedRoom !== '' && isChange === true && (
        <ReserveButton
          style={{ 'margin-top': '46px' }}
          onClick={() => {
            showResume();
            changeRoom();
          }}
        >
          TROCAR DE QUARTO
        </ReserveButton>
      )}

      {showHotelResume === true ? (
        <>
          <SubTitles style={{ color: '#8e8e8e', 'margin-top': '20px' }}>Você já escolheu seu quarto: </SubTitles>
          <HotelCardStyled>
            <img src={hotels[selectedHotel - 1]?.image} alt="hotel" />
            <h2>{hotels[selectedHotel - 1]?.name}</h2>
            <h3>Quarto reservado</h3>
            <h4>
              {roomName} ({selectedRoomType})
            </h4>
            <h3>Pessoas no seu quarto</h3>
            <h4>
              {selectedRoomCapacity}
              {guests}
            </h4>
          </HotelCardStyled>
          <ReserveButton style={{ 'margin-top': '46px' }} onClick={() => returnToHotels()}>
            TROCAR DE QUARTO
          </ReserveButton>
        </>
      ) : (
        ''
      )}
    </>
  );
}
