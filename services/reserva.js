const { Pool } = require('pg')

    //  ************************ ACCESO A BD POSTGRESQL  ***********************

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: '1234',
    database: 'reserva',
    port: '5432'
})

//const ACTUAL_TRIM = pool.query('SELECT id FROM trimester ORDER BY id DESC LIMIT 1');

class ReservacService {

    //  ************************ SERVICIOS MODELO DE ITEM  ***********************

    async getItems() {
        let query = 'SELECT * FROM item';
        const items = await pool.query(query);
        return items || [];
    }

    async getItem(id) {
        let query = `SELECT * FROM item WHERE id = ${id}`;
        const item = await pool.query(query);
        return item || [];
    }

    async createItem(name, description) {
        let query = `INSERT INTO item (name, description) VALUES ('${name}','${description}'`;
        const createItemId = await pool.query(query);
        return createItemId;
    }

    async updateItem(id, name, description) {
        let query = `UPDATE item SET name = '${name}', description = '${description}' WHERE id = ${id}`;
        const updateItem = await pool.query(query);
        return updateItem;
    }

    async deleteItem(id) {
        let query = `DELETE FROM item WHERE id = '${id}'`;
        const deleteItem = await pool.query(query);
        return deleteItem;
    }

    async createSala() {
        let query = 'SELECT * FROM item';
        const createSalaId = await pool.query(query);
        return createSalaId;
    }

    async deleteSala() {
        let query = 'SELECT * FROM item';
        const deletedSalaId = await pool.query(query);
        return deletedSalaId || [];
    }

    //  ************************ SERVICIOS DE LAS SALAS  ***********************

    async getSalas() {
        let query = 'SELECT * FROM room';
        const items = await pool.query(query);
        return items || [];
    }

    async getSala(id) {
        let query = `SELECT * FROM room WHERE id = '${id}'`;
        const item = await pool.query(query);
        return item || [];
    }

    async getSalaItems(id) {
        //const TRIM_ACTUAL = await this.getActualTrim()
        const sql = `SELECT r.quantity, i.name FROM room_item AS r INNER JOIN item AS i ON i.id = r.item_id WHERE room_id = '${id}'`;
        const items = await pool.query(sql);
        return items || [];
    }

    //  ********************* SERVICIOS DE TRIMESTRE  *********************

    async getActualTrim() {
        const sql = 'SELECT id FROM trimester ORDER BY id DESC LIMIT 1';
        const items = await pool.query(sql);
        return items || [];
    }
}

module.exports = ReservacService