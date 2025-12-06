'use client';

import { useEffect } from 'react';

interface NoteDetailsErrorProps {
  error: Error;
  reset: () => void;
}

function NoteDetailsError({ error, reset }: NoteDetailsErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div>
      <h2>Something went wrong!</h2>
      <p>Could not fetch note details. {error.message}</p>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}

export default NoteDetailsError;
