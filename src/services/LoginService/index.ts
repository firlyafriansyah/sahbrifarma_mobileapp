import {DB_HOST} from '../../database/config';
import {storeDataAsyncStorage} from '../../utils/AsyncStorage';

const LoginService = (username: string, password: string) => {
  const optionsRequest = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  };

  return new Promise((resolve, reject) => {
    fetch(`${DB_HOST}/admin/login`, optionsRequest)
      .then(resJson => resJson.json())
      .then(res => {
        if (res.status === 'success') {
          storeDataAsyncStorage('admin', {
            adminName: res.data.username,
            adminRole: res.data.role,
          })
            .then(() => {
              if (res.status === 'success') {
                resolve('Login success!');
              } else {
                reject(res.status);
              }
            })
            .catch(() => {
              reject('Async storage pada device tidak bisa digunakan!');
            });
        } else {
          reject('Nama dan Kata Sandi salah. Periksa Kembali!');
        }
      })
      .catch(() => {
        reject('Kesalahan pada sistem. Silahkan coba lagi!');
      });
  });
};

export default LoginService;
