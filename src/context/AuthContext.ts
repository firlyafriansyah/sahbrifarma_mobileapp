import * as React from 'react';

interface IIsLogedInContext {
  loggedInRole: string;
  loggedInToken: string;
  setLoggedInRole: React.Dispatch<React.SetStateAction<string>>;
  setLoggedInToken: React.Dispatch<React.SetStateAction<string>>;
}

export const IsLogedInContext = React.createContext<IIsLogedInContext>({
  loggedInRole: '',
  loggedInToken: '',
  setLoggedInRole: () => {},
  setLoggedInToken: () => {},
});
