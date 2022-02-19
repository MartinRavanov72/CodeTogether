import pkg from 'rethinkdb';
const { dbList, dbCreate, branch, tableList, tableCreate } = pkg;

const dbName = "code_sharing";
const tables = [
    {
        tableName: 'code',
        primaryKey: 'userId',
    },
    {
        tableName: 'sharing',
        primaryKey: 'userId',
    },
    {
        tableName: 'sharing_joined_users',
        primaryKey: 'email',
    },
];

async function setupDatabase(connection) {
    const dbCreationInfo = await createDatabase(connection, dbName);

    if (dbCreationInfo.dbs_created === 0) {
        console.log(`Database with name ${dbName} already exists!`);
    } else {
        console.log(`Successfully created database ${dbName}.`, dbCreationInfo);
    }

    connection.use(dbName);

    for (const tableInfo of tables) {
        const tableCreationInfo = await createTable(connection, tableInfo.tableName, tableInfo.primaryKey);

        if (tableCreationInfo.tables_created === 0) {
            console.log(`Table with name ${tableInfo.tableName} already exists!`);
        } else {
            console.log(`Successfully created table ${tableInfo.tableName}.`, tableCreationInfo);
        }
    }
}

function createDatabase(connection, databaseName) {
    return dbList()
        .contains(databaseName)
        .do((dbExists) => branch(
            dbExists,
            { dbs_created: 0 },
            dbCreate(databaseName)
        ))
        .run(connection);
}

function createTable(connection, tableName, primaryKey) {
    return tableList()
        .contains(tableName)
        .do((tableExists) => branch(
            tableExists,
            { tables_created: 0 },
            tableCreate(tableName, { primaryKey })
        ))
        .run(connection);
}

export {
    setupDatabase
}