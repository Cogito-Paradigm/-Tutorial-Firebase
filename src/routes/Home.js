import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  db,
  collection,
  addDoc,
  getDocs,
  onSnapshot,
  storage,
  ref,
  uploadString,
  getDownloadURL,
  deleteObject,
} from "myFirebase";
import Records from "components/Records";
import RecordFactory from "components/RecordFactory";
//
const Home = ({ userObj }) => {
  const [records, setRecords] = useState([]);
  //
  useEffect(() => {
    // const getRcords = async () => {
    //   const recordsFromDB = await getDocs(collection(db, "records"));
    //   recordsFromDB.forEach((document) => {
    //     const recordObject = {
    //       ...document.data(),
    //       id: document.id,
    //     };
    //     setRecords((prev) => [recordObject, ...prev]);
    //   });
    // };
    // getRcords();
    onSnapshot(collection(db, "records"), (snapshot) => {
      const recordArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRecords(recordArray);
    });
  }, []);

  //
  return (
    <div>
      <RecordFactory userObj={userObj} />
      <div>
        {records.map((record) => (
          <Records
            key={record.id}
            recordObj={record}
            isOwner={record.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};
//
export default Home;
