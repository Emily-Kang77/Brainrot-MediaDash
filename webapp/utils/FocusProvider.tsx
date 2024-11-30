"use client";

import React, { createContext, useState } from "react";

export const FocusContext = createContext({ focus: false, setFocus: (value: boolean) => {} });

export const FocusProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [focus, setFocus] = useState(false);

  return (
    <FocusContext.Provider value={{ focus, setFocus: (value: boolean) => setFocus(value) }}>
      {children}
    </FocusContext.Provider>
  );
};
