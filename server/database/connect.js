import pkg from 'rethinkdb';

const { connect } = pkg;

async function dbConnection() {
    return connect({
        host: 'localhost',
        port: 28015,
    });
}

export {
    dbConnection
}