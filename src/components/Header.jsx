import React from "react";
import { AppBar, Toolbar, Button, Typography, Grid, Link } from "@mui/material";
import { useSelector } from "react-redux";
import { NavLink as RouterLink } from "react-router-dom";

const headersData = isLoggedin => [
  {
    label: "Strona Główna",
    href: "/",
  },
  {
    label: "Egzaminy",
    href: "/tests",
  },
  {
    label: "FAQ",
    href: "/about",
  },
  {
    label: isLoggedin ? "Profil" : "Zaloguj",
    href: isLoggedin ? "/profile" : "/login",
  },
  {
    label: isLoggedin ? "Wyloguj" : "Zarejestruj",
    href: isLoggedin ? "/logout" : "/register",
  },
];

const Header = () => {
  const isLoggedin = useSelector(state => state.userSignIn.userInfo !== null);

  const displayDesktop = () => {
    return (
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-around",
        }}>
        {wpzlogo}
        <div>{getMenuButtons()}</div>
      </Toolbar>
    );
  };

  const wpzlogo = (
    <Link
      {...{
        color: "inherit",
        component: RouterLink,
        to: "/",
        underline: "none",
      }}>
      <Grid container direction="row" justifyContent="flex-start" alignItems="center">
        <img src={"test.svg"} alt="logo" width="30" height="30" />
        <Typography sx={{ display: "inline" }}>WPZ-Egzaminy</Typography>
      </Grid>
    </Link>
  );

  const getMenuButtons = () => {
    return headersData(isLoggedin).map(({ label, href }) => {
      return (
        <Button
          {...{
            key: label,
            color: "inherit",
            to: href,
            component: RouterLink,
          }}>
          {label}
        </Button>
      );
    });
  };

  return (
    <header>
      <AppBar
        sx={{
          position: "relative",
          color: "black",
          backgroundColor: theme =>
            theme.palette.mode === "light" ? theme.palette.grey[200] : theme.palette.grey[800],
        }}>
        {displayDesktop()}
      </AppBar>
    </header>
  );
};

export default Header;
