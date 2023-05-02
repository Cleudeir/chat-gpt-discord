function validateCNPJ(cnpj: string): boolean {
  const cnpjRegex = /^(\d{2}).(\d{3}).(\d{3})\/(\d{4})-(\d{2})$/;

  if (!cnpjRegex.test(cnpj)) {
    return false;
  }

  const cnpjClear = cnpj.replace(/\D+/g, "");

  if (cnpjClear === "") {
    return false;
  }

  if (cnpjClear.length !== 14) {
    return false;
  }

  let sum = 0;
  let mod;
  let pos;
  let weight = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

  for (let i = 0; i < 12; i++) {
    sum += parseInt(cnpjClear.charAt(i)) * weight[i + 1];
  }

  mod = sum % 11;
  mod = mod < 2 ? 0 : 11 - mod;

  if (mod !== parseInt(cnpjClear.charAt(12))) {
    return false;
  }

  sum = 0;
  weight = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

  for (let i = 0; i < 13; i++) {
    sum += parseInt(cnpjClear.charAt(i)) * weight[i];
  }

  mod = sum % 11;
  mod = mod < 2 ? 0 : 11 - mod;
  
  if (mod !== parseInt(cnpjClear.charAt(13))) {
    return false;
  }

  return true;
}
export default validateCNPJ
