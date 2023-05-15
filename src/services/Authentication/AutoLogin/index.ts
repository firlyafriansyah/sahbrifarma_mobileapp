import {DB_HOST} from '../../../database/config';

const AutoLogin = (token: string) => {
  const optionsRequest = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authentication: token,
    },
  };

  return new Promise((resolve, reject) => {
    fetch(`${DB_HOST}/administration/autologin`, optionsRequest)
      .then(resJson => resJson.json())
      .then(res => {
        if (res.status === 'success') {
          resolve(res.status);
        } else {
          reject(res.message);
        }
      })
      .catch(err => {
        reject(err);
      });
  });
};

export default AutoLogin;
