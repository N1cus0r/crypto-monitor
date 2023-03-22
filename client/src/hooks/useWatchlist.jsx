import { useContext } from "react";
import { WatchlistContext } from "../context/WatchlistProvider";

const useWatchlist = () => {
  return useContext(WatchlistContext);
};
export default useWatchlist;
