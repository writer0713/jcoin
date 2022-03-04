import ApexChart from 'react-apexcharts';
import { useQuery } from 'react-query';
import { fetchHistory } from '../api';

interface ICoin {
  coinId: string;
}

interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

function Chart({ coinId }: ICoin) {
  const { isLoading, data } = useQuery<IHistorical[]>(
    ['ohlcv', coinId],
    () => fetchHistory(coinId),
    {
      refetchInterval: 10000,
    }
  );

  return (
    <div>
      {isLoading ? (
        'Loading chart...'
      ) : (
        <ApexChart
          type="candlestick"
          series={[
            {
              data: data?.map((price) => {
                return {
                  x: new Date(price.time_open),
                  y: [
                    price.open.toFixed(2),
                    price.high.toFixed(2),
                    price.low.toFixed(2),
                    price.close.toFixed(2),
                  ],
                };
              }),
            },
          ]}
          options={{
            theme: {
              mode: 'dark',
            },
            chart: {
              type: 'candlestick',
              height: 300,
              width: 500,
              toolbar: {
                show: false,
              },
              background: 'transparent',
            },
            grid: { show: false },
            stroke: {
              curve: 'smooth',
              width: 4,
            },
            yaxis: {
              // show: false,
            },
            xaxis: {
              type: 'datetime',
              // axisBorder: { show: false },
              axisTicks: { show: false },
              // labels: { show: false },
            },
          }}
        />
      )}
    </div>
  );
}

export default Chart;
