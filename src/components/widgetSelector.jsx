/* eslint-disable no-unused-vars */

import { useTheme } from "@emotion/react";
import CloseIcon from "@mui/icons-material/Close";
import {
	Box,
	Checkbox,
	Drawer,
	FormControlLabel,
	IconButton,
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
}) => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	const colorMode = useContext(ColorModeContext);

	const [localSelectedWidgets, setLocalSelectedWidgets] = useState({});
	const [tabValue, setTabValue] = useState(0);
	const [mockData, setMockData] = useState(null);

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

	const renderWidgets = () => {
		if (!mockData) return null;
		return mockData.categories[tabValue].widgets.map((widget) => (
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
				<Tabs
					value={tabValue}
					onChange={handleTabChange}
					sx={{ borderBottom: 1, borderColor: "divider", mt: 2 }}
				>
					{mockData &&
						mockData.categories.map((category) => (
							<Tab key={category.id} label={category.name} />
						))}
				</Tabs>
				<Box sx={{ mt: 2 }}>
					<List>{renderWidgets()}</List>
				</Box>
			</Box>
		</Drawer>
	);
};

export default WidgetSelector;
