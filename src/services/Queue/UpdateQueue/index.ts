import {DB_HOST} from '../../../database/config';

const UpdateQueue = (
  id: string,
  currentStatus: string,
  newStatus: string,
  token: string,
) => {
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
      `${DB_HOST}/queue/update/${id}&${currentStatus}&${newStatus}`,
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

export default UpdateQueue;
