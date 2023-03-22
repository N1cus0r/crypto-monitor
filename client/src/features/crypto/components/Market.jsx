import { Avatar, Grid, Typography, TableCell, TableRow } from "@mui/material";
import React, { useEffect, useState } from "react";
import { LocalStorageAPI } from "../../../utils/LocalStorageAPI";
import MarketButton from "./MarketButton";
import WatchlistButton from "./WatchlistButton";

const Market = ({ market, setMarkets, isWatchlist }) => {
  const [watchlist, setWatchlist] = useState(
    LocalStorageAPI.getLocalStorageWatchlist() || []
  );

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const formattedPrice =
    market.current_price > 1
      ? formatter.format(market.current_price)
      : `$${market.current_price}`;

  useEffect(() => {
    const updateWatchlist = () => {
      setWatchlist(LocalStorageAPI.getLocalStorageWatchlist());
    };

    window.addEventListener("watchlistUpdate", updateWatchlist);

    return () => {
      window.removeEventListener("watchlistUpdate", updateWatchlist);
    };
  }, []);

  return (
    <TableRow
      key={market.id}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell>
        <Grid
          container
          spacing={1}
          direction="row"
          display="flex"
          alignItems="center"
        >
          <Grid item>
            {isWatchlist ? (
              <WatchlistButton setMarkets={setMarkets} marketId={market.id} />
            ) : (
              <MarketButton
                marketId={market.id}
                isInWatchlist={watchlist.includes(market.id)}
              />
            )}
          </Grid>

          <Grid item>{market.market_cap_rank}</Grid>
        </Grid>
      </TableCell>
      <TableCell>
        <Grid
          container
          spacing={1}
          direction="row"
          display="flex"
          alignItems="center"
        >
          <Grid item>
            <Avatar src={market.image} />
          </Grid>
          <Grid item>
            <Typography variant="body2">{market.name}</Typography>
          </Grid>
          <Grid item>
            <Typography variant="body2" color="secondary">
              {market.symbol.toUpperCase()}
            </Typography>
          </Grid>
        </Grid>
      </TableCell>
      <TableCell>{formattedPrice}</TableCell>
      <TableCell>{formatter.format(market.market_cap)}</TableCell>
      <TableCell>{formatter.format(market.total_volume)}</TableCell>
    </TableRow>
  );
};

export default Market;
