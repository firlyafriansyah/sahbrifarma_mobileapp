import {DB_HOST} from '../../../database/config';

const RegisterAdministration = (data: any, token: string) => {
  const optionsRequest = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify({
      username: data.username,
      password: data.password,
      role: data.role,
      fullname: data.fullname,
      dateOfBirth: data.dateOfBirth,
      sex: data.sex,
    }),
  };

  return new Promise((resolve, reject) => {
    fetch(`${DB_HOST}/administration/register`, optionsRequest)
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

export default RegisterAdministration;
