import styled from 'styled-components';

export default function ActivitiesSelector({ id, selectedDay, text, day, toggleSelectedDay }) {
  return (
    <ActivitiesData id={id} selectedDay={selectedDay} onClick={() => toggleSelectedDay(id, day)}>
      {text}
    </ActivitiesData>
  );
}

export const ActivitiesData = styled.div`
  width: 131px;
  height: 37px;
  background-color: ${(props) => (props.id === props.selectedDay ? '#ffd37d' : '#e0e0e0')};
  border-radius: 4px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #000000;
`;
