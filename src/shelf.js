import React from 'react';
import './App.css'
import * as BooksAPI from './BooksAPI'
import {Link} from 'react-router-dom';

class Shelf extends React.Component{
  	
   	moveBook(book,shelf){
	  	BooksAPI.update(book, shelf).then(res=>this.props.getAllBooksInShelf())
   	}
  
  	render(){
        
    	return(
        	<div className="list-books">
          
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>

                <div className="list-books-content">
                    <div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Currently Reading</h2>

                            <div className="bookshelf-books">
                                <ol className="books-grid">
                                    
          							{this.props.shelf.reading.map(book=>(
        								<li key={book.title} >
                                            <div className="book">
                                                <div className="book-top">
                                                    <div className="book-cover" 
                                                        style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}>
                                                    </div>
                                                    <div className="book-shelf-changer">
                                                        <select onChange={(e)=>this.moveBook(book, e.target.value)} defaultValue={book.shelf} >
                                                            <option value="move" disabled hidden>Move to...</option>
                                                            <option value="currentlyReading">Currently Reading</option>
                                                            <option value="wantToRead">Want to Read</option>
                                                            <option value="read">Read</option>
                                                            <option value="none">None</option>
                                                        </select>
                                                    </div>
                                                    </div>
                                                <div className="book-title">{book.title}</div>
												{book.authors.map((author, index)=><div className="book-authors" key={`${book.author} + ${index}`} >{author}</div>)}
                                            </div>
                                        </li>
        							))}
                                </ol>
                            </div>
                        </div>

                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Want to Read</h2>

                            <div className="bookshelf-books">
                                <ol className="books-grid">
                                    {this.props.shelf.wantToRead.map(book=>(
        								<li key={book.title} >
                                            <div className="book">
                                                <div className="book-top">
                                                    <div className="book-cover" 
                                                        style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}>
                                                    </div>
                                                    <div className="book-shelf-changer">
                                                        <select onChange={(e)=>this.moveBook(book, e.target.value)} defaultValue={book.shelf} >
                                                            <option value="move" disabled>Move to...</option>
                                                            <option value="currentlyReading">Currently Reading</option>
                                                            <option value="wantToRead">Want to Read</option>
                                                            <option value="read">Read</option>
                                                            <option value="none">None</option>
                                                        </select>
                                                    </div>
                                                    </div>
                                                <div className="book-title">{book.title}</div>
												{book.authors.map((author, index)=><div className="book-authors" key={`${book.author} + ${index}`} >{author}</div>)}
                                            </div>
                                        </li>
        							))}

                                </ol>
                            </div>
                        </div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Read</h2>

                            <div className="bookshelf-books">
                                <ol className="books-grid">
                                    {this.props.shelf.read.map(book=>(
        								<li key={book.title} >
                                            <div className="book">
                                                <div className="book-top">
                                                    <div className="book-cover" 
                                                        style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}>
                                                    </div>
                                                    <div className="book-shelf-changer">
                                                        <select onChange={(e)=>this.moveBook(book, e.target.value)} defaultValue={book.shelf} >
                                                            <option value="move" disabled>Move to...</option>
                                                            <option value="currentlyReading">Currently Reading</option>
                                                            <option value="wantToRead">Want to Read</option>
                                                            <option value="read">Read</option>
                                                            <option value="none">None</option>
                                                        </select>
                                                    </div>
                                                    </div>
                                                <div className="book-title">{book.title}</div>
												{book.authors.map((author, index)=><div className="book-authors" key={`${book.author} + ${index}`} >{author}</div>)}
                                            </div>
                                        </li>
        							))}

                                </ol>
                            </div>
                        </div>

                    </div>

                    <div className="open-search">
                        <Link to="/search">Add a book</Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default Shelf;