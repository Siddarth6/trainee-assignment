/* eslint-disable no-unused-vars */
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { alpha, styled, useTheme } from "@mui/material/styles";
import * as React from "react";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../themes";

const StyledMenu = styled((props) => (
	<Menu
		elevation={0}
		anchorOrigin={{
			vertical: "bottom",
			horizontal: "right",
		}}
		transformOrigin={{
			vertical: "top",
			horizontal: "right",
		}}
		{...props}
	/>
))(({ theme }) => ({
	"& .MuiPaper-root": {
		borderRadius: 6,
		marginTop: theme.spacing(1),
		minWidth: 180,
		color:
			theme.palette.mode === "light"
				? theme.palette.text.primary
				: theme.palette.text.secondary,
		backgroundColor:
			theme.palette.mode === "light"
				? theme.palette.background.paper
				: theme.palette.background.default,
		boxShadow:
			"rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
		"& .MuiMenu-list": {
			padding: "4px 0",
		},
		"& .MuiMenuItem-root": {
			"& .MuiSvgIcon-root": {
				fontSize: 18,
				color: theme.palette.text.secondary,
				marginRight: theme.spacing(1.5),
			},
			"&:active": {
				backgroundColor: alpha(
					theme.palette.primary.main,
					theme.palette.action.selectedOpacity
				),
			},
		},
	},
}));

export default function CustomizedMenus() {
	const theme1 = useTheme();
	const colors = tokens(theme1.palette.mode);
	const colorMode = useContext(ColorModeContext);
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [selectedOption, setSelectedOption] = React.useState("Options");
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleMenuItemClick = (option) => {
		setSelectedOption(option);
		handleClose();
	};

	const theme = useTheme();
	return (
		<div>
			<Button
				id="demo-customized-button"
				aria-controls={open ? "demo-customized-menu" : undefined}
				aria-haspopup="true"
				aria-expanded={open ? "true" : undefined}
				variant="outlined"
				disableElevation
				onClick={handleClick}
				endIcon={<KeyboardArrowDownIcon />}
				sx={{
					"&:hover": {
						borderColor: alpha(theme1.palette.primary.main, 0.8),
						backgroundColor: alpha(theme1.palette.primary.main, 0.1),
					},
					borderColor:
						theme1.palette.mode === "dark"
							? colors.gray[300]
							: theme1.palette.primary.main,
					color:
						theme1.palette.mode === "dark"
							? colors.gray[300]
							: theme1.palette.primary.main,
				}}
			>
				{selectedOption}
			</Button>
			<StyledMenu
				id="demo-customized-menu"
				MenuListProps={{
					"aria-labelledby": "demo-customized-button",
				}}
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
			>
				<MenuItem
					onClick={() => handleMenuItemClick("Last 1 Day")}
					disableRipple
				>
					Last 1 Day
				</MenuItem>
				<MenuItem
					onClick={() => handleMenuItemClick("Last 2 Days")}
					disableRipple
				>
					Last 2 Days
				</MenuItem>
				<MenuItem
					onClick={() => handleMenuItemClick("Last 7 Days")}
					disableRipple
				>
					Last 7 Days
				</MenuItem>
				<MenuItem
					onClick={() => handleMenuItemClick("Last 30 Days")}
					disableRipple
				>
					Last 30 Days
				</MenuItem>
			</StyledMenu>
		</div>
	);
}
