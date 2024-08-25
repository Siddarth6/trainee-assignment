/* eslint-disable no-unused-vars */
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { Routes } from "react-router-dom";
import "./App.css";
import WidgetBox from "./components/widgetBox";
import Dashboard from "./scenes/dashboard";
import Topbar from "./scenes/global/Topbar";
import { ColorModeContext, useMode } from "./themes";

function App() {
	const [theme, colorMode] = useMode();
	return (
		<ColorModeContext.Provider value={colorMode}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<div className="app">
					<main className="content">
						<Topbar />
						<Box className="grid-container">
							{Array.from({ length: 9 }).map((_, index) => (
								<WidgetBox key={index} />
							))}
						</Box>

						<Routes path="/" element={<Dashboard />} />
					</main>
				</div>
			</ThemeProvider>
		</ColorModeContext.Provider>
	);
}

export default App;
