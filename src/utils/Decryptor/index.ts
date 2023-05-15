import CryptoJS from 'crypto-js';

const Decryptor = (token: string) => {
  if (token) {
    const bytes = CryptoJS.AES.decrypt(token, '_f1rly_');
    const id = parseInt(bytes.toString(CryptoJS.enc.Utf8), 10);

    return id;
  }

  return false;
};

export default Decryptor;
