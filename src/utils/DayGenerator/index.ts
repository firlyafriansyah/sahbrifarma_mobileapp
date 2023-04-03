const DayGenerator = () => {
  const currentTime = new Date().getHours();

  if (currentTime >= 0 && currentTime <= 10) {
    return 'Pagi 🌤️';
  } else if (currentTime >= 11 && currentTime <= 15) {
    return 'Siang ☀️';
  } else if (currentTime >= 16 && currentTime <= 19) {
    return 'Sore ☁️';
  } else {
    return 'Malam 🌙';
  }
};

export default DayGenerator;
