const { nanoid } = require('nanoid');
const books = require('./book');

const addBookHandler = (request, h) => {
  const {
    name, year, author, summary, publisher, pageCount, readPage, reading,
  } = request.payload;
  const id = nanoid(16);
  const inserdAt = new Date().toISOString();
  const updatedAt = inserdAt;
  let finished = false;
  let response;
  let code;

  if (name === undefined) {
    response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });
    code = 400;
    return response.code(code);
  }

  if (readPage > pageCount) {
    response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });
    code = 400;
    return response.code(code);
  }

  if (pageCount === readPage) {
    finished = true;
  }
  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    inserdAt,
    updatedAt,
  };

  books.push(newBook);

  const isSuccess = books.filter((book) => book.id === id).length > 0;

  if (isSuccess) {
    response = h.response({
      status: 'success',
      message: 'Buku Berhasil ditambahkan',
      data: {
        bookId: id,
      },
    });
    code = 201;
    return response.code(code);
  }

  response = h.response({
    status: 'fail',
    message: 'Buku gagal ditambahkan',
  });
  code = 500;

  return response.code(code);
};

const GetAllBooksHandler = (request, h) => {
  const { name, reading, finished } = request.query;

  const listBooks = books.filter((b) => {
    if (name !== undefined) {
      return b.name.toLowerCase().includes(name.toLowerCase());
    }
    if (reading !== undefined) {
      if (reading === '0') {
        return b.reading === false;
      }
      if (reading === '1') {
        return b.reading === true;
      }
    }

    if (finished !== undefined) {
      if (finished === '0') {
        return b.finished === false;
      }
      if (finished === '1') {
        return b.finished === true;
      }
    }

    return b;
  });

  const response = h.response({
    status: 'success',
    data: listBooks,
  });
  return response.code(200);
};

const GetBookByIdHandler = (request, h) => {
  const { bookId } = request.params;
  const book = books.filter((n) => n.id === bookId)[0];
  let response;
  let code;

  if (book !== undefined) {
    response = h.response({
      status: 'success',
      data: {
        book,
      },
    });
    code = 200;
  } else {
    response = h.response({
      status: 'fail',
      message: 'Buku tidak ditemukan',
    });
    code = 404;
  }

  return response.code(code);
};

const EditBookByIdHandler = (request, h) => {
  const { bookId } = request.params;
  const {
    name, year, author, summary, publisher, pageCount, readPage, reading,
  } = request.payload;
  const updatedAt = new Date().toISOString();
  const index = books.findIndex((b) => b.id === bookId);
  let response;
  let code;

  if (name === undefined) {
    response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    });
    code = 400;
    return response.code(code);
  }

  if (readPage > pageCount) {
    response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    });
    code = 400;
    return response.code(code);
  }

  if (index !== -1) {
    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      updatedAt,
    };
    response = h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    });
    code = 200;
    return response.code(code);
  }

  response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan',
  });
  code = 404;

  return response.code(code);
};

const DeleteBookById = (request, h) => {
  const { bookId } = request.params;
  const index = books.findIndex((b) => b.id === bookId);
  let code;
  let response;

  if (index !== -1) {
    books.splice(index, 1);
    response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    });
    code = 200;
    return response.code(code);
  }

  response = h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan',
  });
  code = 404;
  return response.code(code);
};

module.exports = {
  addBookHandler, GetAllBooksHandler, GetBookByIdHandler, EditBookByIdHandler, DeleteBookById,
};
