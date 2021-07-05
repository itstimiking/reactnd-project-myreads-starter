import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'

import { Route } from 'react-router-dom';
import Search from './search';
import Shelf from './shelf';

class BooksApp extends React.Component {
  state={
      read: [],
      wantToRead: [],
      reading: [],
  }

  componentDidMount(){	  
      this.getAllBooksInShelf()
  }

  getAllBooksInShelf = () => {
    BooksAPI.getAll().then(books=>{       
        this.setState({
            reading: books.filter(book=>book.shelf==="currentlyReading"),
            wantToRead: books.filter(book=>book.shelf==="wantToRead"),
            read: books.filter(book=>book.shelf==="read"),
        })         
    })
  }
  
  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
      		<Shelf shelf={this.state} getAllBooksInShelf={this.getAllBooksInShelf} />
    	)} />

		<Route exact path="/search" render={() => (
      		<Search shelf={this.state} getAllBooksInShelf={this.getAllBooksInShelf} />
    	)} />
      </div>
    )
  }
}

export default BooksApp
