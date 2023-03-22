import { CircularProgress } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import Markets from "../features/crypto/components/Markets";
import CenteredBox from "../layouts/CenteredBox";
import { MarketsService } from "../utils/services/MarketsService";

const Home = () => {
  const socket = useRef(null);

  const [markets, setMarkets] = useState([]);
  const [loading, setLoading] = useState(true);

  const getMarkets = async () => {
    setLoading(true);
    const markets = await MarketsService.getMarkets();
    setMarkets(markets);
    setLoading(false);
  };

  useEffect(() => {
    getMarkets();

    socket.current = new WebSocket(process.env.REACT_APP_WS_URL + "markets/");

    socket.current.onopen = (e) => {
      console.log("connect");
    };

    socket.current.onmessage = (e) => {
      const data = JSON.parse(e.data);
      console.log(data);
      setMarkets(data);
    };

    return () => {
      socket.current.close();
    };
  }, []);

  return (
    <CenteredBox>
      {loading ? <CircularProgress /> : <Markets markets={markets} />}
    </CenteredBox>
  );
};

export default Home;
