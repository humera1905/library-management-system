const sqlite3 = require('sqlite3');

// Connect to the SQLite database (create a new one if it doesn't exist)
const db = new sqlite3.Database('library.db');

// Create a table to store books
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS books (
      id INTEGER PRIMARY KEY,
      title TEXT,
      author TEXT,
      isbn TEXT,
      available BOOLEAN,
      issueDate DATE,
      returnDate DATE,
      customerId INTEGER
    )
  `);
});

// Close the database connection
db.close();
