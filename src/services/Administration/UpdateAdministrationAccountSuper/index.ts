import {DB_HOST} from '../../../database/config';

const UpdateAdministrationAccountSuper = (
  data: any,
  id: any,
  token: string,
) => {
  const optionsRequest = {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify({
      username: data.username,
      role: data.role,
      password: data.password,
      fullname: data.fullname,
      dateOfBirth: data.dateOfBirth,
      sex: data.sex,
    }),
  };

  return new Promise((resolve, reject) => {
    fetch(`${DB_HOST}/administration/update/${id}`, optionsRequest)
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

export default UpdateAdministrationAccountSuper;
