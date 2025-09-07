import { v4 as uuidv4 } from 'uuid';

export function downloadStats() {
    //Download statistic data from local storage
    const scoreLog = localStorage.getItem('scorelog');
    if (scoreLog) {
        const blob = new Blob([scoreLog], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'scorelog.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
}

export function createUserProfile(username: string) {
    const uuid = uuidv4();
    const userProfile = {
        id: uuid,
        username: username,
        createdAt: new Date().toISOString(),
    };
    localStorage.setItem(`userProfile_${username}`, JSON.stringify(userProfile));
    const existingProfilesStr = localStorage.getItem('existingProfiles');
    let existingProfiles: string[] = existingProfilesStr ? JSON.parse(existingProfilesStr) : [];
    existingProfiles.push(username);
    localStorage.setItem('existingProfiles', JSON.stringify(existingProfiles));
}

export function loadUserProfile(username: string) {
    const userProfileStr = localStorage.getItem(`userProfile_${username}`);
    if (userProfileStr) {
        return JSON.parse(userProfileStr);
    }
    return null;
}