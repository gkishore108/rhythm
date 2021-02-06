import { ref } from "vue";
import { projectStorage } from "../firebase/config";
import getUser from "./getUser";

const useStorage = () => {
  const error = ref(null);
  const filePath = ref(null);
  const fileUrl = ref(null);

  const { user } = getUser();

  const upload = async (file) => {
    filePath.value = `covers/${user.value.uid}/${file.name}`;
    const storageRef = projectStorage.ref(filePath.value);

    try {
      const res = await storageRef.put(file);
      fileUrl.value = res.ref.getDownloadURL();
    } catch (err) {
      console.log(err.message);
      error.value = err.message;
    }
  };

  return { error, filePath, fileUrl, upload };
};

export default useStorage;
