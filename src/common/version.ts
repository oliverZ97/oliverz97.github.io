import { DateTime } from "luxon";

export const VERSION = "1.5.3";

interface CHAR_VERSION {
  version: number;
  date: string;
  length: number;
}

export const CHAR_VERSIONS: CHAR_VERSION[] = [
  {
    version: 1.0,
    date: "2025-01-01T00:00:00.00Z",
    length: 128,
  },
  {
    version: 1.1,
    date: "2025-01-02T00:00:00.00Z",
    length: 151,
  },
  {
    version: 1.2,
    date: "2025-02-10T00:00:00.00Z",
    length: 155,
  },
  {
    version: 1.3,
    date: "2025-02-16T00:00:00.00Z",
    length: 170,
  },
  {
    version: 1.4,
    date: "2025-02-20T00:00:00.00Z",
    length: 217,
  },
  {
    version: 1.5,
    date: "2025-02-21T00:00:00.00Z",
    length: 250,
  },
  {
    version: 1.6,
    date: "2025-02-22T00:00:00.00Z",
    length: 261,
  },
  {
    version: 1.7,
    date: "2025-02-27T00:00:00.00Z",
    length: 265,
  },
  {
    version: 1.8,
    date: "2025-03-09T00:00:00.00Z",
    length: 305,
  },
  {
    version: 1.9,
    date: "2025-03-12T00:00:00.00Z",
    length: 310,
  },
  {
    version: 1.1,
    date: "2025-03-20T00:00:00.00Z",
    length: 324,
  },
  {
    version: 1.11,
    date: "2025-04-17T00:00:00.00Z",
    length: 340,
  },
  {
    version: 1.12,
    date: "2025-05-09T00:00:00.00Z",
    length: 359,
  },
  {
    version: 1.13,
    date: "2025-07-06T00:00:00.00Z",
    length: 368,
  },
  {
    version: 1.14,
    date: "2025-07-18T00:00:00.00Z",
    length: 386,
  },
  {
    version: 1.15,
    date: "2025-07-20T00:00:00.00Z",
    length: 416,
  },
  {
    version: 1.16,
    date: "2025-07-23T00:00:00.00Z",
    length: 427,
  },
  {
    version: 1.17,
    date: "2025-08-02T00:00:00.00Z",
    length: 436,
  },
];

export function getCurrentVersion(): CHAR_VERSION {
  return CHAR_VERSIONS[CHAR_VERSIONS.length - 1];
}

export function getPreLatestVersion(): CHAR_VERSION {
  return CHAR_VERSIONS[CHAR_VERSIONS.length - 2];
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
