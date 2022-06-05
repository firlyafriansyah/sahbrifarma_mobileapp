import AsyncStorage from '@react-native-async-storage/async-storage';

const storeDataAsyncStorage = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
    return {status: 'success'};
  } catch (e) {
    return {status: 'error save to async storage!'};
  }
};

const getDataAsyncStorage = async key => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    return {status: 'error get data from async storage!'};
  }
};

const removeDataAsyncStorage = async key => {
  try {
    await AsyncStorage.removeItem(key);
    return {status: 'success'};
  } catch (e) {
    return {status: 'error remove data from async storage!'};
  }
};

export {storeDataAsyncStorage, getDataAsyncStorage, removeDataAsyncStorage};
