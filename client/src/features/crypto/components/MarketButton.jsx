import React from "react";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import { IconButton } from "@mui/material";
import useWatchlist from "../../../hooks/useWatchlist";

const MarketButton = ({ marketId, isInWatchlist }) => {
  const { addToWatchlist, removeFromWatchlist } = useWatchlist();

  const handleClick = async () => {
    if (isInWatchlist) {
      await removeFromWatchlist(marketId);
    } else {
      await addToWatchlist(marketId);
    }
  };

  return (
    <IconButton onClick={handleClick}>
      {isInWatchlist ? (
        <StarIcon fontSize="small" />
      ) : (
        <StarBorderIcon fontSize="small" />
      )}
    </IconButton>
  );
};

export default MarketButton;
