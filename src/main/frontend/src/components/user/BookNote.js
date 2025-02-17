import React, { useEffect, useState }  from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import '../../css/user/BookNote.css';
import PerChapter from './PerChapter.js';
import PerPage from './PerPage.js';
import BookNoteReview from './BookNoteReview.js';
import BookSearchModal from './BookSearchModal.js';

function ReadingManage(){

    const [searchParams] = useSearchParams();

    // 북노트목록에서 클릭한 북노트정보
    const bookNoteNo = searchParams.get("no");
    const bookNo = searchParams.get("book");

    const [activeMenu, setActiveMenu] = useState('chapter'); //메뉴상태
    const [isModal, setIsModal] = useState(false); //도서검색모달상태
    const [readingStart, setReadingStart] = useState(false); //독서시작상태
    const [selectedBook, setSelectedBook] = useState(null); //선택한 도서
    const [newBookNoteNo, setNewBookNoteNo] = useState(null); //생성된 북노트 key값
    const [existBookNote, setExistBookNote] = useState(null); //호출된 북노트 데이터
    const [storeStatus, setStoreStatus] = useState(true); //저장상태

    //날짜 포맷
    const today = new Date();
    const formattedDate = `${today.getFullYear()}. ${today.getMonth() + 1}. ${today.getDate()}`;

    //북노트 데이터 호출
    const getBookNote = async() => {
        if (!bookNoteNo || !bookNo) {
            console.warn("북노트 정보가 비어있습니다.");
            return;
        }

        const resp = await axios.get('/api/userBook/bookNoteDetail',{
            params : {
                bookNoteNo, bookNo
            }
        });
        console.log(resp.data);
        const data = resp.data;
        setSelectedBook({
            bookNo: data.bookNo,
            title: data.title
        });
        setExistBookNote(data);
        setReadingStart(true);
    };


    //북노트 상세페이지
    useEffect(()=>{
        if(bookNoteNo && bookNo){
            getBookNote();
        }
    },[]);

    const handleMenuChange = (menu) => {
        if (!storeStatus) {
            if (!window.confirm('저장되지 않았습니다. 메뉴 이동하시겠습니까?')) {
                return;
            }
        }
        setStoreStatus(true);
        setActiveMenu(menu);
    };

    const handleSelectBook = (book) => {
        setSelectedBook(book);
    }

    //시작하기
    const start = async() => {
        if(selectedBook){
            setReadingStart(true);
            try{
                const resp = await axios.post('/api/userBook/readingStart', // book_note 생성
                    {
                        startDate: formattedDate,
                        bookNo: selectedBook.bookNo
                    }
                );
                setNewBookNoteNo(resp.data);
            } catch (error){
                console.error('독서시작 api 에러', error);
            }
        }
    };


    return(
        <div className="reading-manage-container">
            <div className="manage-top">> 나의 n번째 독서기록</div>
            <div className="reading-info">
                <div className="reading reading-what">
                    <p>어떤 책을 기록하시겠습니까?</p>
                    {(readingStart && selectedBook) ? (
                        <div className="book-search">
                            <input type="text" value={selectedBook?.title} disabled/>
                        </div>
                    ):(
                        <div className="book-search">
                            <button onClick={()=>setIsModal(true)}>도서검색</button>
                            <input type="text" value={selectedBook?.title} disabled/>
                        </div>
                    )}

                    {/*도서검색모달창*/}
                    {isModal &&
                        <BookSearchModal
                            onClose={()=>setIsModal(false)}
                            onSelect={handleSelectBook}
                        />
                    }
                </div>
                <div className="reading reading-start-date">
                    <p>독서시작일</p>
                    {existBookNote ? (
                        <p>{existBookNote.startDate}</p>
                    ):(
                        <p>{formattedDate}</p>
                    )}
                </div>

                {(!readingStart || !selectedBook) &&
                    <button type="button" className="start-reading" onClick={start}>시작하기</button>
                }
            </div>

            {(readingStart && selectedBook) &&
                <>
                    <div className="start-reading-menu">
                        <div className={`menu-group ${activeMenu === 'chapter' ? 'menu-active':''}`}
                            onClick={()=>handleMenuChange('chapter')}
                        >
                            <p>챕터별 기록</p>
                        </div>
                        <div className={`menu-group ${activeMenu === 'page' ? 'menu-active':''}`}
                            onClick={()=>handleMenuChange('page')}
                        >
                            <p>페이지별 기록</p>
                        </div>
                        <div className={`menu-group ${activeMenu === 'review' ? 'menu-active':''}`}
                            onClick={()=>handleMenuChange('review')}
                        >
                            <p>독서록</p>
                        </div>
                    </div>

                    {/*챕터별 기록*/}
                    {activeMenu === 'chapter' && <PerChapter bookNoteNoStr={newBookNoteNo || bookNoteNo}
                                                    storeStatus={storeStatus}
                                                    setStoreStatus={setStoreStatus}
                                                />}
                    {activeMenu === 'page' && <PerPage bookNoteNoStr={newBookNoteNo || bookNoteNo}
                                                    bookNo={bookNo || null}
                                                    storeStatus={storeStatus}
                                                    setStoreStatus={setStoreStatus}
                                                />}
                    {activeMenu === 'review' && <BookNoteReview bookNoteNoStr={newBookNoteNo || bookNoteNo}
                                                    bookNo={selectedBook.bookNo || bookNo}
                                                    storeStatus={storeStatus}
                                                    setStoreStatus={setStoreStatus}
                                                />}
                </>
            }

        </div>
    )
}

export default ReadingManage;