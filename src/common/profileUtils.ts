import { v4 as uuidv4 } from "uuid";

export function downloadStats() {
  //Download statistic data from local storage
  const scoreLog = localStorage.getItem("scorelog");
  if (scoreLog) {
    const blob = new Blob([scoreLog], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "scorelog.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
}

export interface UserProfile {
  id: string;
  username: string;
  createdAt: string;
}

export const defaultUser: UserProfile = {
  id: "guest",
  username: "Guest",
  createdAt: new Date().toISOString(),
};

export function createUserProfile(username: string) {
  const uuid = uuidv4();
  const userProfile: UserProfile = {
    id: uuid,
    username: username,
    createdAt: new Date().toISOString(),
  };
  localStorage.setItem(`userProfile_${username}`, JSON.stringify(userProfile));
  const existingProfilesStr = localStorage.getItem("existingProfiles");
  let existingProfiles: string[] = existingProfilesStr
    ? JSON.parse(existingProfilesStr)
    : [];
  existingProfiles.push(username);
  localStorage.setItem("existingProfiles", JSON.stringify(existingProfiles));
  setCurrentUserProfile(username);
}

export function loadUserProfile(username: string) {
  const userProfileStr = localStorage.getItem(`userProfile_${username}`);
  if (userProfileStr) {
    return JSON.parse(userProfileStr);
  }
  return null;
}

export function setCurrentUserProfile(username: string) {
  localStorage.setItem("currentUserProfile", username);
}

export function getCurrentUserProfile(): UserProfile | null {
  const username = localStorage.getItem("currentUserProfile");
  if (username) {
    return loadUserProfile(username);
  }
  return null;
}

export function loadExistingProfiles() {
  const existingProfilesStr = localStorage.getItem("existingProfiles");
  return existingProfilesStr ? JSON.parse(existingProfilesStr) : [];
}
