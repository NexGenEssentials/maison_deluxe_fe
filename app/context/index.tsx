"use client";

import { createContext, PropsWithChildren, useContext, useState } from "react";

interface ContextValue {
  expanded: boolean;
  setExpanded: (expanded: boolean) => void;
  activeTab: string;
  setActiveTab: (activeTab: string) => void;
  activeModalId: string | null;
  setActiveModalId: (id: string | null) => void;
}

const AppContext = createContext<ContextValue>({} as ContextValue);

function ContextProvider({ children }: PropsWithChildren) {
  const [expanded, setExpanded] = useState(true);

  const [activeModalId, setActiveModalId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("Dashboard");

  return (
    <AppContext.Provider
      value={{
        expanded,
        setExpanded,
        activeTab,
        setActiveTab,
        activeModalId,
        setActiveModalId,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
export default ContextProvider;
