import SQLite from "react-native-sqlite-storage";
SQLite.DEBUG(true);
SQLite.enablePromise(true);

const database_name = "Jamjam.db";

export default class Database {

  initDB() {
    let db;
    return new Promise((resolve) => {
      SQLite.echoTest()
        .then(() => {
          console.log("Opening database ...");
          SQLite.openDatabase({ name: database_name, createFromLocation: 1 }
          )
            .then(DB => {
              db = DB;
              console.log("Database OPEN");
              resolve(db);
            })
            .catch(error => {
              console.log(error);
            });
        })
        .catch(error => {
          alert("echoTest failed ")
          console.log("echoTest failed - plugin not functional");
        });
    });
  };

  closeDatabase(db) {
    if (db) {
      console.log("Closing DB");
      db.close()
        .then(status => {
          console.log("Database CLOSED");
        })
        .catch(error => {
          this.errorCB(error);
        });
    } else {
      console.log("Database was not OPENED");
    }
  };
}
