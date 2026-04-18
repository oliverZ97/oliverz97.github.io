import { Box, MenuItem, Select, Typography } from "@mui/material";
import { SELECT_BASE_STYLE, TEXT_BASE_STYLE, WINDOW_BASE_STYLE } from "./styles";

export interface GameConfig {
  rounds: number;
  writeTime: number;
  voteTime: number;
}

export const defaultConfig: GameConfig = {
  rounds: 3,
  writeTime: 30,
  voteTime: 30,
};

interface GameSettingProps {
  gameConfig: GameConfig;
  onSettingChange: (config: GameConfig) => void;
  disabled: boolean;
}

const GameSettings = ({ gameConfig, onSettingChange, disabled }: GameSettingProps) => {
  return (
    <Box sx={{ ...WINDOW_BASE_STYLE, height: "100%" }}>
      {gameConfig && (
        <Box>
          <Box
            sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}
          >
            <Typography sx={TEXT_BASE_STYLE}>Rounds</Typography>
            <Select
              disabled={disabled}
              variant="outlined"
              sx={SELECT_BASE_STYLE}
              value={gameConfig.rounds}
              onChange={(event) => {
                const newConfig: GameConfig = {
                  ...gameConfig,
                  rounds: event.target.value as number,
                };
                onSettingChange(newConfig);
              }}
            >
              {[...Array(10)].map((_, i) => (
                <MenuItem key={i + 1} value={i + 1}>
                  {i + 1}
                </MenuItem>
              ))}
            </Select>
          </Box>
          <Box
            sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}
          >
            <Typography sx={TEXT_BASE_STYLE}>Write Time</Typography>
            <Select
              disabled={disabled}
              variant="outlined"
              sx={SELECT_BASE_STYLE}
              value={gameConfig.writeTime}
              onChange={(event) => {
                const newConfig: GameConfig = {
                  ...gameConfig,
                  writeTime: event.target.value as number,
                };
                onSettingChange(newConfig);
              }}
            >
              {[20, 30, 40, 50, 60, 80, 90, 120].map((val) => (
                <MenuItem key={val} value={val}>
                  {val}
                </MenuItem>
              ))}
            </Select>
          </Box>
          <Box
            sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}
          >
            <Typography sx={TEXT_BASE_STYLE}>Vote Time</Typography>
            <Select
              disabled={disabled}
              variant="outlined"
              sx={SELECT_BASE_STYLE}
              value={gameConfig.voteTime}
              onChange={(event) => {
                const newConfig: GameConfig = {
                  ...gameConfig,
                  voteTime: event.target.value as number,
                };
                onSettingChange(newConfig);
              }}
            >
              {[20, 30, 40, 50, 60, 80, 90, 120].map((val) => (
                <MenuItem key={val} value={val}>
                  {val}
                </MenuItem>
              ))}
            </Select>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default GameSettings;
