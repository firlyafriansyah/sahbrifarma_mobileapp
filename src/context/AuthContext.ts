import * as React from 'react';

interface IIsLogedInContext {
  loggedInUsername: string;
  loggedInRole: number;
  setLoggedInUsername: React.Dispatch<React.SetStateAction<string>>;
  setLoggedInRole: React.Dispatch<React.SetStateAction<number>>;
}

export const IsLogedInContext = React.createContext<IIsLogedInContext>({
  loggedInUsername: '',
  loggedInRole: 0,
  setLoggedInUsername: () => {},
  setLoggedInRole: () => {},
});
