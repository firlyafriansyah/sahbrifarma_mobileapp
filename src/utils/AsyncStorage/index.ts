import AsyncStorage from '@react-native-async-storage/async-storage';

const storeDataAsyncStorage = async (key: string, value: any) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
    return {status: 'success'};
  } catch (e) {
    return {status: 'error save to async storage!'};
  }
};

const getDataAsyncStorage = async (key: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    return {status: 'error get data from async storage!'};
  }
};

const removeDataAsyncStorage = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
    return {status: 'success'};
  } catch (e) {
    return {status: 'error remove data from async storage!'};
  }
};

const multiRemoveDataAsyncStorage = async (key1: string, key2: string) => {
  try {
    await AsyncStorage.multiRemove([key1, key2]);
    return {status: 'success'};
  } catch (e) {
    return {status: 'error remove data from async storage!'};
  }
};

export {
  storeDataAsyncStorage,
  getDataAsyncStorage,
  removeDataAsyncStorage,
  multiRemoveDataAsyncStorage,
};
