import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import ListBooks from './ListBooks.js';
import SearchBooks from './SearchBooks.js'
import * as BooksAPI from './BooksAPI';
import './App.css'

class BooksApp extends Component {
  state = {
    books : [],
    searchedBooks: [],
    searchterms: ['Android', 'Art', 'Artificial Intelligence', 'Astronomy',
      'Austen', 'Baseball', 'Basketball', 'Bhagat', 'Biography', 'Brief',
      'Business', 'Camus', 'Cervantes', 'Christie', 'Classics', 'Comics',
      'Cook', 'Cricket', 'Cycling', 'Desai', 'Design', 'Development',
      'Digital Marketing', 'Drama', 'Drawing', 'Dumas', 'Education',
      'Everything', 'Fantasy', 'Film', 'Finance', 'First', 'Fitness',
      'Football', 'Future', 'Games', 'Gandhi', 'Homer', 'Horror', 'Hugo',
       'Ibsen', 'Journey', 'Kafka', 'King', 'Lahiri', 'Larsson', 'Learn',
       'Literary Fiction', 'Make', 'Manage', 'Marquez', 'Money', 'Mystery',
       'Negotiate', 'Painting', 'Philosophy', 'Photography', 'Poetry',
       'Production', 'Programming', 'React', 'Redux', 'River', 'Robotics',
       'Rowling', 'Satire', 'Science Fiction', 'Shakespeare', 'Singh',
       'Swimming', 'Tale', 'Thrun', 'Time', 'Tolstoy', 'Travel', 'Ultimate',
       'Virtual Reality', 'Web Development', 'iOS']
  }
  componentDidMount() {
    BooksAPI.get("74XNzF_al3MC").then((book) => {console.log(book)})
	  BooksAPI.getAll().then((books) => {console.log(books)})
 	  BooksAPI.getAll().then((books) => {this.setState({ books: books })})
	}

  changeShelf = (book, shelf) => {
    BooksAPI.update(book, shelf)
 	  BooksAPI.getAll().then((books) => {this.setState({ books: books })})
  }


  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <ListBooks
            books={this.state.books}
            onChangeShelf={this.changeShelf}
          />
        )}/>

        <Route exact path="/search" render={({ history }) => (
          <SearchBooks
            searchterms={this.state.searchterms}
            onChangeShelf={(book, shelf) => {
              this.changeShelf(book, shelf)
              history.push('/')
            }}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp;
