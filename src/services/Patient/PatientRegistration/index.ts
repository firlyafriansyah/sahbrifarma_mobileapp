import {DB_HOST} from '../../../database/config';

const PatientRegistrationService = (data: any, token: string) => {
  const optionsRequest = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify({
      nama_lengkap: data.name,
      alamat: data.address,
      tanggal_lahir: data.dateOfBirth,
      jenis_kelamin: data.sex,
      nomor_telepon: data.phoneNumber || null,
      nomor_telepon_darurat: data.emergencyPhoneNumber || null,
    }),
  };

  return new Promise((resolve, reject) => {
    fetch(`${DB_HOST}/patient/register`, optionsRequest)
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

export default PatientRegistrationService;
