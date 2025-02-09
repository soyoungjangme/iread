import React, {useEffect, useState} from 'react';
import axios from 'axios';
import '../../css/user/BookNoteList.css';

function BookNoteList(){

    const [bookNoteList, setBookNoteList] = useState([]);

    useEffect(()=>{
        getList();
    },[]);

    const getList = async() => {
        const resp = await axios.get('/api/userBook/getMyBookNote'); //유저정보 보내야 함(나중)
        setBookNoteList(resp.data);
        console.log('확인: ', resp.data);
    }
    
    return(
        <div className="book-note-list-container">
            <div className="my-book-note">
                <p>나의 북노트</p>
            </div>
            <div className="my-book-note-box">
    {bookNoteList.length > 0 ? (
        bookNoteList.map((list,index) => (
            list.endDate ? (
                <div className="my-book">
                    <div className="book-status done-status">
                        <p>완독</p>
                    </div>
                    <img src={list.image || "./noImg.png"} alt="책표지" />
                    <p className="book-title">{list.title}</p>
                    <div className="book-reading-period">
                        <p className="book-start-date">{list.startDate} ~ {list.endDate}</p>
                    </div>
                </div>
            ):(
                <div className="my-book">
                    <div className="book-status reading-status">
                        <p>독서중</p>
                    </div>
                    <img src={list.image || "./noImg.png"} alt="책표지" />
                    <p className="book-title">{list.title}</p>
                    <div className="book-reading-period">
                        <p className="book-start-date">{list.startDate} ~ </p>
                    </div>
                </div>
            )
        ))
    ):(
        <div className="my-book">
            <p>북노트 작성하기</p>
            <a href="./BookNote">Go</a>
        </div>
    )}


                {/*<div className="my-book">
                    <div className="book-status done-status">
                        <p>완독</p>
                    </div>
                    <img src="/img/다운로드 (4).jpg" alt="책표지" />
                    <p className="book-title">도서제목</p>
                    <div className="book-reading-period">
                        <p className="book-start-date">2024.12.13 ~ 2024.12.30</p>
                    </div>
                </div>*/}
            </div>
        </div>
    );
}

export default BookNoteList;