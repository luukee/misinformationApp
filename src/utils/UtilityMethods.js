import AsyncStorage from "@react-native-async-storage/async-storage";

class UtilityMethods {

    isEmailValid = (email) => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return reg.test(email);
    }

    textContainsAnAlphabetCharacter = (text) =>{
        let reg = /^(?=.*[a-z])(?=.*[A-Z])/;
        return reg.test(text);
    }

    textContainsAnInteger = (text) =>{
        let reg = /^(?=.*[0-9])/;
        return reg.test(text);
    }

    textContainsSpecialCharacter = (text) =>{
        let reg = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
        return reg.test(text);
    }

    storeStringData = async (key, value) => {
        try {
            await AsyncStorage.setItem(key, value)
        } catch (e) {
            // saving error
        }
    }

    storeObjectData = async (key, value) => {
        try {
            const jsonValue = value === null ? null : JSON.stringify(value)
            await AsyncStorage.setItem(key, jsonValue)
        } catch (e) {
            // saving error
        }
    }

    getStringData = async (key, callback) => {
        try {
            const value = await AsyncStorage.getItem(key)
            if(value !== null) {
                callback(value)
            }
            else {
                callback(null);
            }
        } catch(e) {
            // error reading value
            callback(null);
        }
    }

    getObjectData = async (key, callback) => {
        try {
            let jsonValue = await AsyncStorage.getItem(key)
            jsonValue = jsonValue != null ? JSON.parse(jsonValue) : null;
            if(jsonValue !== null) {
                callback(jsonValue)
            }
            else {
                callback(null);
            }
        } catch(e) {
            // error reading value
            callback(null);
        }
    }

    isJson = (str) => {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }

}


const Utility = new UtilityMethods();

export default Utility;
