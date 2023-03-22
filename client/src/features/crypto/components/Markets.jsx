import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import Market from "./Market";

const Markets = ({ markets, setMarkets, isWatchlist }) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold" }}>Rank</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Price</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Market Cap</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Total Volume</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {markets.map((market) => (
            <Market
              key={market.id}
              market={market}
              markets={markets}
              setMarkets={setMarkets}
              isWatchlist={isWatchlist}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Markets;
