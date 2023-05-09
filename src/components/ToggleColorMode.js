import * as React from "react";
import IconButton from "@mui/material/IconButton";
import { useTheme, ThemeProvider, createTheme } from "@mui/material/styles";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

function MyApp() {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  return (
    <div style={{ position: "absolute", top: "5%", left: "2%" }}>
      {theme.palette.mode} mode
      <IconButton onClick={colorMode.toggleColorMode} color="inherit">
        {theme.palette.mode === "dark" ? (
          <Brightness7Icon />
        ) : (
          <Brightness4Icon />
        )}
      </IconButton>
    </div>
  );
}

function MyComponent() {
  const [mode, setMode] = React.useState("light");
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        const newMode = mode === "light" ? "dark" : "light";
        setMode(newMode);
        document.body.style.backgroundColor =
          newMode === "dark"
            ? theme.palette.background.dark
            : theme.palette.background.paper;
      },
    }),
    [mode]
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          background: {
            paper: mode === "light" ? "#fff" : "#424242",
            default: mode === "light" ? "#f4f6f8" : "#121212",
            dark: mode === "light" ? "#f4f6f8" : "#121212",
          },
        },
      }),
    [mode]
  );

  React.useEffect(() => {
    document.body.style.backgroundColor = theme.palette.background.paper;
  }, [theme.palette.background.paper]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <MyApp />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default MyComponent;
