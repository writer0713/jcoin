import { Helmet } from 'react-helmet';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { fetchCoins } from '../api';

interface CoinInterface {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const CoinsList = styled.ul``;

const Coin = styled.li`
  background-color: white;
  color: ${(props) => props.theme.backgroundColor};
  margin-bottom: 10px;
  border-radius: 15px;
  a {
    padding: 20px;
    transition: color 0.2s ease-in;
    display: flex;
    align-items: center;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Img = styled.img`
  width: 25px;
  height: 25px;
  margin-right: 10px;
`;

function Coins() {
  const { isLoading, data: coins } = useQuery<CoinInterface[]>(
    'allCoins',
    fetchCoins
  );

  return (
    <Container>
      <Helmet>
        <title>J-COIN</title>
      </Helmet>
      <Header>
        <Title>J-COIN</Title>
      </Header>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <CoinsList>
          {coins?.splice(0, 100).map((coin) => (
            <Coin key={coin.id}>
              <Link
                to={{
                  pathname: `/${coin.id}/chart`,
                  state: { name: coin.name },
                }}
              >
                <Img
                  src={`https://cryptoicon-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                />
                {coin.name} &rarr;
              </Link>
            </Coin>
          ))}
        </CoinsList>
      )}
    </Container>
  );
}

export default Coins;
