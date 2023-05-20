import styled from 'styled-components';
import Icon from '../../components/Room/Icon.js';
import { useState, useEffect } from 'react';

export default function Room({ room, fullRooms, background }) {
  const { name, capacity } = room;
  const icons = [];
  for (let i = 0; i < capacity; i++) {
    icons.push(1);
  }
  const [selectedPlace, setSelectedPlace] = useState('');
  //1)
  const availablePlacesInRoom = {         //mock 
    1: false,
    2: true,
    3: true
  };

  function handleClick(placeIndex) {
    if (selectedPlace === placeIndex) {
      setSelectedPlace('');
    } else {
      setSelectedPlace(placeIndex);
    }
  }

  return (
    <RoomStyled colorprop={background}>
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
  background-color:  ${(props) => props.colorprop};
  h1 {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
  }
`;
