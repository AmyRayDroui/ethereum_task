import { useEffect, useState } from "react";
import { Box, Container, CssBaseline, Typography } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { CurrencyConvertor } from "./components/CurrencyConvertor";
import axios from "axios";

function App() {
  const [latestValue, setLatestValue] = useState(0);
  const [ratio, setRatio] = useState(0.0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/coins/ethereum/market_chart?vs_currency=usd&days=1",
          {
            params: {
              vs_currency: "usd",
            },
          }
        );
        const [currentValue, currentRatio] = parseData(response.data);
        setLatestValue(currentValue);
        setRatio(currentRatio);
      } catch (error) {
        console.error("Error fetching crypto data:", error);
      }
    };

    fetchData();

    const intervalId = setInterval(fetchData, 30000);

    return () => clearInterval(intervalId);
  }, []);

  const parseData = (data) => {
    const prices = data.prices;
    const currentValue = prices[prices.length - 1][1];
    return [currentValue, currentValue / prices[0][1]];
  };

  return (
    <div>
      <CssBaseline />
      <Container
        sx={{
          background: "linear-gradient(to bottom, #112145, #6427de)",
          height: "100vh",
          pt: 4,
        }}>
        <Box
          sx={{
            background: "rgba(255, 255, 255, 0.15)",
            py: 4,
            px: 5,
            borderRadius: 3,
          }}>
          <Box display="flex" alignItems="end">
            <Box pr={1}>
              <img
                src={
                  "https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png"
                }
                alt="eth"
              />
            </Box>
            <Box display="flex" alignItems="baseline">
              <Typography variant="h3" p={1}>
                Ethereum
              </Typography>
              <Typography variant="h5" color="textSecondary" p={1}>
                ETH
              </Typography>
            </Box>
          </Box>
          <Box display="flex" gap={2}>
            <Typography variant="h1">${latestValue.toFixed(2)}</Typography>
            <Box
              display="flex"
              alignItems="center"
              color={ratio < 1 ? "red" : "green"}>
              <ArrowDropDownIcon
                sx={{
                  transform: ratio > 1 ? "rotate(180deg)" : "rotate(0)",
                  fontSize: "1.75rem",
                }}
              />
              <Typography variant="h6">
                {(Math.abs(ratio - 1) * 100).toFixed(2)}% (1d)
              </Typography>
            </Box>
          </Box>
          <CurrencyConvertor latestValue={latestValue} />
        </Box>
      </Container>
    </div>
  );
}

export default App;
