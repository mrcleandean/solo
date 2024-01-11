import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { FIREBASE_STORAGE } from "../firebaseConfig";

const uploadObject = async (blob: Blob, userId: string, firstPathSegment: string) => {
    try {
        const objectRef = ref(FIREBASE_STORAGE, `${firstPathSegment}/${userId}/${new Date().getTime()}`);
        await uploadBytes(objectRef, blob);
        const objectUrl = await getDownloadURL(objectRef);
        return objectUrl;
    } catch (e) {
        throw e;
    }
};

export default uploadObject;