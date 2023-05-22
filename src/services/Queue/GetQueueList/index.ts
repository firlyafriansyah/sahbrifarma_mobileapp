import {DB_HOST} from '../../../database/config';

const GetQueueList = (token: string) => {
  const optionsRequest = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: token,
    },
  };

  return new Promise((resolve, reject) => {
    fetch(`${DB_HOST}/queue`, optionsRequest)
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

export default GetQueueList;
