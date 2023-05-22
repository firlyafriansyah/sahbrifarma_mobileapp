import {DB_HOST} from '../../../database/config';

const UpdatePatientInformation = (data: any, token: string) => {
  const optionsRequest = {
    method: 'PUT',
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
    fetch(`${DB_HOST}/patient/update/${data.id}`, optionsRequest)
      .then(resJson => resJson.json())
      .then(res => {
        if (res.status === 'success') {
          resolve(res.updateAdministrationAccount);
        } else {
          reject(res.message);
        }
      })
      .catch(err => {
        reject(err);
      });
  });
};

export default UpdatePatientInformation;
