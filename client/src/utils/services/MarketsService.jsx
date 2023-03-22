import axios from "axios";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

export class MarketsService {
  static async getMarkets() {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/coins/markets" +
        "?vs_currency=usd" +
        "&order=market_cap_desc" +
        "&per_page=20" +
        "&page=1" +
        "&sparkline=false"
    );

    return response.data;
  }
}
