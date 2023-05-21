import styled from 'styled-components';

export const OptionBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  width: 145px;
  height: 145px;
  border: 1px solid #cecece;
  border-radius: 20px;
  font-family: 'Roboto';
  margin-right: 24px;
  cursor: pointer;

  h1 {
    font-weight: 400;
    font-size: 17px;
    text-align: center;
    color: #454545;
    margin-bottom: 5px;
  }

  h2 {
    font-weight: 400;
    font-size: 15px;
    line-height: 16px;
    text-align: center;
    color: #898989;
  }
`;
