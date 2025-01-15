const db = require('../../database/db');

exports.getAll = async () => {
    return db.query('SELECT * FROM messages ORDER BY created_at DESC');
};

exports.create = async ({ name, email, message }) => {
    return db.query(
        'INSERT INTO messages (name, email, message) VALUES ($1, $2, $3) RETURNING *',
        [name, email, message]
    );
};

exports.delete = async (id) => {
    return db.query('DELETE FROM messages WHERE id = $1', [id]);
};
