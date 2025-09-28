import { DateTime } from "luxon";

export const VERSION = "1.7.4";

interface CHAR_VERSION {
  version: string;
  date: string;
  lastId: number;
}

export const CHAR_VERSIONS: CHAR_VERSION[] = [
  {
    version: "v1.0",
    date: "2025-01-01T00:00:00.00Z",
    lastId: 128,
  },
  {
    version: "v1.1",
    date: "2025-01-02T00:00:00.00Z",
    lastId: 151,
  },
  {
    version: "v1.2",
    date: "2025-02-10T00:00:00.00Z",
    lastId: 155,
  },
  {
    version: "v1.3",
    date: "2025-02-16T00:00:00.00Z",
    lastId: 170,
  },
  {
    version: "v1.4",
    date: "2025-02-20T00:00:00.00Z",
    lastId: 217,
  },
  {
    version: "v1.5",
    date: "2025-02-21T00:00:00.00Z",
    lastId: 250,
  },
  {
    version: "v1.6",
    date: "2025-02-22T00:00:00.00Z",
    lastId: 261,
  },
  {
    version: "v1.7",
    date: "2025-02-27T00:00:00.00Z",
    lastId: 265,
  },
  {
    version: "v1.8",
    date: "2025-03-09T00:00:00.00Z",
    lastId: 305,
  },
  {
    version: "v1.9",
    date: "2025-03-12T00:00:00.00Z",
    lastId: 310,
  },
  {
    version: "v1.10",
    date: "2025-03-20T00:00:00.00Z",
    lastId: 324,
  },
  {
    version: "v1.11",
    date: "2025-04-17T00:00:00.00Z",
    lastId: 340,
  },
  {
    version: "v1.12",
    date: "2025-05-09T00:00:00.00Z",
    lastId: 359,
  },
  {
    version: "v1.13",
    date: "2025-07-06T00:00:00.00Z",
    lastId: 368,
  },
  {
    version: "v1.14",
    date: "2025-07-18T00:00:00.00Z",
    lastId: 386,
  },
  {
    version: "v1.15",
    date: "2025-07-20T00:00:00.00Z",
    lastId: 416,
  },
  {
    version: "v1.16",
    date: "2025-07-23T00:00:00.00Z",
    lastId: 427,
  },
  {
    version: "v1.17",
    date: "2025-08-02T00:00:00.00Z",
    lastId: 436,
  },
  {
    version: "v1.18",
    date: "2025-08-06T00:00:00.00Z",
    lastId: 458,
  },
  {
    version: "v1.19",
    date: "2025-08-14T00:00:00.00Z",
    lastId: 486,
  },
  {
    version: "v1.20",
    date: "2025-08-30T00:00:00.00Z",
    lastId: 500,
  },
  {
    version: "v1.21",
    date: "2025-09-24T00:00:00.00Z",
    lastId: 529,
  },
  {
    version: "v1.22",
    date: "2025-09-28T00:00:00.00Z",
    lastId: 547,
  },
];

export function getCurrentVersion(): CHAR_VERSION {
  const today = DateTime.now();
  const latestVersionDate = DateTime.fromISO(CHAR_VERSIONS[CHAR_VERSIONS.length - 1].date);

  // Compare only the date part (ignoring time)
  if (today.toISODate() === latestVersionDate.toISODate()) {
    // If today is the same date as the latest version, use the previous version
    return CHAR_VERSIONS[CHAR_VERSIONS.length - 2];
  } else {
    // Otherwise, use the prelatest version
    return CHAR_VERSIONS[CHAR_VERSIONS.length - 1];
  }
}

export function getPreLatestVersion(): CHAR_VERSION {
  const today = DateTime.now();
  const latestVersion = getCurrentVersion();
  const latestVersionDate = DateTime.fromISO(latestVersion.date);

  // Compare only the date part (ignoring time)
  if (today.toISODate() === latestVersionDate.toISODate()) {
    // If today is the same date as the latest version, use the previous version
    return CHAR_VERSIONS[CHAR_VERSIONS.length - 3];
  } else {
    // Otherwise, use the prelatest version
    return CHAR_VERSIONS[CHAR_VERSIONS.length - 2];
  }
}

export function getNLatestVersion(n: number): CHAR_VERSION {
  if (n < CHAR_VERSIONS.length) {
    return CHAR_VERSIONS[CHAR_VERSIONS.length - n];
  } else {
    throw new Error(
      `Version ${n} is not available. Maximum available version is ${CHAR_VERSIONS.length}.`
    );
  }
}

export function isDateOlderThenPreLatestVersion(date: string) {
  const checkDate = DateTime.fromISO(date);

  const version = getPreLatestVersion();
  const versionDate = DateTime.fromISO(version.date);
  if (checkDate <= versionDate) {
    return true;
  } else {
    return false;
  }
}

export function getPreLatestVersionForDate(date: string) {
  const checkDate = DateTime.fromISO(date);

  for (let i = CHAR_VERSIONS.length - 1; i >= 0; i--) {
    const versionDate = DateTime.fromISO(CHAR_VERSIONS[i].date);
    if (checkDate > versionDate) {
      return CHAR_VERSIONS[i];
    }
  }

  throw new Error(`No pre-latest version found for date: ${date}`);
}