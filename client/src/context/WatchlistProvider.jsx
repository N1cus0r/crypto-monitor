import React, { createContext } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { LocalStorageAPI } from "../utils/LocalStorageAPI";

export const WatchlistContext = createContext();

const WatchlistProvider = ({ children }) => {
  const axios = useAxiosPrivate();

  const addToWatchlist = async (currency_id) => {
    await axios.put("crypto/add-to-watchlist/", { currency_id }).then((res) => {
      if (res.status === 200) {
        LocalStorageAPI.addToLocalStorageWatchlist(currency_id);
      }
    });
  };

  const removeFromWatchlist = async (currency_id) => {
    await axios
      .put("crypto/remove-from-watchlist/", { currency_id })
      .then((res) => {
        if (res?.status === 200) {
          LocalStorageAPI.removeFromLocalStorageWatchlist(currency_id);
        }
      });
  };

  const context = {
    addToWatchlist,
    removeFromWatchlist,
  };

  return (
    <WatchlistContext.Provider value={context}>
      {children}
    </WatchlistContext.Provider>
  );
};

export default WatchlistProvider;
