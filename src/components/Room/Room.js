import styled from 'styled-components';
import Icon from '../../components/Room/Icon.js';
import { useState } from 'react';

export default function Room({ room }) {
  const { name, capacity } = room;
  const icons = [];
  for (let i = 0; i < capacity; i++) {
    icons.push(1);
  }

  const [selectedPlace, setSelectedPlace] = useState('');

  //2 formas de mapear ícones preenchidos (ocupados) ou não:

  //1)
  const availablePlacesInRoom = {         //mock 
    1: false,
    2: true,
    3: true
  };

  //2)
  const roomsWithTheirRespectiveFreePlaces = [   //mock
    { name: '100', availablePlaces: 1 },
    { name: '101', availablePlaces: 2 },
    { name: '102', availablePlaces: 0 },
    { name: '103', availablePlaces: 1 },
    { name: '104', availablePlaces: 1 },
    { name: '105', availablePlaces: 0 },
    { name: '106', availablePlaces: 1 },
    { name: '107', availablePlaces: 0 },
    { name: '108', availablePlaces: 1 },
    { name: '109', availablePlaces: 0 },
    { name: '110', availablePlaces: 2 },
    { name: '111', availablePlaces: 1 },
    { name: '112', availablePlaces: 1 },
    { name: '113', availablePlaces: 1 },
    { name: '114', availablePlaces: 2 },
    { name: '115', availablePlaces: 2 },
  ];

  function handleClick(placeIndex) {
    if (selectedPlace === placeIndex) {
      setSelectedPlace('');
    } else {
      setSelectedPlace(placeIndex);
    }
  }

  return (
    <RoomStyled>
      <h1>{name.slice(-3)}</h1>
      <div style={{ 'display': 'flex' }}>
        {icons.map((item, index) => (
          <Icon
            key={index}
            index={index}
            handleClick={handleClick}
            selected={selectedPlace}
            availablePlacesInRoom={availablePlacesInRoom}
          />))}
      </div>
    </RoomStyled>
  );
}

const RoomStyled = styled.div`
  width: 190px;
  height: 45px;
  border: 1px solid #cecece;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  padding: 15px;
  align-items: center;
  color: black;
  background-color: white;
  h1 {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
  }
`;
