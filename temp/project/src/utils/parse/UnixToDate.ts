export default function UnixToDate(unixDate: string): string {
  const parsedUnixDate = parseInt(unixDate, 10);
  if (isNaN(parsedUnixDate)) {
    throw new Error("Invalid unix date format");
  }
  const date = new Date(parsedUnixDate * 1000);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear().toString();
  return `${day}/${month}/${year}`;
}
