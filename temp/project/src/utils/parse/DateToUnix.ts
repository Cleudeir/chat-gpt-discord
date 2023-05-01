const DateToUnix = (date: string): string => {
  const [day, month, year] = date.split('/');
  const unixTime = new Date(Number(year), Number(month) - 1, Number(day)).getTime() / 1000;
  return unixTime.toString();
};

export default DateToUnix;
