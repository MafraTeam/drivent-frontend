import styled from 'styled-components';
import Icon from '../../components/Room/Icon.js';
import { useState, useEffect } from 'react';

export default function Room({ room, fullRooms, index, selectedRoom, handleClickOnRoom }) {
  const { name, capacity } = room;
  const icons = [];
  for (let i = 0; i < capacity; i++) {
    icons.push(1);
  }
  const [selectedPlace, setSelectedPlace] = useState('');
  const [background, setBackground] = useState('white');
  //1)
  const availablePlacesInRoom = {         //mock 
    1: false,
    2: true,
    3: true
  };

  useEffect(() => {
    if (fullRooms.includes(index)) {
      setBackground('#E9E9E9');
    }
    if (!fullRooms.includes(index)) {
      setBackground('#00000');
    }
    if (selectedRoom === index) {
      setBackground('#FFEED2');
    }
  }, [selectedRoom]);

  function handleClick(placeIndex) {
    if (selectedPlace === placeIndex) {
      setSelectedPlace('');
    } else {
      setSelectedPlace(placeIndex);
    }
  }

  return (
    <RoomStyled colorprop={background} onClick={() => handleClickOnRoom(index)}>
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
