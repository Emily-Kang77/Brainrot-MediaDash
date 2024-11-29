"use client";

import React, { createContext, useState } from "react";

export const FocusContext = createContext();

export const FocusProvider = ({ children }) => {
  const [focus, setFocus] = useState(false);

  return (
    <FocusContext.Provider value={{ focus, setFocus }}>
      {children}
    </FocusContext.Provider>
  );
};
