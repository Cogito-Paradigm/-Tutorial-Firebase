import React, { useState } from "react";
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
//
const RecordFactory = ({ userObj }) => {
  const [textInput, setTextInput] = useState("");
  const [attachment, setAttachment] = useState("");
  //
  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setTextInput(value);
  };
  //
  const onSubmit = async (e) => {
    e.preventDefault();
    //
    let attachmentUrl = "";
    if (attachment !== "") {
      const attachmentRef = ref(storage, `${userObj.uid}/${uuidv4()}`);
      await uploadString(attachmentRef, attachment, "data_url");
      attachmentUrl = await getDownloadURL(attachmentRef);
      //
    }
    const record = {
      text: textInput,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl,
    };
    await addDoc(collection(db, "records"), record);
    setTextInput("");
    setAttachment("");
  };
  //
  const onFileChange = (e) => {
    const {
      target: { files },
    } = e;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };
  //
  const onClearAttachmentClick = () => {
    setAttachment(null);
  };
  //
  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="input text"
        maxLength={120}
        value={textInput}
        onChange={onChange}
      />
      <input type="file" accept="image/*" onChange={onFileChange} />
      <input type="submit" value="Submit" />
      {attachment && (
        <div>
          <img src={attachment} width="50px" height="50px" />
          <button onClick={onClearAttachmentClick}>Clear</button>
        </div>
      )}
    </form>
  );
};
//
export default RecordFactory;
