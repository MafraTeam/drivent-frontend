import styled from 'styled-components';
import { IoPerson, IoPersonOutline } from 'react-icons/io5';
import { useState } from 'react';

export default function Icon() {
  const [iconType, setIconType] = useState(<FreePlace />);

  function selectPlace() {
    setIconType(<SelectedPlace />);
  }

  return (
    <div onClick={selectPlace}>{iconType}</div>
  );
}

const FreePlace = styled(IoPersonOutline)`
  color: black;
  font-size: 20px;
`;

const TakenPlace = styled(IoPerson)`
  color: black;
  font-size: 20px;
`;

const SelectedPlace = styled(IoPerson)`
  color: #FF4791;
  font-size: 20px;
`;
