interface Column {
  databaseColumnName: string;
  isUsedInQuery: boolean;
}

/**
 * 'includeEmptyProperties' - when true, will fetch all the exoplanets,
 * including those with missing data (e.g. the mass).
 */

export default function getQuery(
  columns: Column[],
  includeEmptyProperties: boolean
) {
  const columnList = columns
    .filter((column) => column.isUsedInQuery)
    .map((column) => column.databaseColumnName)
    .join();

  if (includeEmptyProperties) {
    return `select+distinct+${columnList}+from+ps`;
  }

  const conditions = columns
    .filter((column) => column.isUsedInQuery)
    .map((column) => column.databaseColumnName + "+is+not+null")
    .join("+and+");

  return `select+distinct+${columnList}+from+ps+where+${conditions}`;
}
