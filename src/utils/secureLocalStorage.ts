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
export const updateSecureLocalStorage = (key: string, updatedData: any) => {
  // Получить существующие данные из локального хранилища
  console.log(key, updatedData)
  const storedData = encryptedLocalStorage.getItem(key);
  for (const k in storedData) {
    if (storedData.hasOwnProperty(k) && updatedData.hasOwnProperty(k)) {
      storedData[k] = updatedData[k];
    }
  }
  encryptedLocalStorage.setItem(key, decode(storedData));
  console.log('loc', encryptedLocalStorage.getItem(key))
};

