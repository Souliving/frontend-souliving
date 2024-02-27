import { EncryptStorage } from 'encrypt-storage'

export const encryptedLocalStorage = new EncryptStorage(
  'secret-key',
  {
    prefix:'enc',
    encAlgorithm: 'AES',
   // storageType: 'localStorage'
  }
);

const decode = (value:any) => {
  return JSON.stringify(value)
}

export const useSecureLocalStorage = (key:any, defaultState:any) => {
  console.log('useSecureLocalStorage', key, decode(defaultState))
  encryptedLocalStorage.setItem(key, decode(defaultState))
}

