'use client';

import { useEffect } from 'react';

interface NotesErrorProps {
  error: Error;
  reset: () => void;
}

function NotesError({ error, reset }: NotesErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div>
      <h2>Something went wrong!</h2>
      <p>Could not fetch the list of notes. {error.message}</p>
      <button onClick={reset}>Try again</button>
    </div>
  );
}

export default NotesError;
