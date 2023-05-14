import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';

export const Button = styled.button`  
    background-color: #e0e0e0;
    height: 60px;
    width: 200px;
    flex-direction: column;
    align-items: center;
    justify-content: center; 
    border-radius: 4px; 
    border: none;
    margin-top:10px;
    p{       
        color: #000000;
        font-size:16px;
        line-height:20px; 
        font-weight: 700;
    }    
`;

export const Row = styled.div`
      display: flex;
`;

export const Column = styled.div`
      display: flex;
      flex-direction: column;
`;

export const StyledTypography = styled(Typography)`
      margin-bottom: 20px!important;
`;

export const ReserveButton = styled.div`
      width: 162px;
      height: 37px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #E0E0E0;
      box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
      border-radius: 4px;
      font-family: 'Roboto';
      font-weight: 400;
      font-size: 14px;
      line-height: 16px;
      text-align: center;
      color: #000000;
`;
