import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { IPrice } from './Coin';

interface RouteState {
  tickers: IPrice;
}

const Row = styled.p`
  margin: 30px 15px;
`;

function Price() {
  const { state } = useLocation<RouteState>();
  const tickers = state?.tickers;
  return (
    <>
      <Row>Rank : {tickers.rank}</Row>
      <Row>Price : {tickers?.quotes?.USD?.price}%</Row>
      <Row>15MIN : {tickers?.quotes?.USD?.percent_change_15m}%</Row>
      <Row>30MIN : {tickers?.quotes?.USD?.percent_change_30m}%</Row>
      <Row>1HOUR : {tickers?.quotes?.USD?.percent_change_1h}%</Row>
      <Row>6HOUR : {tickers?.quotes?.USD?.percent_change_6h}%</Row>
      <Row>12HOUR : {tickers?.quotes?.USD?.percent_change_12h}%</Row>
      <Row>24HOUR : {tickers?.quotes?.USD?.percent_change_24h}%</Row>
      <Row>7DAYS : {tickers?.quotes?.USD?.percent_change_7d}%</Row>
      <Row>30DAYS : {tickers?.quotes?.USD?.percent_change_30d}%</Row>
      <Row>1YEAR : {tickers?.quotes?.USD?.percent_change_1y}%</Row>
    </>
  );
}

export default Price;
