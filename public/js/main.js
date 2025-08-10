// public/js/main.js

$(document).ready(function () {

  // Example: Handle form submission for adding a new book
  $('#addBookForm').submit(function (event) {
    event.preventDefault();

    // Collect form data
    const title = $('#title').val();
    const author = $('#author').val();
    const isbn = $('#isbn').val();

    // Perform AJAX request or other actions as needed
    $.ajax({
      url: '/add-book',
      method: 'POST',
      data: {
        title: title,
        author: author,
        isbn: isbn
      },
      success: function (response) {
        // Handle success, e.g., display a message to the user
        alert('Book added successfully!');
      },
      error: function (error) {
        // Handle error, e.g., display an error message
        alert('Error adding book. Please try again.');
      }
    });
  });

  $('#bookId').change(function () {
    // Get the selected book ID
    const selectedBookId = $(this).val();

    // Make an AJAX request to fetch book details based on the selected ID
    $.ajax({
      url: `/get-book-details/${selectedBookId}`,
      method: 'GET',
      success: function (bookDetails) {
        // Populate the form fields with the fetched book details
        $('#newTitle').val(bookDetails.title);
        $('#newAvailability').val(bookDetails.available.toString()); // Assuming 'available' is a boolean
      },
      error: function (error) {
        console.error('Error fetching book details:', error);
      }
    });
  });


});
