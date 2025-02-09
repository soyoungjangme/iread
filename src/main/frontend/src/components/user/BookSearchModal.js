import React,{useEffect, useState, useRef} from 'react';
import axios from 'axios';
import '../../css/user/BookSearchModal.css';

function BookSearchModal({onClose, onSelect}){

    const inputRef = useRef(null);

    const [keyword, setKeyword] = useState(''); //검색어
    const [searchResult, setSearchResult] = useState([]); //검색결과
    const [selectedBook, setSelectedBook] = useState(null); //선택도서정보

    //검색
    const searchKeyword = async() => {
        console.log('검색어: ', keyword);
        if(!keyword.trim()){
            alert('검색어를 입력해주세요.');
            inputRef.current.focus();
            return;
        }

        const resp = await axios.get('/api/userBook/searchResult',{
            params: {keyword}
        });
        setSearchResult(resp.data);
    }

    //검색어입력
    const changeKeyword = (e) => {
        setKeyword(e.target.value);
    }

    //도서선택
    const handleSelectBook = (book) => {
        setSelectedBook(book);
    };

    //선택버튼
    const handleChooseBook = () => {
        if(!selectedBook){
            alert('도서를 선택해주세요.');
            return;
        }
        onSelect(selectedBook); //부모컨포넌트로 전달
        onClose(); //모달 닫기
    };

    //엔터키
    const handleKeyDown = (e) =>{
        if(e.key === 'Enter'){
            searchKeyword();
        }
    }

    return(
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="btn-close">
                    <button onClick={onClose}>x</button>
                </div>
                <div className="modal-input">
                    <input type="text"
                        value={keyword}
                        onChange={changeKeyword}
                        onKeyDown={handleKeyDown}
                        onChange={(e)=>changeKeyword(e)} placeholder="도서명, 저자"
                        ref={inputRef}
                    />
                    <button onClick={searchKeyword}>검색</button>
                </div>
                <div className="modal-result-container">
                    <div className="list-content-group">
                        {searchResult.length > 0 ? (
                            searchResult.map((book) => (
                                <div className="list-content" key={book.bookNo}>
                                    <img src={book.image || "/null-img.png"}/>
                                    <div className="content-info">
                                        <p>{book.title}</p>
                                        <p>저자 | {book.author}</p>
                                    </div>
                                    <input type="radio"
                                        name="book"
                                        onChange={()=>handleSelectBook(book)}
                                        checked={selectedBook?.bookNo === book.bookNo}
                                    />
                                </div>
                            ))
                        ):(
                            <div className="before-search">
                                <p className="search-text">검색결과</p>
                            </div>
                        )}
                    </div>
                    <div className="select-btn">
                        <button onClick={handleChooseBook}>선택</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BookSearchModal;