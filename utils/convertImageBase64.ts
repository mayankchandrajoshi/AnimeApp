import * as FileSystem from 'expo-file-system';
import { Platform } from 'react-native';

const convertToBase64 = async (uri:string) => {
    try {
        if(Platform.OS==="web") return uri;
        const base64 = await FileSystem.readAsStringAsync(uri, { encoding: 'base64' });
        return `data:image/jpeg;base64,${base64}`;
    } catch (error) {
        console.log('Error converting image to base64,\n'+error);
        return null;
    }
};

export default convertToBase64