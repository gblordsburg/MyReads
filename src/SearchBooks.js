import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import escapeRegExp from 'escape-string-regexp';
import sortBy from 'sort-by';

class SearchBooks extends Component {
  static propTypes = {
    query: PropTypes.string,
    searchterms: PropTypes.array.isRequired,
    searchedBooks: PropTypes.array.isRequired,
    onChangeShelf: PropTypes.func.isRequired,
    onSearchBooks: PropTypes.func.isRequired,
    onUpdateQuery: PropTypes.func.isRequired,
    onClearQuery: PropTypes.func.isRequired
  }


  render() {
    const { query, searchterms, onChangeShelf, onSearchBooks, searchedBooks, onUpdateQuery, onClearQuery } = this.props
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
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <h3>Type in a desired book genre/category to see the corresponding
            search terms. Click on one to return all relevant books
            </h3>
            <input
              className='search-books'
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={(e) => onUpdateQuery(e.target.value)}
              />
              {/*<input type="submit" className="search-books-submit-btn" value="Search"/>*/}
            <button onClick={onClearQuery}>Clear</button>
            <select onChange={(e) => onSearchBooks(e.target.value)}>
            {showingSearchTerms.length !== 0 && (showingSearchTerms.map((searchterm) => (
              <option key={searchterm} className="search-term" value={searchterm}>{searchterm}</option>
            )))}
            </select>

          </div>
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
