import Author from "./author-schema";
import Book from "./book-schema";
import Genre from "./genre-schema";

// One-To-Many (1 Author has Many Books)
Author.hasMany(Book, {
  foreignKey: {
    name: "authorId",
    allowNull: false,
  },
});

Book.belongsTo(Author, {
  foreignKey: {
    name: "authorId",
    allowNull: false,
  },
});

// Many-To-Many association between books and geners
Book.belongsToMany(Genre, { through: "BookGenre" });
Genre.belongsToMany(Book, { through: "BookGenre" });
