const AgeCalculator = (birthDay: string) => {
  const birth = new Date(birthDay);
  const year = birth.getFullYear();
  const month = birth.getMonth();
  const date = birth.getDate();

  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();
  const currentDate = now.getDate();

  let yearAge, monthAge, dateAge;

  yearAge = currentYear - year;

  if (currentMonth >= month) {
    monthAge = currentMonth - month;
  } else {
    yearAge--;
    monthAge = 12 + currentMonth - month;
  }

  if (currentDate >= date) {
    dateAge = currentDate - date;
  } else {
    monthAge--;
    dateAge = 31 + currentDate - date;

    if (monthAge < 0) {
      monthAge = 11;
      yearAge--;
    }
  }

  return `${yearAge} th  ${monthAge} bln  ${dateAge} hr`;
};

export default AgeCalculator;
