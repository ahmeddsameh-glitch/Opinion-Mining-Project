import { createContext, useContext, useState } from "react";

const GlobalContext = createContext();

export function GlobalProvider({ children }) {
  const [likedComments, setLikedComments] = useState({});
  const [inputValues, setInputValues] = useState({});
  const [postReplies, setPostReplies] = useState({});

  return (
    <GlobalContext.Provider
      value={{
        likedComments, setLikedComments,
        inputValues, setInputValues,
        postReplies, setPostReplies
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobalState() {
  return useContext(GlobalContext);
}
