import React, { useState } from "react";
import {
  db,
  doc,
  deleteDoc,
  updateDoc,
  storage,
  ref,
  deleteObject,
} from "myFirebase";
//
const Records = ({ recordObj, isOwner }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newRecord, setNewRecord] = useState(recordObj.text);
  //
  const onDeleteClick = async () => {
    const ok = window.confirm("Delete???");
    if (ok) {
      await deleteDoc(doc(db, "records", recordObj.id));
      const deleteRef = await ref(storage, recordObj.attachmentUrl);
      await deleteObject(deleteRef);
    }
  };
  //
  const toggleEditing = () => setIsEditing((prev) => !prev);
  //
  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setNewRecord(value);
  };
  //
  const onEditClick = async (e) => {
    e.preventDefault();
    await updateDoc(doc(db, "records", recordObj.id), {
      text: newRecord,
    });
    setIsEditing(false);
  };
  //
  return (
    <div>
      {isEditing ? (
        <React.Fragment>
          <form onSubmit={onEditClick}>
            <input value={newRecord} onChange={onChange} required />
            <input type="submit" value="Edit Record" />
          </form>
          <button onClick={toggleEditing}>Cancel Edit</button>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <h4>{recordObj.text}</h4>
          {recordObj.attachmentUrl && (
            <img src={recordObj.attachmentUrl} width="50px" />
          )}
          {isOwner && (
            <React.Fragment>
              <button onClick={onDeleteClick}>Delete Record</button>
              <button onClick={toggleEditing}>Edit Record</button>
            </React.Fragment>
          )}
        </React.Fragment>
      )}
    </div>
  );
};
//
export default Records;
