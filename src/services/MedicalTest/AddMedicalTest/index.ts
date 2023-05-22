import {DB_HOST} from '../../../database/config';

const AddMedicalTest = (data: any, id: string, token: string) => {
  const optionsRequest = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify({
      bodyHeight: parseFloat(data.bodyHeight),
      bodyWeight: parseFloat(data.bodyWeight),
      bodyTemperature: parseFloat(data.bodyTemperature),
      bloodPressure: data.bloodPressure,
      bloodSugar: parseFloat(data.bloodSugar),
      uricAcid: parseFloat(data.uricAcid),
      cholesterol: parseFloat(data.cholesterol),
    }),
  };

  return new Promise((resolve, reject) => {
    fetch(`${DB_HOST}/medical-test/${id}`, optionsRequest)
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

export default AddMedicalTest;
