import { ref } from "vue";
import { projectFirestore } from "../firebase/config";

const useDocument = (collection, id) => {
  const error = ref(null);
  const isPending = ref(false);

  const docRef = projectFirestore.collection(collection).doc(id);

  const deleteDoc = async () => {
    isPending.value = true;
    error.value = null;
    try {
      const res = await docRef.delete();
      isPending.value = false;
      return res;
    } catch (error) {
      error.value = "Could not delete the document";
      isPending.value = false;
    }
  };

  const updateDoc = async (songList) => {
    isPending.value = true;
    error.value = null;
    try {
      const res = await docRef.update(songList);
      isPending.value = false;
      return res;
    } catch (error) {
      error.value = "Could not update the document";
      isPending.value = false;
    }
  };

  return { error, isPending, deleteDoc, updateDoc };
};

export default useDocument;
