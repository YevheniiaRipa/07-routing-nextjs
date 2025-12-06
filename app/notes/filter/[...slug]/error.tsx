'use client';

interface FilterErrorProps {
  error: Error;
  reset: () => void;
}

export default function FilterError({ error, reset }: FilterErrorProps) {
  return (
    <div>
      <h2>Something went wrong while filtering!</h2>
      <p>{error.message}</p>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}
