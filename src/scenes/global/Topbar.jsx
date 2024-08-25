import AddIcon from "@mui/icons-material/Add";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import LoopIcon from "@mui/icons-material/Loop";
import SearchIcon from "@mui/icons-material/Search";
import { Box, Button, IconButton, InputBase, useTheme } from "@mui/material";
import React, { useContext, useState } from "react";
import CustomizedMenus from "../../components/customMenu";
import { ColorModeContext, tokens } from "../../themes";

const Topbar = () => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	const colorMode = useContext(ColorModeContext);

	const [searchQuery, setSearchQuery] = useState("");

	const handleSearchChange = (event) => {
		setSearchQuery(event.target.value);
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
					value={searchQuery}
					onChange={handleSearchChange}
					inputProps={{ "aria-label": "search" }}
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
