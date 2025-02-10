import React, {useState, useEffect, useStatem} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import '../../css/user/BookNoteList.css';

function BookNoteList(){

    const navigate = useNavigate();
    const [bookNoteList, setBookNoteList] = useState([]);

    useEffect(()=>{
        getList();
    },[]);

    const getList = async() => {
        const resp = await axios.get('/api/userBook/getMyBookNote'); //유저정보 보내야 함(나중)
        setBookNoteList(resp.data);
        console.log('확인: ', resp.data);
    }

    //북노트 상세
    const handleClickBook = () => {
        navigate(`./BookNote?`);
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
                                <img src={list.image || "./noImg.png"} alt="책표지"
                                    onClick={()=>navigate(`/user/BookNote?no=${list.bookNoteNo}&book=${list.bookNo}`)}
                                    style={{cursor:"pointer"}}
                                />
                                <p className="book-title"
                                    onClick={()=>navigate(`/user/BookNote?no=${list.bookNoteNo}&book=${list.bookNo}`)}
                                    style={{cursor:"pointer"}}
                                >{list.title}</p>
                                <div className="book-reading-period">
                                    <p className="book-start-date">{list.startDate} ~ {list.endDate}</p>
                                </div>
                            </div>
                        ):(
                            <div className="my-book">
                                <div className="book-status reading-status">
                                    <p>독서중</p>
                                </div>
                                <img src={list.image || "./noImg.png"} alt="책표지"
                                    onClick={()=>navigate(`/user/BookNote?no=${list.bookNoteNo}&book=${list.bookNo}`)}
                                    style={{cursor:"pointer"}}
                                />
                                <p className="book-title"
                                    onClick={()=>navigate(`/user/BookNote?no=${list.bookNoteNo}&book=${list.bookNo}`)}
                                    style={{cursor:"pointer"}}
                                >{list.title}</p>
                                <div className="book-reading-period">
                                    <p className="book-start-date">{list.startDate} ~ </p>
                                </div>
                            </div>
                        )
                    ))
                ):(
                    <div className="no-my-book">
                        <p>북노트 작성하기</p>
                        <a href="/user/BookNote">Go</a>
                    </div>
                )}
            </div>
        </div>
    );
}

export default BookNoteList;