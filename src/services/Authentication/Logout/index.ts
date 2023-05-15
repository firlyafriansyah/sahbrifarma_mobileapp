import {DB_HOST} from '../../../database/config';
import {Decryptor} from '../../../utils';

const LogoutService = (token: string) => {
  const id = Decryptor(token);
  const optionsRequest = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: token,
    },
  };

  return new Promise((resolve, reject) => {
    fetch(`${DB_HOST}/administration/logout/${id}`, optionsRequest)
      .then(resJson => resJson.json())
      .then(res => {
        if (res.status === 'success') {
          resolve(res.message);
        } else {
          reject(res.message);
        }
      })
      .catch(err => {
        reject(err);
      });
  });
};

export default LogoutService;
