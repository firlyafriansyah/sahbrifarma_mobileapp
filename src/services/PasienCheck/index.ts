import {DB_HOST} from '../../database/config';

const PasienCheck = (id: string) => {
  return new Promise((resolve, reject) => {
    fetch(`${DB_HOST}/pasien/checkId/${id}`)
      .then(resJson => resJson.json())
      .then(res => {
        if (res.status === 'success') {
          resolve('Pasien found!');
        } else {
          reject('pasien not found!');
        }
      })
      .catch(() => {
        reject('pasien not found!');
      });
  });
};

export default PasienCheck;
