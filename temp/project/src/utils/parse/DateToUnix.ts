const DateToUnix = (dateString: string): string => {
  const parts = dateString.split('/');
  const dateObject = new Date(Number(parts[2]), Number(parts[1]) - 1, Number(parts[0]));
  return (dateObject.getTime() / 1000).toString();
}

export default DateToUnix;
