import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import ListBooks from './ListBooks.js';
import SearchBooks from './SearchBooks.js'
import * as BooksAPI from './BooksAPI';
import './App.css'

class BooksApp extends Component {
  state = {
    books : [],
    query: '',
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
       'Virtual Reality', 'Web Development', 'iOS'],
    searchedBooks: []
  }
  componentDidMount() {
 	  BooksAPI.getAll().then((books) => {this.setState({ books: books })})
	}

  changeShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      BooksAPI.getAll().then(books => {
        this.setState({ books: books });
      });
    });
  }

  searchBooks = (query) => {
    this.setState({ query: query.trim() })
    BooksAPI.search(query, "20").then(books => {
      this.setState(state => ({
        searchedBooks: books
      }))
    })
  }

  updateQuery = (query) => {
    this.setState({ query: query.trim() })
  }

  clearQuery = (query) => {
    this.setState({query: ''})
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
            query={this.state.query}
            onUpdateQuery={(query) => {
              this.updateQuery(query)
            }}
            onClearQuery={(query) => {
              this.clearQuery(query)
            }}
            searchterms={this.state.searchterms}
            onSearchBooks={(query) => {
              this.searchBooks(query)
            }}
            searchedBooks={this.state.searchedBooks}
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
