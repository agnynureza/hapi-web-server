const {
  addBookHandler, GetAllBooksHandler, GetBookByIdHandler, EditBookByIdHandler, DeleteBookById,
} = require('./handler');

const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: addBookHandler,
  },
  {
    method: 'GET',
    path: '/books',
    handler: GetAllBooksHandler,
  },
  {
    method: 'GET',
    path: '/books/{bookId}',
    handler: GetBookByIdHandler,
  },
  {
    method: 'PUT',
    path: '/books/{bookId}',
    handler: EditBookByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/books/{bookId}',
    handler: DeleteBookById,
  },
];

module.exports = routes;
