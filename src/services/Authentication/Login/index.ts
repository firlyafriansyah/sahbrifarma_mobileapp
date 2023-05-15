import {DB_HOST} from '../../../database/config';

const LoginService = (username: string, password: string) => {
  const optionsRequest = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  };

  return new Promise((resolve, reject) => {
    fetch(`${DB_HOST}/administration/login`, optionsRequest)
      .then(resJson => resJson.json())
      .then(res => {
        if (res.status === 'success') {
          resolve(res.data);
        } else {
          reject(res.message);
        }
      })
      .catch(err => {
        reject(err);
      });
  });
};

export default LoginService;
