const optionsSQLite = {
    client: "sqlite3",
    connection: {
        filename : "./db/mydb.sqlite",
    },
    useNullAsDefault: true
  };    
  
  module.exports = {
    optionsSQLite,
  };