"use client";
import GSKNavbar from "../../components/Navbar";
import Row from "react-bootstrap/Row";
import { useRouter } from "next/router";
import Login from "../../components/Login/Login";
import Col from "react-bootstrap/Col";
import { parseCookies, setCookie, destroyCookie } from "nookies";

export default function Home() {
  const router = useRouter();
  function loginHandler(token) {
    if (token) {
      setCookie(null, "token", token, {
        path: "/",
      });
      router.push("/deepdive");
    }
  }
  return (
    <>
      <GSKNavbar />
      <Row>
        <Col></Col>
        <Col className="pt-5">
          <Login onLogin={loginHandler} router={router} />
        </Col>
        <Col>v1.1.0</Col>
      </Row>
    </>
  );
}
