import React from 'react';
import '../../css/user/BookSearchModal.css';

function BookSearchModal({onClose}){

    return(
    <div className="modal-overlay">
    <div className="modal-content">
    <h2>도서 검색</h2>
    <input type="text" placeholder="도서명을 입력하세요" />
    <button onClick={onClose}>닫기</button>
    </div>
    </div>
    )
}

export default BookSearchModal;