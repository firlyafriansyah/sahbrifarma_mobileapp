const InputCheck = (...inputFieldValue: string[]) => {
  return new Promise((resolve, reject) => {
    const checkResult = inputFieldValue.includes('');
    if (checkResult) {
      reject('Nama atau Kata Sandi tidak boleh kosong!');
    } else {
      resolve('Check All Input Field Pass!');
    }
  });
};

export default InputCheck;
