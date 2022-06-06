import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signIn } from "../store/actions/userActions";
import { createStyles, makeStyles } from "@mui/styles";
import Backdrop from "@mui/material/Backdrop";
import Paper from "@mui/material/Paper";
import InputAdornment from "@mui/material/InputAdornment";
import FormInput from "./FormInput";
import IconButton from "@mui/material/IconButton";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Link from "@mui/material/Link";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
      "& > *": {
        marginTop: "7%",
        margin: "auto",
        backgroundColor: "#ffffff",
      },
    },
    box: {
      display: "flex",
      flexDirection: "column",
      [theme.breakpoints.up("sm")]: {
        width: "70%",
      },
      [theme.breakpoints.up("md")]: {
        width: "60%",
      },
      [theme.breakpoints.up("lg")]: {
        width: "40%",
      },
      borderColor: "black",
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 100,
      backgroundColor: "transparent",
    },
    title: {
      textAlign: "center",
      fontSize: 30,
    },
    form: {
      marginTop: "2%",
      marginLeft: "8%",
    },
    label: {
      marginTop: 10,
      marginBottom: 10,
      fontSize: "1.3em",
    },
    login: {
      fontSize: "1.1em",
      background: "linear-gradient(to right, #b2fefa, #0ed2f7)",
      marginTop: "1%",
      border: 0,
      borderRadius: 5,
      boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
      color: "white",
      height: 46,
      padding: "0 30px",
      cursor: "pointer",
    },
    icon: {
      marginBottom: 13,
    },
    loginBox: {
      textAlign: "center",
      marginRight: "5%",
      marginTop: "1%",
      marginBottom: "2%",
    },
    toRegister: {
      cursor: "pointer",
      fontSize: "1.1rem",
    },
    errors: {
      marginLeft: "2%",
      color: "red",
      fontSize: "1.1em",
    },
  }),
);

const LoginCard = ({ userInfo }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userSignIn = useSelector(state => state.userSignIn);
  const { loading, error, success } = userSignIn;

  const schema = yup.object().shape({
    username: yup.string().required("Nick jest wymaganym polem"),
    password: yup.string().required("Hasło jest wymaganym polem"),
  });

  const handleToggle = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = data => {
    dispatch(signIn(data.username, data.password));
    handleToggle();
    handleClose();
    reset();
  };

  const handleRedirectClick = () => {
    navigate("/register");
  };

  return (
    <div className={classes.root}>
      <Box className={classes.box}>
        <Paper elevation={3}>
          <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
            <FormInput
              labelTitle="Nick"
              name="username"
              control={control}
              register={register}
              setValue={setValue}
              errors={errors?.username}
              numberRows={1}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon className={classes.icon} />
                  </InputAdornment>
                ),
              }}
              type="text"
            />
            <FormInput
              labelTitle="Hasło"
              name="password"
              control={control}
              register={register}
              errors={errors?.password}
              setValue={setValue}
              numberRows={1}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon className={classes.icon} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}>
                      {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              type={showPassword ? "text" : "password"}
            />
            <span className={classes.errors}>
              {error && error.status === 403 ? "Niepoprawny login lub hasło!" : ""}
            </span>
            <div className={classes.loginBox}>
              <input type="submit" value="Login" className={classes.login} />
            </div>
          </form>
        </Paper>
        <Link className={classes.toRegister} variant="outlined" onClick={handleRedirectClick}>
          Nie masz konta? Zarejestruj się
        </Link>
      </Box>
      {loading ? (
        <Backdrop
          className={classes.backdrop}
          open={open}
          transitionDuration={1500}
          invisible={true}
          onClick={handleClose}>
          <CircularProgress color="secondary" />
        </Backdrop>
      ) : (
        ""
      )}
    </div>
  );
};

export default LoginCard;
