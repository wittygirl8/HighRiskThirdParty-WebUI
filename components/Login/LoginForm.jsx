"use client";
import React, { useRef } from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function LoginForm(props) {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const AuthenticationHandler = (event) => {
    event.preventDefault();
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;
    props.onAuthenticationSubmit({ username, password });
    usernameRef.current.value = "";
    passwordRef.current.value = "";
  };
  return (
    <>
      <Form onSubmit={AuthenticationHandler}>
        <h6>Sign In</h6>
        <div className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="text"
            ref={usernameRef}
            className="form-control"
            placeholder="Enter email"
          />
        </div>
        <div className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            className="form-control"
            ref={passwordRef}
            placeholder="Enter password"
          />
        </div>
        <div className="d-grid">
          <Button type="submit" className="btn btn-primary">
            Submit
          </Button>
        </div>
        <div>
          <p className="forgot-password text-right">
            Forgot <a href="#">password?</a>
          </p>
        </div>
      </Form>
    </>
  );
}

export default LoginForm;
