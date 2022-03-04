import { faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Helmet } from 'react-helmet';
import { useQuery } from 'react-query';
import {
  Link,
  Route,
  Switch,
  useLocation,
  useParams,
  useRouteMatch,
} from 'react-router-dom';
import styled from 'styled-components';
import { fetchCoin, fetchTickers } from '../api';
import Chart from './Chart';
import Price from './Price';

interface RouteParams {
  coinId: string;
}

export interface RouteState {
  name: string;
}

interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}
export interface IPrice {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BackButton = styled.div`
  width: 30px;
  height: 30px;

  display: flex;
  justify-content: center;
  align-items: center;

  position: fixed;
  left: 30px;
  bottom: 30px;

  cursor: pointer;
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
`;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 33%;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;
const Description = styled.p`
  margin: 20px 0px;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
  a {
    padding: 7px 0px;
    display: block;
  }
`;

function Coin() {
  const { coinId } = useParams<RouteParams>();
  const { state } = useLocation<RouteState>();

  const priceMatch = useRouteMatch('/:coinId/price');
  const chartMatch = useRouteMatch('/:coinId/chart');

  const { isLoading: infoLoading, data: coin } = useQuery<ICoin>(
    ['info', coinId],
    () => fetchCoin(coinId)
  );
  const { isLoading: tickersLoading, data: tickers } = useQuery<IPrice>(
    ['tickers', coinId],
    () => fetchTickers(coinId),
    {
      refetchInterval: 5000,
    }
  );

  const isLoading = infoLoading || tickersLoading;
  return (
    <Container>
      <Helmet>
        <title>
          {state?.name ? state.name : isLoading ? 'Loading...' : coin?.name}
        </title>
      </Helmet>
      <Header>
        <BackButton>
          <Link to={'/'}>
            <FontAwesomeIcon
              className="back-btn"
              icon={faCircleArrowLeft}
              size="2x"
            />
          </Link>
        </BackButton>
        <Title>
          {state?.name ? state.name : isLoading ? 'Loading...' : coin?.name}
        </Title>
      </Header>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>Rank:</span>
              <span>{coin?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol:</span>
              <span>${coin?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Price:</span>
              <span>${tickers?.quotes.USD.price.toFixed(2)}</span>
            </OverviewItem>
          </Overview>
          <Description>{coin?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>Total Suply:</span>
              <span>{tickers?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Supply:</span>
              <span>{tickers?.max_supply}</span>
            </OverviewItem>
          </Overview>

          <Tabs>
            <Tab isActive={chartMatch !== null}>
              <Link to={`/${coinId}/chart`}>Chart</Link>
            </Tab>
            <Tab isActive={priceMatch !== null}>
              <Link
                to={{
                  pathname: `/${coinId}/price`,
                  state: { tickers: tickers },
                }}
              >
                Price
              </Link>
            </Tab>
          </Tabs>

          <Switch>
            <Route path={`/${coinId}/price`}>
              <Price />
            </Route>
            <Route path={`/${coinId}/chart`}>
              <Chart coinId={coinId} />
            </Route>
          </Switch>
        </>
      )}
    </Container>
  );
}

export default Coin;
