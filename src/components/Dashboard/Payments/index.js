import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  width: 45vw;
  height: 85vh;
  flex-direction: column;
  margin-left: 35px;
  h1{
    font-weight: 400;
    font-size: 34px;
    line-height: 40px;
    color: #000000;    
  }
  h2{
    font-weight: 400;
    font-size: 20px;
    line-height: 24px;
    color: #8e8e8e;    
    margin-top: 20px;
  }  
`;

export const Options = styled.div`
  display: flex;
  width: 500px;
  height: 350px;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

export const Option = styled.div`  
  height: 175px;
    width: 175px;
    flex-direction: column;
    align-items: center;
    justify-content: center; 
    border-radius: 15px; 
    border: #e5e5e5 solid 1px;
    margin-right: 25px;
    margin-top: 17px;
    padding-top:68px;
  
  p{
    font-weight: 400;
    font-size: 20px;
    line-height: 24px;
    color: #000000;    
    text-align: center;
  }
  .price{
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    color: #898989;    
  }
  &:hover{
    background-color: #ffeed2;
  }
`;

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
