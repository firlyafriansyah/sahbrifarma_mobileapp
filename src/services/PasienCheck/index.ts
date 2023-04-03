import {DB_HOST} from '../../database/config';

const PasienCheck = (id: string) => {
  console.log(id, 'id');
  return new Promise((resolve, reject) => {
    fetch(`${DB_HOST}/pasien/checkId/${id}`)
      .then(resJson => resJson.json())
      .then(res => {
        console.log(res);
        if (res.status === 'success') {
          resolve('Pasien found!');
        } else {
          reject('pasien not found!');
        }
      })
      .catch(err => {
        console.log(err, 'sasa');
        reject('pasien not found!');
      });
  });
};

export default PasienCheck;
