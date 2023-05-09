import { TextField, Typography } from "@mui/material";

const Labelinput = (props) => {
  return (
    <>
      <Typography
        variant="body1"
        sx={{ fontFamily: "Arial, sans-serif", fontSize: "150%" }}
      >
        {props.textHandler}
      </Typography>
      {/* <label>{props.textHandler}</label> */}

      <TextField
        type={props.typeHandler}
        onChange={props.onChangeHandler}
        value={props.valueChangeHandler}
        style={{ width: "50%" }}
      ></TextField>
    </>
  );
};

export default Labelinput;
