import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import {
  auth,
  signOut,
  updateProfile,
  db,
  orderBy,
  collection,
  query,
  where,
  getDocs,
} from "myFirebase";
//
const Profile = ({ userObj, refreshUser }) => {
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const history = useHistory();
  //
  const onLogOutClick = () => {
    signOut(auth);
    history.push("/");
  };
  //
  const getMyRecords = async () => {
    const recordRef = collection(db, "records");
    const recordQuery = query(
      recordRef,
      where("creatorId", "==", userObj.uid),
      orderBy("createdAt", "desc")
    );
    const data = await getDocs(recordQuery);
    console.log(data);
  };
  //
  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setNewDisplayName(value);
  };
  //
  const onSubmit = async (e) => {
    e.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await updateProfile(userObj, { displayName: newDisplayName });
    }
    refreshUser();
    //
  };
  //
  useEffect(() => {
    getMyRecords();
  }, []);
  //
  return (
    <React.Fragment>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          onChange={onChange}
          value={newDisplayName}
          placeholder="Display name"
        />
        <input type="submit" onSubmit={onSubmit} value="Update Profile" />
      </form>
      <button onClick={onLogOutClick}>Log Out</button>
    </React.Fragment>
  );
};
//
export default Profile;
