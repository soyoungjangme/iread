import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import '../../css/BookRegist.css';

function BookRegist(){


    return(
        <div className="book-regist-container">
            <div className="top-title">
                <p>도서등록</p>
            </div>
            <div className="book-regist-box">
                <div className="book-regist-left">
                    <div className="book-regist-content">
                        <div className="book-regist-info">
                            <p>도서명</p>
                            <div className="book-info book-title">데미안</div>

                            <p>저자</p>
                            <div className="book-info book-author">헤르만 헤세</div>

                            <p>카테고리</p>
                            <div className="book-info book-category">소설</div>

                            <p>발행일</p>
                            <div className="book-info book-published-date">2024-12-11</div>
                        </div>
                        <div className="book-regist-bottom">
                            <div className="book-content-text">줄거리ㅏ얼아러알</div>
                        </div>
                    </div>
                    <button type="button">도 서 검 색</button>
                </div>
                <div className="book-regist-delete">
                    <button type="button">저장</button>
                    <button type="button">삭제</button>
                </div>
                <div className="book-regist-right">
                    <div className="book-regist-list">
                        <div className="book-of-list">
                            <p>1</p>
                            <p>데미안</p>
                            <p>소설</p>
                        </div>
                        <div className="book-of-list">
                            <p>1</p>
                            <p>데미안</p>
                            <p>소설</p>
                        </div>
                    </div>
                    <button type="button">등 록 하 기</button>
                </div>
            </div>
        </div>
    );
}

//const root = ReactDOM.createRoot(document.getElementById('root'));
//root.render(
//    <BookRegist />
//);

export default BookRegist;