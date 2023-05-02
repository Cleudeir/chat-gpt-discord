export default function validateCPF(cpf: string): boolean {
    const cleanedCPF = cpf.replace(/\D+/g, '');
    
    if (cleanedCPF.length !== 11) {
      return false;
    }
    
    const invalidCPFs = [
      '00000000000',
      '11111111111',
      '22222222222',
      '33333333333',
      '44444444444',
      '55555555555',
      '66666666666',
      '77777777777',
      '88888888888',
      '99999999999',
      '12345678909',
    ];
    
    if (invalidCPFs.includes(cleanedCPF)) {
      return false;
    }
    
    let sum = 0;
    let remainingDigit = 0;
    
    for (let i = 1; i <= 9; i++) {
      sum += parseInt(cleanedCPF.substring(i - 1, i)) * (11 - i);
    }
  
    remainingDigit = (sum * 10) % 11;
    
    if ((remainingDigit === 10) || (remainingDigit === 11)) {
      remainingDigit = 0;
    }
    
    if (remainingDigit !== parseInt(cleanedCPF.substring(9, 10))) {
      return false;
    }
    
    sum = 0;
    
    for (let i = 1; i <= 10; i++) {
      sum += parseInt(cleanedCPF.substring(i - 1, i)) * (12 - i);
    }
    
    remainingDigit = (sum * 10) % 11;
    
    if ((remainingDigit === 10) || (remainingDigit === 11)) {
      remainingDigit = 0;
    }
    
    if (remainingDigit !== parseInt(cleanedCPF.substring(10, 11))) {
      return false;
    }
    
    return true;
  }