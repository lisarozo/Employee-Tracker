const connection = require('./connection');
class DB{
    constructor(connection) {
        this.connection = connection;
    }
}
module.export = new DB(connection);
