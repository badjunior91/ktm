import { Router } from 'express';
import { makeQuery } from './database.js';
import bcrypt from 'bcrypt';
const router = Router();

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const users = await makeQuery(
        `SELECT 
        users.id,
        users.surname,
        users.name,
        users.password,
        roles.name as role 
     FROM 
        users
     JOIN 
        roles ON users.roleId = roles.id
     WHERE
       (email = ? OR phone = ?)
     AND 
        users.isdeleted = 0
     LIMIT 1`,
        [username, username]
    );
    if (users.length === 0) {
        return res.send({ result: 'Δεν βρέθηκε ο χρήστης' });
    }
    const user = users[0];
    // const hashed = await bcrypt.hash(password, 10);
    // console.log('Hashed password:', hashed);
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        return res.send({ result: 'Λάθος κωδικός' });
    }
    delete user.password;

    res.send({
        result: 'Login successful',
        data: {
            user: user,
            tables: await getAllTablesData()
        }
    });

});
router.post('/loginwithtoken', async (req, res) => {
    const { token } = req.body;
    console.log(token);

    const users = await makeQuery(
        `SELECT 
        users.id,
        users.surname,
        users.name,
        roles.name as role 
     FROM 
        users
     JOIN 
        roles ON users.roleId = roles.id
     WHERE 
        users.id = ? 
     AND 
        users.isdeleted = 0
     LIMIT 1`,
        [token]
    );
    if (users.length === 0) {
        return res.send({ result: 'Δεν βρέθηκε ο χρήστης' });
    }
    const user = users[0];
    const alltables = await getAllTablesData()
    res.send({
        result: 'Login successful',
        data: {
            user: user,
            tables: alltables
        }
    });

});














async function getAllTablesData() {
    // 1. Πάρε όλα τα table names
    const tables = await makeQuery(`
    SELECT table_name FROM information_schema.tables WHERE table_schema = 'ktm';
  `);

    const results = {};

    // 2. Για κάθε table, πάρε τα δεδομένα
    for (const row of tables) {
        const tableName = row.TABLE_NAME;
        let data;
        if (['users', 'materials', 'suppliers', 'purchases', 'customers', 'buildings', 'rooms', 'appointments'].includes(tableName)) continue;
        data = await makeQuery(`SELECT * FROM \`${tableName}\``);
        // 3. Κάνε convert σε plain JS object
        results[tableName] = JSON.parse(JSON.stringify(data));
    }

    // 4. Επιστροφή του συνολικού object
    return results;
}
export default router;
