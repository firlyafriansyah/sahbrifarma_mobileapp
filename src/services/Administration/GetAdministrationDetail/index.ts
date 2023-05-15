import {DB_HOST} from '../../../database/config';
import {Decryptor} from '../../../utils';

const GetAdministrationAccountDetail = (token: string) => {
  const id = Decryptor(token);
  const optionsRequest = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: token,
    },
  };

  return new Promise((resolve, reject) => {
    fetch(`${DB_HOST}/administration/detail/${id}`, optionsRequest)
      .then(resJson => resJson.json())
      .then(res => {
        if (res.status === 'success') {
          resolve(res.administrationAccount);
        } else {
          reject(res.message);
        }
      })
      .catch(err => {
        reject(err);
      });
  });
};

export default GetAdministrationAccountDetail;
