import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { FIREBASE_DB } from "../firebaseConfig";

const addObjectMetadata = async (userId: string, videoUrl: string, path: 'images' | 'videos', otherMetadata = {}) => {
    try {
        await addDoc(collection(FIREBASE_DB, path), {
            userId,
            videoUrl,
            timestamp: serverTimestamp(),
            ...otherMetadata,
        });
    } catch (e) {
        throw e;
    }

};

export default addObjectMetadata;