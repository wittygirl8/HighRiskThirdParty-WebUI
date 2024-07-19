import LoginForm from "./LoginForm";
import React, { useRef } from "react";
import md5 from "md5-hash";
import { encode as base64_encode } from "base-64";
import { parseCookies, setCookie, destroyCookie } from "nookies";

function Login(props) {
  if (typeof window !== "undefined") {
    let { token } = parseCookies(null, "token");
    if (token) props.router.push("/deepdive");
  }
  const AuthenticateHandler = (credentials) => {
    var username = credentials["username"];
    var password = credentials["password"];
    if (username != "" && password != "") {
      const res = fetch(process.env.API_URL + "/auth/login", {
        method: "POST",
        body: JSON.stringify({
          username: username,
          password: base64_encode(md5(password)),
        }),
        headers: {
          "content-Type": "application/json",
          "Access-Control-Allow-Origin": process.env.BASE_URL,
          "Access-Control-Allow-Credentials": "true",
        },
      })
        .then((response) => {
          if (response.status == 200) {
            const token = response.headers.get("authorization");
            var name = username.toLowerCase();
            localStorage.setItem(
              "name",
              name.charAt(0).toUpperCase() + name.slice(1)
            );
            props.onLogin(token.split(" ")[1]);
          } else {
            alert("Invalid credentials");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert("Username/Password can't be empty");
    }
  };
  return (
    <>
      <LoginForm onAuthenticationSubmit={AuthenticateHandler} />
    </>
  );
}
export default Login;
