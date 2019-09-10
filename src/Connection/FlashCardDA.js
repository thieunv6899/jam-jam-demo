import Database from '../Connection/Database';
const database = new Database();

export default class FlashCardDA {

    flashCard() {
        console.log("KRFlashCard view all");
        return new Promise((resolve) => {
            database.initDB().then((db) => {
                db.transaction((tx) => {
                    tx.executeSql('SELECT * FROM KRFlashCard', []).then(([tx, results]) => {
                        console.log(results);
                        if (results.rows.length > 0) {
                            var temp = [];
                            for (let i = 0; i < results.rows.length; ++i) {
                                temp.push(results.rows.item(i));
                            }
                            resolve(temp);
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

    listWordByFlashCardId(id) {
        console.log("KRFlashCard view all");
        return new Promise((resolve) => {
            database.initDB().then((db) => {
                db.transaction((tx) => {
                    tx.executeSql('SELECT * FROM KRFlashCardWord Where FlashCardId = ?', [id]).then(([tx, results]) => {
                        console.log(results);
                        //alert(results.rows.length);
                        var temp = [];
                        if (results.rows.length > 0) {
                            for (let i = 0; i < results.rows.length; ++i) {
                                temp.push(results.rows.item(i));
                            }  
                        }
                        resolve(temp);
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