export type EntryKey =
  | "pl_name"
  | "hostname"
  | "disc_facility"
  | "discoverymethod"
  | "disc_year"
  | "pl_orbper"
  | "pl_orbsmax"
  | "pl_masse"
  | "pl_rade"
  | "pl_dens"
  | "releasedate";

export type Entry = Record<EntryKey, string>;
