import {DB_HOST} from '../../database/config';

const DatabaseCheck = new Promise((resolve, reject) => {
  fetch(`${DB_HOST}/services-connection-test`)
    .then(resJson => resJson.json())
    .then(resCheck => {
      if (resCheck.status === 'success') {
        resolve('Database Connection OK!');
      } else {
        reject('Maaf saat ini service sedang tidak tersedia!');
      }
    })
    .catch(() => {
      reject('Maaf saat ini service sedang tidak tersedia!');
    });
});

export default DatabaseCheck;
