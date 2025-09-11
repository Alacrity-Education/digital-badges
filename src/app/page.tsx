"use client";
import { Suspense } from "react";
import { update } from "./actions";


export default function Home() {
  // 1st: fetch from an api route
  // 2nd make a form action

  //const result = await fetch("http://localhost:3000/api/organizations").then((res) => res.json());
  // explain me in code or comments or in separate file (recommended) what your api reoute returns
  return (
    <form action={update} className="w-screen h-screen flex flex-col justify-center items-center">
      <button type="submit" className="btn btn-accent">Click me</button>
      {/* {result.message} */}
    </form>
  );
}


