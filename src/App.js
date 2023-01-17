import { useState, useEffect } from "react";
import axios from "axios";
import BookCreate from "./components/BookCreate";
import BookList from './components/BookList';

function App() {
    const [books, setBooks] = useState([]);

    const fetchBooks = async () => {
        const response = await axios.get('http://localhost:3001/books');
        setBooks(response.data);
    };

    useEffect(() => {
        fetchBooks();
    }, []);

    const editBookById = async (id, newtitle) => {
        const response = await axios.put(`http://localhost:3001/books/${id}`, {
            title: newtitle
        });

        const updatedBooks = books.map((book) => {
            if (book.id === id) {
                return { ...book, ...response.data }
            }
            return book;
        });
        setBooks(updatedBooks)
    };

    const deleteBookById = async (id) => {
        await axios.delete(`http://localhost:3001/books/${id}`);

        const updatedBooks = books.filter((book) => {
            return book.id !== id;
        });
        setBooks(updatedBooks)
    }

    const creatBook = async (title) => {
        const response = await axios.post('http://localhost:3001/books', {
            title
        });

        if (title) {
            const updatedBooks = [...books, response.data]
            setBooks(updatedBooks)
        } else {
            alert('Please enter the book title')
        }
    }


    return (
        <div className="app">
            <h1>Reading List</h1>
            <BookList onEdit={editBookById} books={books} onDelete={deleteBookById} />
            <BookCreate onCreate={creatBook} />
        </div>
    )
}

export default App;