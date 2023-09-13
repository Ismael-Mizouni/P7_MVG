
const mongoose = require("mongoose");
const Book = require("../models/book");
const data = require("../public/data/data.json");

mongoose
  .connect(
    "mongodb+srv://mizouniismael:4Kej5nVqVHVrlQm1@ismael.ygplfnw.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to MongoDB");
    addBooks();
  })
  .catch((err) => console.log("Failed to connect to MongoDB", err));

async function addBooks() {
  try {
    for (let bookData of data) {
      const existingBook = await Book.findOne({ id: bookData.id });

      if (existingBook) {
        console.log(`Book with id ${bookData.id} already exists. Skipping.`);
        continue;
      }

      const book = new Book(bookData);
      await book.save();
    }
    console.log("Books added successfully");
    mongoose.connection.close();
  } catch (err) {
    console.error("Error while adding books: ", err);
  }
}
