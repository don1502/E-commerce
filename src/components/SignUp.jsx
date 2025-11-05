import React, { useState } from "react";
import { Paper, Typography, TextField, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = Yup.object().shape({
  name: Yup.string().required("Enter your Name"),
  email: Yup.string()
    .email()
    .required("Enter your Email")
    .matches(/^[a-z0-9]+@[a-z]{2,6}.[a-z]+$/),
  password: Yup.string().required("Enter your Password"),
  cPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Password is not matching"
  ),
});

const SignUp = () => {
  let [input, setInput] = useState("");
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  let handleData = (data) => {};

  return (
    <>
      <center>
        <Paper
          elevation={20}
          component="form"
          onSubmit={handleSubmit(handleData)}
          style={{
            width: "400px",
            padding: "20px",
            margin: "20px, auto",
            display: "grid",
            gap: "20px",
          }}
        >
          <Typography
            style={{ color: "blueviolet", paddingBottom: "20px" }}
            textAlign="center"
          >
            Create Account
          </Typography>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            {...register("name")} // {...register("name", { required: "Enter your Name" })} We can use this also to shoe errors and required....
            error={!!errors.name} // !! is used to convert it into boolean
            helperText={errors.name?.message} // ? used here is known as chaining operator
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <TextField
            label="Confirm Password"
            variant="outlined"
            fullWidth
            {...register("cPassword")}
            error={!!errors.cPassword}
            helperText={errors.cPassword?.message}
          />
          <Button type="submit" variant="outlined">
            {" "}
            Sign Up{" "}
          </Button>
        </Paper>
      </center>
    </>
  );
};

export default SignUp;
