import {getDataAsyncStorage} from '../AsyncStorage';

const AutoLoginCheck = new Promise((resolve, reject) => {
  getDataAsyncStorage('autoLogin')
    .then((res: any) => {
      if (res) {
        resolve('Autologin on!');
      } else {
        reject('Autologin off!');
      }
    })
    .catch(err => reject(err));
});

export default AutoLoginCheck;
