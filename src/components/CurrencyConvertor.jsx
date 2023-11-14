import React, { useState, useEffect } from "react";
import { TextField, Box, Typography } from "@mui/material";

export const CurrencyConvertor = ({ latestValue }) => {
  const [dollarsValue, setDollarsValue] = useState(latestValue);
  const [Ethereum, setEthereumValue] = useState(1);
  const [hasInitialized, setHasInitialized] = useState(false);

  useEffect(() => {
    if (!hasInitialized && latestValue) {
      setDollarsValue(latestValue.toFixed(2));
      setHasInitialized(true);
    }
  }, [hasInitialized, latestValue]);

  const handleInputChange = (
    event,
    currentInput,
    effectedInput,
    isMultiplication
  ) => {
    const newValue = event.target.value;
    const numericValue = newValue.replace(/[^0-9.]/g, "");
    currentInput(numericValue);
    effectedInput(
      (isMultiplication
        ? numericValue * latestValue
        : numericValue / latestValue
      ).toFixed(2)
    );
  };

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h5" fontWeight="bold">
        ETH to USD Converter
      </Typography>
      <Box display="flex">
        <TextField
          label="Ethereum"
          value={`ETH ${Ethereum}`}
          onChange={(e) =>
            handleInputChange(e, setEthereumValue, setDollarsValue, true)
          }
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <TextField
          label="Dollar"
          value={`$ ${dollarsValue}`}
          onChange={(e) =>
            handleInputChange(e, setDollarsValue, setEthereumValue, false)
          }
          fullWidth
          margin="normal"
          variant="outlined"
        />
      </Box>
    </Box>
  );
};
