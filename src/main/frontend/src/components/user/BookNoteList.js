import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import '../../css/user/BookNoteList.css';

function BookNoteList(){

    const navigate = useNavigate();
    const [bookNoteList, setBookNoteList] = useState([]);
    const [endReadingCnt, setEndReadingCnt] = useState(0); //완독도서 개수

    const formattedPubDate = (dateString) => {
        const date = new Date(dateString.replace('년 ', '-').replace('월 ', '-').replace('일', ''));
        return `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}`;
    };

    useEffect(()=>{
        getList();
        getListCnt();
    },[]);

    const getList = async() => {
        const resp = await axios.get('/api/userBookNote/getMyBookNote');
        setBookNoteList(resp.data);
    };

    const getListCnt = async() => {
        const resp = await axios.get('/api/userBookNote/endReadingCnt');
        setEndReadingCnt(resp.data);
        console.log('개수확인: ',resp.data);
    };

    //삭제
    const handleDelBookNote = async(no) => {
        if(!window.confirm('삭제하시겠습니까?')){
            return;
        }

        try {
            // 쿼리 파라미터를 통해 bookNo 전달
            const resp = await axios.delete(`/api/userBookNote/deleteBookNote/${no}`);

            alert(resp.data || "해당 북노트가 삭제되었습니다.");
            getList();
        } catch (error) {
            console.error("북노트 삭제 중 오류 발생:", error);
            alert("북노트 삭제 중 오류가 발생했습니다.");
        }
    };
    
    return(
        <div className="book-note-list-container">
            <div className="my-book-note">
                <p>나의 북노트</p>
                <div className="done-reading-cnt">
                    <p>완독도서 {endReadingCnt}권</p>
                </div>
            </div>
            <div className="my-book-note-box">
                {bookNoteList.length > 0 ? (
                    bookNoteList.map((list,index) => (
                        list.endDate ? (
                            <div className="my-book">
                                <div className="book-status done-status">
                                    <p>완독</p>
                                    <div className="del-book-note" onClick={() => handleDelBookNote(list.bookNoteNo)}>
                                        <p>x</p>
                                    </div>
                                </div>
                                <img src={list.image || "./null-img.png"} alt="책표지"
                                    onClick={()=>navigate(`/user/BookNote?no=${list.bookNoteNo}&book=${list.bookNo}`)}
                                    style={{cursor:"pointer"}}
                                />
                                <p className="book-title"
                                    onClick={()=>navigate(`/user/BookNote?no=${list.bookNoteNo}&book=${list.bookNo}`)}
                                    style={{cursor:"pointer"}}
                                >{list.title}</p>
                                <div className="book-reading-period">
                                    <p className="book-start-date">{formattedPubDate(list.startDate)} ~ {formattedPubDate(list.endDate)}</p>
                                </div>
                            </div>
                        ):(
                            <div className="my-book">
                                <div className="book-status reading-status">
                                    <p>독서중</p>
                                    <div className="del-book-note" onClick={() => handleDelBookNote(list.bookNoteNo)}>
                                        <p>x</p>
                                    </div>
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
                                    <p className="book-start-date">{formattedPubDate(list.startDate)} ~ </p>
                                </div>
                            </div>
                        )
                    ))
                ):(
                    <div className="no-my-book">
                        <p>북노트 작성하기</p>
                        <a href="./BookNote">Go</a>
                    </div>
                )}
            </div>
        </div>
    );
}

export default BookNoteList;