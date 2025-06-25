import { Box, Chip, Stack, Tooltip, Typography } from "@mui/material";
import {
  CLIENT_LEVEL_LABELS,
  CLIENT_LEVEL_COLORS,
  CLIENT_SOURCE_LABELS,
  CLIENT_SOURCE_COLORS,
} from "../constants/clients.constants";
import type { Client } from "../types/clients.types";

export const ClientAddressCell = ({
  address,
  city,
  country,
}: Pick<Client, "address" | "city" | "country">) => (
  <Stack direction="column" alignItems="start" spacing={0.5}>
    <Typography
      variant="body2"
      fontWeight={500}
      sx={{ wordBreak: "break-word" }}
    >
      {address}
    </Typography>
    <Chip size="small" label={`${city}, ${country}`} variant="outlined" />
  </Stack>
);

export const ClientLevelCell = ({ level }: Pick<Client, "level">) => (
  <Tooltip title={CLIENT_LEVEL_LABELS[level]}>
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        pl: 0.5,
      }}
    >
      <Box
        sx={{
          width: 14,
          height: 14,
          borderRadius: "50%",
          backgroundColor: CLIENT_LEVEL_COLORS[level],
          border: "1px solid rgba(0, 0, 0, 0.2)",
        }}
      />
    </Box>
  </Tooltip>
);

export const ClientSourceCell = ({ source }: Pick<Client, "source">) => {
  if (!source) return <Typography variant="body2">—</Typography>;

  return (
    <Tooltip title={CLIENT_SOURCE_LABELS[source]}>
      <Chip
        label={CLIENT_SOURCE_LABELS[source]}
        size="small"
        color={CLIENT_SOURCE_COLORS[source]}
        variant="outlined"
      />
    </Tooltip>
  );
};
