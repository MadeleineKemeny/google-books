import axios from "axios";

// The getBooks method retrieves books from the server
// It accepts a "query" or term to search the book api for
export default {
  getBooks: function (query) {
    console.log("getbooks", query)
    return axios.get(`/books/${query}`);
  }
};
