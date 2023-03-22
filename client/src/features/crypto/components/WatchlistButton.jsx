import React from "react";
import { IconButton } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import useWatchlist from "../../../hooks/useWatchlist";

const WatchlistButton = ({ marketId, setMarkets }) => {
  const { removeFromWatchlist } = useWatchlist();

  const handleClick = async () => {
    await removeFromWatchlist(marketId);
    setMarkets((prevMarkets) =>
      prevMarkets.filter((market) => market.id !== marketId)
    );
  };

  return (
    <IconButton onClick={handleClick}>
      <StarIcon fontSize="small" />
    </IconButton>
  );
};

export default WatchlistButton;
