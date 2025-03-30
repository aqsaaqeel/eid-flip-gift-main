import { useEffect } from "react";
import { db, collection, doc, setDoc } from "../src/utils/firebaseConfig"; // Adjust the path if needed

const TestFirestore = () => {
  useEffect(() => {
    const testFirestore = async () => {
      try {
        await setDoc(doc(collection(db, "testCollection"), "testDoc"), {
          message: "Hello from SendEidi!"
        });
        console.log("✅ Data successfully written to Firestore!");
      } catch (error) {
        console.error("❌ Error writing to Firestore:", error);
      }
    };

    testFirestore();
  }, []);
};

export default TestFirestore;
