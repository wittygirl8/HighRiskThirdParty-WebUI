"use client";

import Image from "next/image";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useRouter } from "next/router";
import { useState } from "react";
import { destroyCookie, parseCookies } from "nookies";
import Link from "next/link";

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
          <Navbar.Brand href="/">Company</Navbar.Brand>
          <Nav>
            {token && (
              <Link href="/deepdive" className="nav-link">
                Deepdive
              </Link>
            )}
            {token && (
              <Link href="/dashboard" className="nav-link">
                Dashboard
              </Link>
            )}
            {token && <Nav.Link onClick={logoutHandler}>Logout</Nav.Link>}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default GSKNavbar;
