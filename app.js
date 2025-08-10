const express = require('express');
const sqlite3 = require('sqlite3');
const ejs = require('ejs');
require('./database.js');

const app = express();
const PORT = 3000;

// SQLite Database Setup
const db = new sqlite3.Database('library.db');

// Function to get all books from the database
const getBooksFromDatabase = (callback) => {
  db.all('SELECT * FROM books', (err, books) => {
    if (err) {
      console.error('Error fetching books:', err);
      callback(err, null);
      return;
    }
    callback(null, books);
  });
};





// Express Middleware Setup
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Routes
app.get('/', (req, res) => {
  res.render('index');
});

// Check Availability
app.get('/check-availability', (req, res) => {
  // Query the database to get a list of available books
  db.all('SELECT * FROM books WHERE available = ?', [true], (err, books) => {
    if (err) {
      console.error(err.message);
      return res.status(500).send('Internal Server Error');
    }

    // Render the checkAvailability view with the list of available books
    res.render('checkAvailability', { books });
  });
});

// Route to handle the search functionality
app.get('/search', (req, res) => {
  // Extract the searchQuery parameter from the request URL
  const searchQuery = req.query.searchQuery;

  if (!searchQuery) {
    // If no searchQuery parameter is provided, render the search view without results
    return res.render('search', { searchResults: [] });
  }

  // that fetches search results from Database.

  const query = 'SELECT * FROM books WHERE title LIKE ? OR author LIKE ?';
  const params = [`%${searchQuery}%`, `%${searchQuery}%`];

  db.all(query, params, (err, searchResults) => {
    if (err) {
      console.error('Error fetching search results:', err);
      return res.status(500).send('Internal Server Error');
    }

    // Render the search view with the searchResults
    res.render('search', { searchResults, searchQuery });
  });
});

// Add New Book
app.get('/add-book', (req, res) => {
  res.render('addBooks');
});

app.post('/add-book', (req, res) => {
  // Process the form data and insert a new book into the database
  const { title, author, isbn } = req.body;

  db.run(
    'INSERT INTO books (title, author, isbn, available) VALUES (?, ?, ?, ?)',
    [title, author, isbn, true], // Assume a newly added book is available
    (err) => {
      if (err) {
        console.error(err.message);
        return res.status(500).send('Internal Server Error');
      }

      res.send('Book added successfully!');
    }
  );
});

// Date Issue
app.get('/date-issue', (req, res) => {
  // Fetch books from the database using the provided function
  getBooksFromDatabase((err, books) => {
    if (err) {
      console.error('Error fetching books from the database:', err);
      return res.status(500).send('Internal Server Error');
    }

    // Render the dateIssue view with the list of books
    res.render('dateIssue', { books: books });
  });
});

// Date Issue (POST route)
app.post('/date-issue', (req, res) => {
  // Process the form data
  const bookId = req.body.bookId;
  const customerId = req.body.customerId;
  const issueDate = req.body.issueDate;

  // Update the database with the new issue date
  db.run(
    'UPDATE books SET issueDate = ? WHERE id = ?',
    [issueDate, bookId],
    (err) => {
      if (err) {
        console.error('Error updating issue date:', err);
        return res.status(500).send('Internal Server Error');
      }

      // Send a success response
      res.send(`Issue date updated for Book ID: ${bookId}`);
    }
  );
});


// Define the route for /issue-return
app.get('/issue-return', (req, res) => {
  res.render('issueReturn'); 
});

// Define the route for POST /issue-return
app.post('/issue-return', (req, res) => {
  // Process the form data here
  const { bookId, customerId, issueDate, returnDate } = req.body;

  // Implement logic to update the database or perform any necessary actions
  // SQL query to update the issue and return dates in the database
  const sql = 'UPDATE books SET issueDate = ?, returnDate = ? WHERE id = ?';
  
  db.run(sql, [issueDate, returnDate, bookId], function (err) {
    if (err) {
      console.error(err.message);
      return res.status(500).send('Internal Server Error');
    }

    // Check if any rows were affected by the update
    if (this.changes === 0) {
      return res.status(404).send('Book not found or no changes made.');
    }

    // Redirect to another page or send a response
    res.send('Form submitted successfully!');
  });
});

app.get('/update-book', (req, res) => {
  // Function to retrieve all books from the database
  getBooksFromDatabase((err, books) => {
    if (err) {
      console.error('Error fetching books:', err);
      return res.status(500).send('Internal Server Error');
    }

    // Render the updateBook view with the list of books
    res.render('updateBook', { books });
  });
});

app.post('/update-book', (req, res) => {
  // Process the form data and update the book in the database
  const { bookId, newTitle, newAvailability } = req.body;

  db.run(
    'UPDATE books SET title = ?, available = ? WHERE id = ?',
    [newTitle, newAvailability === 'true', bookId],
    (err) => {
      if (err) {
        console.error(err.message);
        return res.status(500).send('Internal Server Error');
      }

      res.send('Book Updated');
    }
  );
});

// Server Start
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
