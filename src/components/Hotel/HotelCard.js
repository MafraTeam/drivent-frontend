import { useEffect, useState } from 'react';
import styled from 'styled-components';
import useToken from '../../hooks/useToken';
import hotelApi from '../../services/hotelsApi';
import bookingApi from '../../services/bookingApi';

export default function HotelCard({ hotel, selectHotel, selectedHotel }) {
  const { id, name, image } = hotel;
  const [capacity, setCapacity] = useState(0);
  const [infos, setInfos] = useState('');
  const token = useToken();

  function getInfos(rooms) {
    let accomodations = [];

    let single = false;
    let double = false;
    let triple = false;

    rooms.forEach((room) => {
      if (room.capacity === 1) single = true;
      if (room.capacity === 2) double = true;
      if (room.capacity === 3) triple = true;
    });

    if (single) accomodations.push('Single');
    if (double) accomodations.push('Double');
    if (triple) accomodations.push('Triple');
    let infos = accomodations.join(', ');

    setInfos(infos);
  }

  async function getCapacityByHotel() {
    const hotelRooms = await hotelApi.getHotelRooms(id, token);
    const bookings = await bookingApi.getBookingsByHotel(id, token);

    getInfos(hotelRooms);

    let totalCapacity = 0;
    hotelRooms.forEach(element => {
      totalCapacity += element.capacity;
    });

    let reservedRooms = 0;
    bookings.data.forEach(element => {
      reservedRooms += element._count.Booking;
    });

    setCapacity(totalCapacity - reservedRooms);
  }
  useEffect(() => {
    getCapacityByHotel();
  }, []);

  return (
    <HotelCardStyled onClick={() => selectHotel(id)} selectedHotel={selectedHotel} hotelId={id}>
      <img src={image} alt="hotel" />
      <h2>{name}</h2>
      <h3>Tipos de acomodação</h3>
      <h4>{infos}</h4>
      <h3>Vagas Disponiveis</h3>
      <h4>{capacity}</h4>
    </HotelCardStyled>
  );
}

export const HotelCardStyled = styled.div`
  width: 196px;
  min-height: 300px;
  background-color: ${(props) => (props.selectedHotel === props.hotelId ? '#FFEED2' : '#EBEBEB')};
  border-radius: 10px;
  margin-top: 18px;
  padding: 16px 14px;
  margin-right: 19px;
  img {
    width: 168px;
    height: 109px;
    border-radius: 5px;
  }
  h2 {
    font-size: 20px;
    font-weight: 400;
    color: #343434;
    margin-top: 10px;
  }
  h3 {
    font-size: 12px;
    font-weight: 700;
    color: #3c3c3c;
    margin-top: 14px;
  }
  h4 {
    font-size: 12px;
    font-weight: 400;
    color: #343434;
    margin-top: 2px;
  }
`;
