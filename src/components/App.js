import React, { useState, useEffect } from "react";
import AppRouter from "components/Router";
import { auth, onAuthStateChanged } from "myFirebase";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);
  //
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserObj(user);
      } else {
        setIsLoggedIn(false);
        setUserObj(null);
      }
      setInit(true);
    });
  }, []);
  //
  const refreshUser = () => {
    setUserObj({ ...auth.currentUser });
  };
  //
  return (
    <React.Fragment>
      {init ? (
        <AppRouter
          isLoggedIn={isLoggedIn}
          userObj={userObj}
          refreshUser={refreshUser}
        />
      ) : (
        "Initializing...."
      )}
      <footer>&copy; {new Date().getFullYear} Firebase</footer>
    </React.Fragment>
  );
}
//
export default App;
