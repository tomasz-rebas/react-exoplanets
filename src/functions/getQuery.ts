interface Column {
  databaseColumnName: string;
  usedInQuery: boolean;
}

export default function getQuery(columns: Column[], noNull: boolean) {
  const columnList = columns
    .filter((column) => column.usedInQuery)
    .map((column) => column.databaseColumnName)
    .join();

  let query = `select+distinct+${columnList}+from+ps`;

  if (noNull) {
    let whereClause = "+where+";
    for (let i = 0; i < columns.length; i++) {
      if (columns[i].usedInQuery) {
        whereClause += columns[i].databaseColumnName + "+is+not+null";
        whereClause += "+and+";
      }
    }
    whereClause = whereClause.substring(0, whereClause.length - 5);
    query += whereClause;
  }

  return query;
}
