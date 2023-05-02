const parseCpfCnpj = (value: string): string => {
  const regex = /^([0-9]{3})([0-9]{3})([0-9]{3})([0-9]{2})$/;

  if (regex.test(value)) {
    return `${value.replace(regex, "$1.$2.$3-$4")}`;
  } else {
    const regexCnpj = /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/;

    if (regexCnpj.test(value)) {
      return `${value.replace(regexCnpj, "$1.$2.$3/$4-$5")}`;
    }
  }

  return value;
};
export default parseCpfCnpj;