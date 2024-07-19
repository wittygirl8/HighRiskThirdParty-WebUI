"use client";

import Image from "next/image";
import { Card } from "react-bootstrap";

export default function Labels() {
  return (
    <Card style={{ width: "18rem", borderStyle: "none" }} className="m-5 mt-0">
      <Image src="/legends.png" width="304" height="362" />
    </Card>
  );
}
