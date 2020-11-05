export default function buildQuery(columns) {

    let columnList = '';
    let whereClauses = '';

    for (let i = 0; i < columns.length; i++) {

        if (columns[i].usedInQuery) {

            columnList += columns[i].databaseColumnName;
            whereClauses += columns[i].databaseColumnName + '+is+not+null';

            columnList += ',';
            whereClauses += '+and+';
        }
    }

    columnList = columnList.substring(0, columnList.length - 1);
    whereClauses = whereClauses.substring(0, whereClauses.length - 5);

    const query = `select+distinct+${columnList}+from+ps+where+${whereClauses}`;

    return query;
}