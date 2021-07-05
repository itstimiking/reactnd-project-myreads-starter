import React from "react";
import "./App.css";
import * as BooksAPI from "./BooksAPI";
import { Link } from "react-router-dom";

class Search extends React.Component {
    state = {
        searchBooksResult: [],
        queryString: "",
        reading:[],
        wantToRead:[],
        read:[]
    };

    componentDidMount(){
        if(this.state.queryString === ""){
            this.queryBooks("android");
        }
        this.getBooksInShelfId()
    }

    getBooksInShelfId(){
        const getCurrentlyReading = this.props.shelf.reading.map(book=>book.id);
        const getRead = this.props.shelf.read.map(book=>book.id);
        const getWantToRead = this.props.shelf.wantToRead.map(book=>book.id);
        console.log("SETTING BOOKS IN SHELF ID'S")
        this.setState({
            reading: getCurrentlyReading,
            read: getRead,
            wantToRead:getWantToRead
        })
    }

    async queryBooks(queryString) {
        var books = await BooksAPI.search(queryString, 20)
        if( books !== undefined && !books.error ){
            this.setState({ searchBooksResult: books });
            this.getBooksInShelfId()
        }
    }

    async addBookToShelf(book, shelf) {
        BooksAPI.update(book, shelf).then((res) =>{
            console.log(book.title, "ADDED TO SHELF ---", shelf)
        });
    }

    getShelf(bookId){
        if(this.state.reading.includes(bookId)){
            return "currentlyReading"
        }else if(this.state.read.includes(bookId)){
            return "read"
        }else if(this.state.wantToRead.includes(bookId)){
            return "wantToRead"
        }
    }

    handleChange(e) {
        this.setState({ queryString: e.target.value });

        if(e.target.value !== undefined){
            this.queryBooks(e.target.value)
        }
    }

    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to="/">
                        Close
                    </Link>
                    <div className="search-books-input-wrapper">
                        <input
                            type="text"
                            placeholder="Search by title or author"
                            value={this.state.query}
                            onChange={this.handleChange.bind(this)}
                        />
                    </div>
                </div>

                <div className="search-books-results">
                    <ol className="books-grid">
                        {this.state.searchBooksResult !== undefined &&
                            this.state.searchBooksResult.map((book) => (
                                <li key={book.id}>
                                    <div className="book">
                                        <div className="book-top">
                                            <div
                                                className="book-cover"
                                                style={{
                                                    width: 128,
                                                    height: 193,
                                                    backgroundImage: `url(${book.imageLinks.thumbnail})`
                                                }}
                                            />
                                            <div className="book-shelf-changer">
                                                <select
                                                    onChange={(e) =>
                                                        this.addBookToShelf(book,e.target.value)
                                                    }
                                                    defaultValue={this.getShelf(book.id)}
                                                >
                                                    <option
                                                        value="move"
                                                        disabled
                                                        hidden
                                                    >
                                                        Move to...
                                                    </option>
                                                    <option value="currentlyReading">
                                                        Currently Reading
                                                    </option>
                                                    <option value="wantToRead">
                                                        Want to Read
                                                    </option>
                                                    <option value="read">
                                                        Read
                                                    </option>
                                                    <option value="none">
                                                        None
                                                    </option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="book-title">
                                            {book.title}
                                        </div>
                                        {book.authors && book.authors.map((author) => (
                                            <div
                                                className="book-authors"
                                                key={book.author}
                                            >
                                                {author}
                                            </div>
                                        ))}
                                    </div>
                                </li>
                            ))
                        }
                    </ol>
                </div>
            </div>
        );
    }
}

export default Search;
