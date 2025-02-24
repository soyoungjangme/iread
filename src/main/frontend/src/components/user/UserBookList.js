import React, {useState, useEffect} from 'react';
import axios from 'axios';
import '../../css/user/UserBookList.css';

function UserBookList(){

    const [books, setBooks] = useState([]);

    useEffect(()=>{
       getAllBook();
    },[]);

    //모든 책 호출
    const getAllBook = async() => {
        try{
            const resp = await axios.get('/api/userBook/getAllBook');
            setBooks(resp.data);
            console.log(resp.data);
        } catch (error){
            console.error('도서호출 중 에러발생 ', error);
        }

    };

    return(
        <div className="registed-book-list-container">
            <div className="book-list-top">
                <p>전체보기</p>
            </div>
            {books.length > 0 ? (
                    books.map((book, index)=>(
                    <div className="user-book-list-container">
                        <div className="list-no">
                            <p>{index+1}</p>
                        </div>
                        <div className="book-img">
                            <img src={book.image || "/null-img.png"} />
                        </div>
                        <div className="book-info">
                            <div>
                                <div className="info-title">
                                    <p>{book.title}</p>
                                </div>
                                <div className="info-from">
                                    <p>{book.author} | {book.publisher} | {book.pubdate}</p>
                                </div>
                                <div className="info-review">
                                    <p>리뷰 {book.reviewCnt}건</p>
                                </div>
                            </div>
                        </div>
                        <div className="book-btns">
                            <div className="like-btn btns">
                                <button type="button" className="like-text">관심있어?</button>
                                <button type="button" className="like-icon"><i className="bi bi-suit-heart-fill"></i></button>
                            </div>
                            <div className="reading-btn btns">
                                <button type="button" className="reading-text">독서할래?</button>
                                <button type="button" className="reading-icon"><i className="bi bi-pencil-fill"></i></button>
                            </div>
                            <button type="button" className="write-review">리뷰쓸래</button>
                        </div>
                    </div>
                ))
            ):(
                <div className="book-none-list" >
                    <p>도서가 존재하지 않습니다.</p>
                </div>
            )}
        </div>
    );
}

export default UserBookList;