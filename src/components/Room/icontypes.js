import { IoPerson, IoPersonOutline } from 'react-icons/io5';
import styled from 'styled-components';

const FreePlace = styled(IoPersonOutline)`
  color: black;
  font-size: 20px;
`;

const SelectedPlace = styled(IoPerson)`
  color: #FF4791;
  font-size: 20px;
`;

const TakenPlace = styled(IoPerson)`
  color: black;
  font-size: 20px;
`;

export const place = {
  available: <FreePlace />,
  selected: <SelectedPlace />,
  unavailable: <TakenPlace />
};
