import styled from 'styled-components';

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

export const ActivitiesDataContainer = styled.div`
  display: flex;
  gap: 17px;
`;

export const ActivitiesData = styled.div`
  width: 131px;
  height: 37px;
  background-color: #e0e0e0;
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

export const ActivitiesPerDayContainer = styled.div`
  display: flex;
  gap: 10px;
`;
