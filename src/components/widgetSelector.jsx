/* eslint-disable no-unused-vars */
import { useTheme } from "@emotion/react";
import CloseIcon from "@mui/icons-material/Close";
import {
	Box,
	Checkbox,
	Drawer,
	FormControlLabel,
	IconButton,
	InputBase,
	List,
	ListItem,
	Tab,
	Tabs,
	Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { ColorModeContext, tokens } from "../themes";

const WidgetSelector = ({
	isOpen,
	onClose,
	onWidgetChange,
	selectedWidgets,
	searchQuery,
}) => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	const colorMode = useContext(ColorModeContext);

	const [localSelectedWidgets, setLocalSelectedWidgets] = useState({});
	const [tabValue, setTabValue] = useState(0);
	const [mockData, setMockData] = useState(null);
	const [localSearchQuery, setLocalSearchQuery] = useState("");

	useEffect(() => {
		fetch("/data/mockData.json")
			.then((response) => response.json())
			.then((data) => {
				setMockData(data);

				const initialWidgets = {};
				data.categories.forEach((category) => {
					category.widgets.forEach((widget) => {
						initialWidgets[widget.name] = selectedWidgets.includes(widget.name);
					});
				});
				setLocalSelectedWidgets(initialWidgets);
			})
			.catch((error) => console.error("Error loading JSON data:", error));
	}, [selectedWidgets]);

	useEffect(() => {
		setLocalSearchQuery(searchQuery || "");
	}, [searchQuery]);

	const handleCheckboxChange = (event) => {
		const { name, checked } = event.target;
		setLocalSelectedWidgets((prevState) => {
			const updatedState = { ...prevState, [name]: checked };
			onWidgetChange(name, checked);
			return updatedState;
		});
	};

	const handleTabChange = (event, newValue) => {
		setTabValue(newValue);
	};

	const handleSearchChange = (event) => {
		setLocalSearchQuery(event.target.value);
	};

	const renderWidgets = () => {
		if (!mockData) return null;

		const widgetsToDisplay = mockData.categories[tabValue].widgets.filter(
			(widget) => {
				const widgetName = widget.name || "";
				return widgetName
					.toLowerCase()
					.includes(localSearchQuery.toLowerCase());
			}
		);

		return widgetsToDisplay.map((widget) => (
			<ListItem key={widget.id}>
				<FormControlLabel
					control={
						<Checkbox
							checked={localSelectedWidgets[widget.name] || false}
							onChange={handleCheckboxChange}
							name={widget.name}
						/>
					}
					label={widget.name}
				/>
			</ListItem>
		));
	};

	return (
		<Drawer
			anchor="right"
			open={isOpen}
			onClose={onClose}
			PaperProps={{
				sx: {
					width: "40%",
				},
			}}
		>
			<Box sx={{ p: 2 }}>
				<Box
					sx={{
						display: "flex",
						p: 1,
						justifyContent: "space-between",
						alignItems: "center",
						background: colors.blueAccent[400],
					}}
				>
					<Typography variant="h6" color="white">
						Add Widgets
					</Typography>
					<IconButton
						onClick={onClose}
						sx={{
							color: "white",
							"&:hover": {
								backgroundColor: "rgba(255, 255, 255, 0.2)",
							},
						}}
					>
						<CloseIcon />
					</IconButton>
				</Box>
				<Typography variant="h6" sx={{ mt: 2 }}>
					Personalize your dashboard by adding the following widgets
				</Typography>
				{/* Search Input */}
				<Box
					sx={{
						display: "flex",
						backgroundColor: colors.gray[800],
						borderRadius: "4px",
						mt: 2,
						p: 1,
					}}
				>
					<InputBase
						sx={{ ml: 2, flex: 1 }}
						placeholder="Search Widgets..."
						value={localSearchQuery}
						onChange={handleSearchChange}
					/>
				</Box>
				{/* Scrollable Tabs */}
				<Box
					sx={{
						overflowX: "auto",
						mt: 2,
						whiteSpace: "nowrap",
						borderBottom: 1,
						borderColor: "divider",
					}}
				>
					<Tabs
						value={tabValue}
						onChange={handleTabChange}
						sx={{
							minWidth: "max-content",
						}}
					>
						{mockData &&
							mockData.categories.map((category) => (
								<Tab key={category.id} label={category.name} />
							))}
					</Tabs>
				</Box>
				<Box sx={{ mt: 2 }}>
					<List>{renderWidgets()}</List>
				</Box>
			</Box>
		</Drawer>
	);
};

export default WidgetSelector;
