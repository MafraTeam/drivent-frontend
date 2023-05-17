import styled from 'styled-components';
import Icon from '../../components/Room/Icon.js';

export default function Room({ room }) {
  const { name, capacity } = room;
  const icons = [];
  for (let i = 0; i < capacity; i++) {
    icons.push(1);
  }

  return (
    <RoomStyled>
      <h1>{name.slice(-3)}</h1>
      <div style={{ 'display': 'flex' }}>
        {icons.map((item, index) => (
          <Icon key={index}/>))}
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
