import Head from "next/head";
import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";
import { useState } from "react";
import { useRouter } from "next/router";
import classes from "../styles/login.module.css";
const GET_OTP = gql`
  mutation generateOTP($mail: NullString!) {
    generateOTP(input: { email: $mail })
  }
`;

const GET_TOKEN = gql`
  mutation login($mail: NullString!, $otp: NullString!) {
    login(input: { email: $mail, otp: $otp }) {
      sessionToken
    }
  }
`;

export default function Login() {
  const router = useRouter();
  const [otp, setOTP] = useState("");
  const [email, setemail] = useState("");
  const [iserror, setiserror] = useState(false);
  const [getOTP, { error }] = useMutation(GET_OTP);
  const [cansubmit, setcansubmit] = useState(false);
  const [getToken] = useMutation(GET_TOKEN);
  const [isEmailValid, setisEmailValid] = useState(true);
  const FetchOTP = () => {
    setisEmailValid(
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
    );
    getOTP({ variables: { mail: email } })
      .then((res) => {
        setOTP(res.data.generateOTP);
        setcansubmit(true);
        return getToken({
          variables: { mail: email, otp: res.data.generateOTP },
        });
      })
      .then((res) =>
        localStorage.setItem("auth_token", res.data.login.sessionToken)
      )
      .catch((er) => {
        console.log("error is ", er);
        setiserror(true);
        setcansubmit(false);
        return;
      });
    setiserror(false);
    setcansubmit(true);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (cansubmit) {
      setOTP("");
      setemail("");
      localStorage.setItem("isLoggedin", "true");
      router.push("/dashboard");
    }
  };
  return (
    <div>
      <Head>Login</Head>
      <form className={classes.form} onSubmit={handleSubmit}>
        <div className={classes.inline}>
          <label className={classes.label}>
            {" "}
            Email:
            <input
              className={`${classes.input} ${
                isEmailValid ? "" : classes.invalid
              }`}
              type="text"
              id="email"
              name="email"
              onChange={(e) => {
                setemail(e.target.value);
              }}
            ></input>
          </label>
          {!isEmailValid && <p>Enter valid email</p>}
          <button className={classes.button} type="button" onClick={FetchOTP}>
            Get OTP
          </button>
        </div>
        <br></br>
        <label className={classes.label}>
          OTP
          <input
            className={classes.input}
            type="text"
            id="otp"
            value={otp}
            readOnly
          ></input>
        </label>
        <br></br>
        <button className={classes.button} type="submit">
          Login now
        </button>
        {iserror && <span>Error Fetching OTP</span>}
      </form>
    </div>
  );
}
