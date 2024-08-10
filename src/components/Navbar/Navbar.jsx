import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import { ShoppingCart } from "@mui/icons-material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import { useContext, useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import {alpha, FormControl, InputAdornment, OutlinedInput} from "@mui/material";
import {useNavigate, useSearchParams} from "react-router-dom";
import './Navbar.css';
import Logout from "../logout/Logout";
import useAuth from "../../common/hooks/useAuth";

const Navbar = () => {

    const [anchorElNav, setAnchorElNav] = useState(null);
    const { AuthCtx } = useAuth();
    const { loggedInUser, hasRole } = useContext(AuthCtx);
    const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const [searchFor, setSearchFor] = useState(searchParams.get("searchFor") || "");

    const pages = [
        {
            id: "1",
            label: "Home",
            url: "/home",
            visible: loggedInUser != null,
        },
        {
            id: "2",
            label: "Add Product",
            url: "/product/add",
            visible: loggedInUser != null && hasRole(["ADMIN"]),
        },
        {
            id: "3",
            label: "Login",
            url: "/login",
            visible: loggedInUser == null,
        },
        {
            id: "4",
            label: "Sign Up",
            url: "/signup",
            visible: loggedInUser == null,
        },
    ];

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

	let changeVal = (val) => {
		setSearchFor(val);
	}

	let blurVal = (val) => {
		if(val !== null && val.length > 0) {
			navigate("/home?searchFor=" + val);
		} else {
			navigate("/home");
		}
	}

    return (
        <AppBar sx={{ bgcolor: "#3f51b5", position: 'fixed' }}>
            <Container maxWidth={false}>
                <Toolbar disableGutters>
                    <ShoppingCart sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/home"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        upGrad E-Shop
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((element) => {
                                if (element.visible) {
                                    return (
                                        <MenuItem key={"menu_item_" + element.id} onClick={handleCloseNavMenu}>
                                            <Link key={"link_" + element.id} to={element.url}>
                                                <Typography textAlign="center">{element.label}</Typography>
                                            </Link>
                                        </MenuItem>
                                    );
                                }
                                return null;
                            })}
                            {
                                loggedInUser != null &&
                                <MenuItem key="5" onClick={handleCloseNavMenu}>
                                    <Logout />
                                </MenuItem>
                            }
                        </Menu>
                    </Box>

                    <ShoppingCart sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        upGrad E-Shop
                    </Typography>

                    <Box sx={{ flexGrow: 1 }} />

                    {
                        loggedInUser != null &&
                        <FormControl variant="outlined" className="search-box">
                            <OutlinedInput
                                id="search"
                                value={searchFor}
                                onChange={(event) => changeVal(event.target.value)}
                                onBlur={(event) => blurVal(event.target.value)}
                                onKeyDown={(event) => {
                                    if (event.key === "Enter") {
                                        blurVal(event.target.value);
                                    }
                                }}
                                startAdornment={
                                    <InputAdornment position="start">
                                        <SearchIcon sx={{ color: "#FFFFFF" }} />
                                    </InputAdornment>
                                }
                                aria-describedby="search"
                                placeholder={"Search..."}
                                inputProps={{
                                    'aria-label': 'search',
                                }}
                                size="small"
                                sx={{
                                    color: "#FFFFFF",
                                    borderRadius: 2,
                                    backgroundColor: (theme) => alpha(theme.palette.common.white, 0.15),
                                    '&:hover': {
                                        backgroundColor: (theme) => alpha(theme.palette.common.white, 0.25),
                                    },
                                    width: "100%"
                                }}
                            />
                        </FormControl>
                    }

                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((element) => {
                            if (element.visible) {
                                return (
                                    <Link key={"main_link_" + element.id} to={element.url}>
                                        <Button
                                            key={"button_link_" + element.id}
                                            sx={{ my: 2, color: 'white', display: 'block', textTransform: "none" }}
                                        >
                                            <u>{element.label}</u>
                                        </Button>
                                    </Link>
                                );
                            }
                            return null;
                        })}
                        {
                            loggedInUser != null &&
                            <Logout sx={{ my: 2, ml: 2, color: 'white', display: 'block' }} />
                        }
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Navbar;