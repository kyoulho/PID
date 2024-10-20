// src/algorithms/data-fetcher.service.ts
import {
  Injectable,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class DataFetcherService {
  async fetchData(source: any): Promise<any> {
    try {
      let response;
      if (source.method === 'GET') {
        response = await axios.get(source.url, { params: source.params });
      } else if (source.method === 'POST') {
        response = await axios.post(source.url, source.payload);
      }

      // 파서에 따라 데이터를 처리
      switch (source.parser) {
        case 'bls_parser':
          return this.blsParser(response.data);
        case 'alpha_vantage_sma_parser':
          return this.alphaVantageSmaParser(response.data);
        case 'alpha_vantage_quote_parser':
          return this.alphaVantageQuoteParser(response.data);
        default:
          throw new BadRequestException(`Unknown parser: ${source.parser}`);
      }
    } catch (error) {
      console.error(`Failed to fetch data from ${source.name}:`, error);
      throw new InternalServerErrorException(
        `Failed to fetch data from ${source.name}`,
      );
    }
  }

  // 파서 함수 예시
  private blsParser(data: any): {
    current: number;
    twelve_month_average: number;
  } {
    const series = data.Results.series[0];
    const dataPoints = series.data.slice(0, 12); // 최근 12개월 데이터
    const current = parseFloat(dataPoints[0].value);
    const twelveMonthAvg =
      dataPoints.reduce(
        (acc: number, curr: any) => acc + parseFloat(curr.value),
        0,
      ) / 12;
    return { current, twelve_month_average: twelveMonthAvg };
  }

  private alphaVantageSmaParser(data: any): number {
    const smaData = data['Technical Analysis: SMA'];
    const dates = Object.keys(smaData);
    if (dates.length === 0) {
      throw new BadRequestException('No SMA data found');
    }
    const latestDate = dates[0];
    return parseFloat(smaData[latestDate]['SMA']);
  }

  private alphaVantageQuoteParser(data: any): number {
    const quote = data['Global Quote'];
    if (!quote || !quote['05. price']) {
      throw new BadRequestException('Invalid Global Quote data');
    }
    return parseFloat(quote['05. price']);
  }
}
