import React, { createContext, useState, useContext } from "react";

interface AvatarContextType {
  refreshKey: number;
  refreshAvatar: () => void;
  profileChanged: (username?: string) => void; // New function for profile changes
}

const ProfileContext = createContext<AvatarContextType>({
  refreshKey: 0,
  refreshAvatar: () => {},
  profileChanged: () => {},
});

export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [refreshKey, setRefreshKey] = useState(0);

  const refreshAvatar = () => {
    // Use Date.now() to ensure a unique value every time
    setRefreshKey(Date.now());
  };

  // Add a specific function for profile changes
  const profileChanged = (username?: string) => {
    // The username parameter is optional but can be used for logging/debugging
    setRefreshKey(Date.now());
  };

  return (
    <ProfileContext.Provider
      value={{
        refreshKey,
        refreshAvatar,
        profileChanged,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);
