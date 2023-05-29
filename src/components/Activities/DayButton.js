import { useEffect } from 'react';
import { useState } from 'react';
import styled from 'styled-components';

export default function DayButton({ item, index, selectedDay, handleClickOnDay }) {
  const [background, setBackground] = useState('#e0e0e0');
  const day = item.dataFormatada.split(', ')[1];

  useEffect(() => {
    if (selectedDay === index) {
      setBackground('#FFD37D');
    } else {
      setBackground('#e0e0e0');
    }
  }, [selectedDay]);

  return (
    <DayButtonSty colorprop={background} onClick={() => handleClickOnDay(index, day)}>
      {' '}
      {item.dataFormatada.slice(0, item.dataFormatada.length - 5).replace('-', '/')}
    </DayButtonSty>
  );
}

const DayButtonSty = styled.div`
  width: 162px;
  height: 37px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(props) => props.colorprop};
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  font-family: 'Roboto';
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  text-align: center;
  color: #000000;
  cursor: pointer;
`;
