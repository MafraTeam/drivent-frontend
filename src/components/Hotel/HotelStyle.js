import styled from 'styled-components';
import { Typography } from '@material-ui/core';

export const SubTitles = styled(Typography)`
  margin-bottom: 20px !important;
`;

export const Title = styled.h1`
  font-style: normal;
  font-weight: 400;
  font-size: 34px;
  line-height: 40px;
  color: #000000;
`;

export const ContainerAlert = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  h2 {
    width: 600px;
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
    text-align: center;
    color: #8e8e8e;
  }
`;

export const ContainerHotels = styled.div`
  display: flex;
  width: 860px;
  flex-wrap: wrap;
  align-items: center;
`;

export const RoomsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 52px;
`;

export const RoomsStyled = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 32px;
  gap: 17px;
`;
