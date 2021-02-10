import { ref } from "vue";
import { projectStorage } from "../firebase/config";
import getUser from "./getUser";

const useStorage = () => {
  const error = ref(null);
  const filePath = ref(null);
  const fileUrl = ref(null);

  const isPending = ref(false);
  const { user } = getUser();

  const upload = async (file) => {
    isPending.value = true;
    filePath.value = `covers/${user.value.uid}/${file.name}`;
    const storageRef = projectStorage.ref(filePath.value);

    try {
      const res = await storageRef.put(file);
      fileUrl.value = await res.ref.getDownloadURL();
      isPending.value = false;
    } catch (err) {
      console.log(err.message);
      error.value = err.message;
      isPending.value = false;
    }
  };

  const deleteImage = async (path) => {
    const storageRef = projectStorage.ref(path);
    try {
      storageRef.delete();
    } catch (err) {
      error.value = err.message;
    }
  };

  return { error, filePath, fileUrl, upload, deleteImage, isPending };
};

export default useStorage;
