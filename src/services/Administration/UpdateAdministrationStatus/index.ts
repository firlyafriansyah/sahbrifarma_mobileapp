import {DB_HOST} from '../../../database/config';

const UpdateAdministrationStatus = (status: any, id: string, token: string) => {
  const optionsRequest = {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: token,
    },
  };

  return new Promise((resolve, reject) => {
    fetch(
      `${DB_HOST}/administration/update-status/${id}/${status}`,
      optionsRequest,
    )
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

export default UpdateAdministrationStatus;
