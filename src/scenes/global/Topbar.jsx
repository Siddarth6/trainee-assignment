/* eslint-disable no-unused-vars */
import AddIcon from "@mui/icons-material/Add";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import LoopIcon from "@mui/icons-material/Loop";
import SearchIcon from "@mui/icons-material/Search";
import { Box, Button, IconButton, useTheme } from "@mui/material";
import InputBase from "@mui/material/InputBase";
import React, { useContext, useState } from "react";
import CustomizedMenus from "../../components/customMenu";
import WidgetSelector from "../../components/widgetSelector";
import { ColorModeContext, tokens } from "../../themes";

const Topbar = () => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	const colorMode = useContext(ColorModeContext);
	const [isWidgetSelectorOpen, setIsWidgetSelectorOpen] = useState(false);

	const handleOpenWidgetSelector = () => {
		setIsWidgetSelectorOpen(true);
	};

	const handleCloseWidgetSelector = () => {
		setIsWidgetSelectorOpen(false);
	};

	return (
		<Box display="flex" flexDirection="column" p={2} gap={2}>
			<Box
				display="flex"
				justifyContent="center"
				alignItems="center"
				backgroundColor={colors.gray[800]}
				borderRadius="3px"
				sx={{ width: "50%", margin: "0 auto" }}
			>
				<IconButton type="button" sx={{ p: 1 }}>
					<SearchIcon />
				</IconButton>
				<InputBase
					sx={{ ml: 2, flex: 1 }}
					placeholder="Search Anything..."
					border="5px"
				/>
			</Box>
			<Box display="flex" justifyContent="right" alignItems="center" gap={1}>
				<Button
					variant="outlined"
					onClick={colorMode.toggleColorMode}
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
					{theme.palette.mode === "dark" ? (
						<DarkModeOutlinedIcon />
					) : (
						<LightModeOutlinedIcon />
					)}
				</Button>
				<Button
					variant="outlined"
					endIcon={<AddIcon />}
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
				<WidgetSelector
					isOpen={isWidgetSelectorOpen}
					onClose={handleCloseWidgetSelector}
				/>
				<Button
					display="flex"
					variant="outlined"
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
					<LoopIcon />
				</Button>
				<CustomizedMenus />
			</Box>
		</Box>
	);
};

export default Topbar;
