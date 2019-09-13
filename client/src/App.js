import React, { Component } from "react";
import Jumbotron from "./components/Jumbotron";
import Nav from "./components/Nav";
import Input from "./components/Input";
import Button from "./components/Button";
import API from "./utils/API";
import { BookList, BookListItem } from "./components/BookList";
import { Container, Row, Col } from "./components/Grid";

class App extends Component {
  state = {
    books: [],
    bookSearch: ""
  };

  handleInputChange = event => {
    // Destructure the name and value properties off of event.target
    // Update the appropriate state
    const { name, value } = event.target;
    this.setState({
      [name]: value,
      books: []

    });
  };  

  handleFormSubmit = event => {
    // When the form is submitted, prevent its default behavior, get books update the books state
    event.preventDefault();
    console.log(this.state.bookSearch)
    API.getBooks(this.state.bookSearch)
      .then(res => {
        console.log(res.data.items)
        let bookArray = []
        res.data.items.forEach(book => {
          let obj =
          {
            id: book.id,
            title: book.volumeInfo.title,
            author: book.volumeInfo.authors,
            href: book.volumeInfo.previewLink,
            description: book.volumeInfo.description,
            thumbnail: book.volumeInfo.imageLinks.thumbnail
          }
          bookArray.push(obj)
        })
        console.log(bookArray)
        this.setState({ books: bookArray })
      })
      .catch(err => console.log(err));
  };

  //add event handler for saved button; also make a delete button and handler
  savedbtn = (id)=>{


  }

  render() {
    return (
      <div>
        <Nav />
        <Jumbotron />
        <Container>
          <Row>
            <Col size="md-12">
              <form>
                <Container>
                  <Row>
                    <Col size="xs-9 sm-10">
                      <Input
                        name="bookSearch"
                        value={this.state.bookSearch}
                        onChange={this.handleInputChange}
                        placeholder="Search For a Book"
                      />
                    </Col>
                    <Col size="xs-3 sm-2">
                      <Button
                        onClick={this.handleFormSubmit}
                        type="success"
                        className="input-lg"
                      >
                        Search
                      </Button>
                    </Col>
                  </Row>
                </Container>
              </form>
            </Col>
          </Row>
          <Row>
            <Col size="xs-12">
              {!this.state.books.length ? (
                <h1 className="text-center">No Books to Display</h1>
              ) : (
                  <BookList>
                    {this.state.books.map(book => {
                      return (
                        <BookListItem
                          key={book.id}
                          id={book.id}
                          title={book.title}
                          author={book.author}
                          href={book.href}
                          description={book.description}
                          thumbnail={book.thumbnail}
                          savedbtn={this.savedbtn}
                        />
                      );
                    })}
                  </BookList>
                )}
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
