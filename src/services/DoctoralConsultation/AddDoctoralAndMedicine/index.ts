import {DB_HOST} from '../../../database/config';

const AddDoctoralAndMedicine = (data: any, id: string, token: string) => {
  const optionsRequest = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify(data),
  };

  return new Promise((resolve, reject) => {
    fetch(`${DB_HOST}/doctoral-consultation/request/${id}`, optionsRequest)
      .then(resJson => resJson.json())
      .then(res => {
        if (res.status === 'success') {
          resolve(res.message);
        } else {
          reject(res.message);
        }
      })
      .catch(err => {
        reject(err.message);
      });
  });
};

export default AddDoctoralAndMedicine;
