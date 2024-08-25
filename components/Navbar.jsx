"use client";

import Image from "next/image";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logo from "@/../../public/logo.svg";
import { useRouter } from "next/router";
import { useState } from "react";
import { destroyCookie, parseCookies } from "nookies";

function GSKNavbar() {
  const router = useRouter();
  let { token } = parseCookies(null, "token");

  const logoutHandler = () => {
    destroyCookie(null, "token", {
      path: "/",
    });
    router.push("/");
  };

  return (
    <>
      <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="/">
            <Image
              alt=""
              src={logo}
              width="125"
              height="40"
              className="d-inline-block align-top"
            />
          </Navbar.Brand>
          <Nav>
            {token && <Nav.Link href="/deepdive">Deepdive</Nav.Link>}
            {token && <Nav.Link href="/dashboard">Dashboard</Nav.Link>}
            {token && <Nav.Link onClick={logoutHandler}>Logout</Nav.Link>}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default GSKNavbar;
