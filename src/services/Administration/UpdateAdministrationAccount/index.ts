import {DB_HOST} from '../../../database/config';
import {Decryptor} from '../../../utils';

const UpdateAdministrationAccount = (data: any, token: string) => {
  const id = Decryptor(token);
  const optionsRequest = {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify({
      fullname: data.fullname,
      dateOfBirth: data.dateOfBirth,
      sex: data.sex,
    }),
  };

  return new Promise((resolve, reject) => {
    fetch(`${DB_HOST}/administration/self-update/${id}`, optionsRequest)
      .then(resJson => resJson.json())
      .then(res => {
        if (res.status === 'success') {
          resolve(res.updateAdministrationAccount);
        } else {
          reject(res.message);
        }
      })
      .catch(err => {
        reject(err);
      });
  });
};

export default UpdateAdministrationAccount;
