import {DB_HOST} from '../../../database/config';

const GetMedicalTestList = (id: string, token: string) => {
  const optionsRequest = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: token,
    },
  };

  return new Promise((resolve, reject) => {
    fetch(`${DB_HOST}/medical-test/${id}`, optionsRequest)
      .then(resJson => resJson.json())
      .then(res => {
        if (res.status === 'success') {
          resolve(res.data.medicalTestList);
        } else {
          reject(res.message);
        }
      })
      .catch(err => {
        reject(err);
      });
  });
};

export default GetMedicalTestList;
