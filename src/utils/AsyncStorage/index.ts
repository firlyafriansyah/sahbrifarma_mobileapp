import AsyncStorage from '@react-native-async-storage/async-storage';

const storeDataAsyncStorage = async (key: string, value: any) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
    return 'Success store data!';
  } catch (e) {
    return 'Error store data!';
  }
};

const getDataAsyncStorage = async (key: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    return {status: `error get data from async storage! - ${e}`};
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

const clearAsyncStorage = async () => {
  try {
    await AsyncStorage.clear();
    return 'Success clear data!';
  } catch (e) {
    return 'Error clear data!';
  }
};

export {
  storeDataAsyncStorage,
  getDataAsyncStorage,
  removeDataAsyncStorage,
  multiRemoveDataAsyncStorage,
  clearAsyncStorage,
};
