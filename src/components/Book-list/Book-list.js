import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import BookListItem from '../Book-list-item/Book-list-item';
import withBookstoreService from '../hocs/with-bookstore-service';
import {fetchBooks, bookAddedToCart} from "../../actions";
import compose from '../../utils';

import './Book-list.css';
import Spinner from "../Spinner/Spinner";
import ErrorIndicator from "../Error-indicator/Error-indicator";

class BookListContainer extends Component {
    componentDidMount() {
        this.props.fetchBooks();
    }
    render() {
        const {books, loading, error, onAddedToCart} = this.props;
        if (loading) {
            return <Spinner/>;
        }
        if (error) {
            return <ErrorIndicator/>;
        }
        return <BookList books={books} onAddedToCart={onAddedToCart}/>;
    }}
const BookList = ({ books, onAddedToCart}) => {
    return (
        <ul className="book-list">
            {
                books.map((book) => {
                    return (
                        <li key={book.id}>
                            <BookListItem
                                book={book}
                                onAddedToCart={() => onAddedToCart(book.id)}
                            />
                        </li>
                    );
                })
            }
        </ul>
    );
};

const mapStateToProps = ({ bookList: { books, loading, error }}) => {
        return { books, loading, error };
};

    const mapDispatchToProps = (dispatch, ownProps) => {
        const {bookstoreService} = ownProps;
    return bindActionCreators({
        fetchBooks: fetchBooks(bookstoreService),
        onAddedToCart: bookAddedToCart
    }, dispatch);
};

export default compose(
    withBookstoreService(),
    connect(mapStateToProps, mapDispatchToProps)
)(BookListContainer);