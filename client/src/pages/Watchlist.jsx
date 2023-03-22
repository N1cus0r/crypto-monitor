import { CircularProgress, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import Markets from "../features/crypto/components/Markets";
import useAuth from "../hooks/useAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import CenteredBox from "../layouts/CenteredBox";

const Watchlist = () => {
  const socket = useRef(null);
  const { user } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  const [markets, setMarkets] = useState([]);
  const [loading, setLoading] = useState(false);

  const getWatchlistMarkets = async () => {
    setLoading(true);
    await axiosPrivate
      .get("crypto/get-watchlist-markets/")
      .then((res) => setMarkets(res.data))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getWatchlistMarkets();

    socket.current = new WebSocket(
      process.env.REACT_APP_WS_URL + `watchlist/${user.id}/`
    );
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
      {loading ? (
        <CircularProgress />
      ) : markets.length ? (
        <Markets markets={markets} setMarkets={setMarkets} isWatchlist />
      ) : (
        <Typography variant="h5">
          Looks like your watchlist is empty...
        </Typography>
      )}
    </CenteredBox>
  );
};

export default Watchlist;
