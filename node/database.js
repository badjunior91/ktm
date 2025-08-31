import mysql from "mysql"

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '@B@djun!or2838122k..',
    database: 'ktm'
});

export function makeQuery(sql, array) {
    return new Promise((resolve, reject) => {
        connection.query(sql, array, function (error, results, fields) {
            if (error) {
                if (error.errno && error.errno == 1062) {

                } else {
                    console.log(error);
                }

                resolve()
            }
            resolve(results);
        });
    });
}
