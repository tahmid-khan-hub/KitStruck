"use client";
import { Jersey } from "@/types/jersey";

interface Props {
  jersey: Jersey;
}

export default function JerseyDetailsContainer({ jersey }: Props) {
  return (
    <div>
      <h1>{jersey.name}</h1>
    </div>
  );
}