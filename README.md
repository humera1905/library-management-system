# library-management-system
A library management system built with EJS and JavaScript, allowing users to manage books, track borrow/return records, and organize library data efficiently.

## Features

- 📚 **Add new books** to the library.
- 🔍 **Search** for books by title or author.
- ✅ **Check availability** of books.
- 📆 **Issue books** to customers with issue and return dates.
- ✏️ **Update book details** such as title and availability.
- 📄 **View all available books**.

## Project Structure

```
library-management-system/
├── app.js                # Main application file
├── database.js           # SQLite database setup and schema
├── library.db            # SQLite database file
├── package.json          # Project dependencies and scripts
├── public/               # Static files
│   ├── css/
│   │   └── styles.css    # Custom CSS styles
│   └── js/
│       └── main.js       # Client-side JavaScript
├── views/                # EJS templates for rendering views
│   ├── addBooks.ejs
│   ├── checkAvailability.ejs
│   ├── dateIssue.ejs
│   ├── index.ejs
│   ├── issueReturn.ejs
│   ├── search.ejs
│   └── updateBook.ejs
```

## Installation

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the application:
   ```bash
   node app.js
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

## Usage

- **Add a New Book** → `/add-book`
- **Search for Books** → `/search`
- **Check Availability** → `/check-availability`
- **Issue a Book** → `/date-issue`
- **Update Book Details** → `/update-book`
- **Issue/Return a Book** → `/issue-return`

## Database Schema

The application uses a single `books` table:

| Column      | Type     | Description                                |
|-------------|----------|--------------------------------------------|
| id          | INTEGER  | Primary key, unique book ID               |
| title       | TEXT     | Title of the book                         |
| author      | TEXT     | Author of the book                        |
| isbn        | TEXT     | ISBN number of the book                   |
| available   | BOOLEAN  | Availability status (true/false)          |
| issueDate   | DATE     | Date the book was issued                   |
| returnDate  | DATE     | Date the book was returned                 |
| customerId  | INTEGER  | ID of the customer who borrowed the book   |

## Dependencies

- **[Express](https://expressjs.com/)** – Web framework for Node.js
- **[EJS](https://ejs.co/)** – Embedded JavaScript templating
- **[SQLite3](https://www.sqlite.org/)** – SQLite database driver for Node.js

---

📌 *Built with ❤️ using Node.js and SQLite*

