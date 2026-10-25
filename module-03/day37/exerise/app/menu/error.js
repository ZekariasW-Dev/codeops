"use client";

export default function MenuError({ error, reset }) {
  return (
    <main>
      <h1>Menu error</h1>
      <p>{error.message}</p>
      <button onClick={() => reset()}>Try again</button>
    </main>
  );
}