import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storages } from "@/utils/firebase.config";

export const uploadImageToFirebase = async (file: File, title: string) => {
  try {
    const storageRef = ref(storages, `notes/${title}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    const downloadURL = await new Promise<string>((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        () => {},
        (error) => {
          reject(error);
        },
        async () => {
          const url = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(url);
        }
      );
    });

    return downloadURL;
  } catch (error) {
    console.error('Error uploading image to Firebase Storage:', error);
    throw error;
  }
};