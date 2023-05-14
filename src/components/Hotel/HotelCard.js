import styled from 'styled-components';

export default function HotelCard({ hotel }) {
  const { name, image } = hotel;
  return (
    <HotelCardStyled>
      <img src={image} alt="hotel" />
      <h2>{name}</h2>
      <h3>Tipos de acomodação</h3>
      <h4>Single, Double e Triple</h4>
      <h3>Vagas Disponiveis</h3>
      <h4>Nº total de vagas disponiveis</h4>
    </HotelCardStyled>
  );
}

const HotelCardStyled = styled.div`
  width: 196px;
  min-height: 300px;
  background-color: #ebebeb;
  border-radius: 10px;
  margin-top: 18px;
  padding: 16px 14px;
  margin-right: 19px;
  img {
    width: 168px;
    height: 109px;
    border-radius: 5px;
  }
  h2 {
    font-size: 20px;
    font-weight: 400;
    color: #343434;
    margin-top: 10px;
  }
  h3 {
    font-size: 12px;
    font-weight: 700;
    color: #3c3c3c;
    margin-top: 14px;
  }
  h4 {
    font-size: 12px;
    font-weight: 400;
    color: #343434;
    margin-top: 2px;
  }
`;
