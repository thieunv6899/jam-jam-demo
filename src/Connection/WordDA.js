import Database from '../Connection/Database';
const database = new Database();

export default class WordDA {
    wordById(id) {
      console.log(id);
      return new Promise((resolve) => {
        database.initDB().then((db) => {
          db.transaction((tx) => {
            tx.executeSql('SELECT * FROM KRWord WHERE Word = ?', [id]).then(([tx, results]) => {
              console.log(results);
              if (results.rows.length > 0) {
                let row = results.rows.item(0);
                resolve(row);
              }
            });
          }).then((result) => {
            this.closeDatabase(db);
          }).catch((err) => {
            console.log(err);
          });
        }).catch((err) => {
          console.log(err);
        });
      });
    }
  }