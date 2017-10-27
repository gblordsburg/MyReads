import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as BooksAPI from './BooksAPI';
import escapeRegExp from 'escape-string-regexp';
import sortBy from 'sort-by';

class SearchBooks extends Component {
  static propTypes = {
    searchterms: PropTypes.array.isRequired,
    onChangeShelf: PropTypes.func.isRequired
  }

  state = {
    query: '',
    searchedBooks: []
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
    const { searchterms, onChangeShelf } = this.props
    const { query, searchedBooks } = this.state
    let showingSearchTerms
    if (query) {
      const match = new RegExp(escapeRegExp(query), 'i')
      showingSearchTerms = searchterms.filter((searchterm) => match.test(searchterm))
    } else {
      showingSearchTerms = []
    }

    showingSearchTerms.sort(sortBy())

    return(
      <div className="search-books">
        <div className="search-books-bar">
          <Link className='close-search' to='/'>Close</Link>
          <form onSubmit={(e) => this.SearchBooks(e.target.value)} className="search-books-input-wrapper">
            /*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */
            <input
              className='search-books'
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={(e) => this.updateQuery(e.target.value)}
              />
              <input type="submit" className="search-books-submit-btn" value="Search"/>
              <button onClick={this.clearQuery}>Clear</button>
            <select>
            {showingSearchTerms.length !== 0 && (showingSearchTerms.map((searchterm) => (
              <option key={searchterm} className="search-term" value={searchterm}>{searchterm}</option>
            )))}
            </select>

          </form>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
          {searchedBooks && (searchedBooks.map((book) => (
            <li key={book.id} className='book-list-item'>
              <div className="book">
                <div className="book-top">
                  <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                  <div className="book-shelf-changer">
                    <select onChange={(e) => onChangeShelf(book, e.target.value)}>
                      <option value="none" disabled>Move to...</option>
                      <option value="currentlyReading">Currently Reading</option>
                      <option value="wantToRead">Want to Read</option>
                      <option value="read">Read</option>
                      <option value="none">None</option>
                    </select>
                  </div>
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{book.authors}</div>
              </div>
            </li>
          )))}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBooks;
