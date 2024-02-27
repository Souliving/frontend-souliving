import { EncryptStorage } from 'encrypt-storage'

export const encryptedLocalStorage = new EncryptStorage(
  'secret-key',
  {
    prefix:'enc',
    encAlgorithm: 'AES',
   // storageType: 'localStorage'
  }
);

