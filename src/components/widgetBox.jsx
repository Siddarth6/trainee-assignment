/* eslint-disable no-unused-vars */
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { ColorModeContext, tokens } from "../themes";
import PieChart from "./pieChart";
import WidgetSelector from "./widgetSelector";

const WidgetBox = () => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	const colorMode = useContext(ColorModeContext);

	const [isWidgetSelectorOpen, setIsWidgetSelectorOpen] = useState(false);
	const [selectedWidget, setSelectedWidget] = useState(null);
	const [mockData, setMockData] = useState(null);

	useEffect(() => {
		fetch("/data/mockData.json")
			.then((response) => response.json())
			.then((data) => {
				setMockData(data);
				console.log("Fetched mockData:", data);
			})
			.catch((error) => console.error("Error fetching mock data:", error));
	}, []);

	const handleOpenWidgetSelector = () => {
		setIsWidgetSelectorOpen(true);
	};

	const handleCloseWidgetSelector = () => {
		setIsWidgetSelectorOpen(false);
	};

	const handleWidgetChange = (widgetName, isChecked) => {
		if (isChecked) {
			setSelectedWidget(widgetName);
		} else if (selectedWidget === widgetName) {
			setSelectedWidget(null);
		}
	};

	const handleRemoveWidget = () => {
		setSelectedWidget(null);
	};

	const getWidgetData = (widgetName) => {
		if (!mockData || !mockData.categories) return [];
		for (const category of mockData.categories) {
			const widget = category.widgets.find((w) => w.name === widgetName);
			if (widget) {
				return widget.chartData;
			}
		}
		return [];
	};

	const getWidgetText = (widgetName) => {
		if (!mockData || !mockData.categories) return "";
		for (const category of mockData.categories) {
			const widget = category.widgets.find((w) => w.name === widgetName);
			if (widget) {
				return widget.name;
			}
		}
		return "";
	};

	return (
		<Box
			display="flex"
			flexDirection="column"
			justifyContent="center"
			alignItems="center"
			border="2px solid"
			borderRadius="8px"
			p={2}
			sx={{
				position: "relative",
				width: "100%",
				height: "300px",
				overflow: "hidden",
				boxSizing: "border-box",
			}}
		>
			{selectedWidget && (
				<Box
					key={selectedWidget}
					sx={{
						position: "relative",
						width: "100%",
						height: "100%",
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						justifyContent: "center",
						overflow: "hidden",
					}}
				>
					<Typography
						variant="h6"
						sx={{
							position: "absolute",
							top: 8,
							left: 8,
							color:
								theme.palette.mode === "dark"
									? colors.gray[300]
									: colors.gray[800],
							backgroundColor: "rgba(255, 255, 255, 0.8)",
							borderRadius: "4px",
							p: 1,
							width: "calc(100% - 16px)",
							textAlign: "left",
							overflow: "hidden",
							whiteSpace: "nowrap",
							textOverflow: "ellipsis",
						}}
					>
						{getWidgetText(selectedWidget)}
					</Typography>
					<Box
						sx={{
							mt: 6,
							width: "100%",
							height: "calc(100% - 40px)",
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<PieChart data={getWidgetData(selectedWidget)} />
					</Box>
					<IconButton
						onClick={handleRemoveWidget}
						sx={{
							position: "absolute",
							top: 8,
							right: 8,
							backgroundColor: "rgba(255, 255, 255, 0.8)",
							"&:hover": {
								backgroundColor: "rgba(255, 255, 255, 0.9)",
							},
						}}
					>
						<CloseIcon />
					</IconButton>
				</Box>
			)}
			{!selectedWidget && (
				<Button
					variant="outlined"
					startIcon={<AddIcon />}
					onClick={handleOpenWidgetSelector}
					sx={{
						border: "1px solid",
						borderColor:
							theme.palette.mode === "dark"
								? colors.gray[300]
								: theme.palette.primary.main,
						color:
							theme.palette.mode === "dark"
								? colors.gray[300]
								: theme.palette.primary.main,
						padding: "4px",
						minWidth: "auto",
						borderRadius: "4px",
					}}
				>
					Add Widget
				</Button>
			)}
			<WidgetSelector
				isOpen={isWidgetSelectorOpen}
				onClose={handleCloseWidgetSelector}
				onWidgetChange={handleWidgetChange}
				selectedWidgets={selectedWidget ? [selectedWidget] : []}
			/>
		</Box>
	);
};

export default WidgetBox;
