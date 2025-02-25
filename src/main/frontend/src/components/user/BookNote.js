import React, { useEffect, useState }  from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import '../../css/user/BookNote.css';
import PerChapter from './PerChapter.js';
import PerPage from './PerPage.js';
import BookNoteReview from './BookNoteReview.js';
import BookSearchModal from './BookSearchModal.js';

function ReadingManage(){

    const [searchParams] = useSearchParams();
    const location = useLocation();


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
    const [endStatus, setEndStatus] = useState(false); //완독상태
    const [endDate, setEndDate] = useState(""); //독서종료일입력값

    //도서목록에서 가져온 책정보
    useEffect(() => {
        if (location.state?.bookNo && location.state?.title) {
            setSelectedBook({
                bookNo: location.state.bookNo,
                title: location.state.title
            });
        }
    }, [location.state]);

    //날짜 포맷
    const today = new Date();
    const formattedDate = `${today.getFullYear()}. ${today.getMonth() + 1}. ${today.getDate()}`;

    //북노트 데이터 호출
    const getBookNote = async() => {
        if (!bookNoteNo || !bookNo) {
            console.warn("북노트 정보가 비어있습니다.");
            return;
        };
        const resp = await axios.get('/api/userBookNote/bookNoteDetail',{
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

        if(data.endDate != null){
            setEndStatus(true);
        }
    };

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
    };

    const handleEndDateChange = (e) => {
        setEndDate(e.target.value);
    };

    //시작하기
    const start = async() => {
        if(selectedBook){
            setReadingStart(true);
            try{
                const resp = await axios.post('/api/userBookNote/readingStart', // book_note 생성
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

    //독서완료
    const end = async () => {
        if(!window.confirm('더이상 수정이 불가합니다. 기록을 종료하시겠습니까?')){
            return;
        }

        if (storeStatus) {
            if (endDate) {
                const date = new Date(endDate);
                const formattedEndDate = `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}`;

                try {
                    await axios.post('/api/userBookNote/readingEnd', {
                        endDate: formattedEndDate,
                        bookNoteNo: bookNoteNo
                    });
                    setEndStatus(true);
                    window.location.reload();
                } catch (error) {
                    console.error("독서 종료 API 에러", error);
                }
            } else {
                alert("독서 종료일을 선택하세요.");
            }
        }
    };


    return(
        <div className="reading-manage-container">
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
                <div className="reading date-group">
                    <div className="date reading-start-date">
                        <p>독서시작일</p>
                        {existBookNote ? (
                            <p className="reading-date">{existBookNote.startDate}</p>
                        ):(
                            <p className="reading-date">{formattedDate}</p>
                        )}
                    </div>
                    {(newBookNoteNo || bookNoteNo) ? (
                        <div className="date reading-end-date">
                            <p>독서종료일</p>
                            {existBookNote?.endDate ? (
                                <p className="reading-date">{existBookNote.endDate}</p>
                            ):(
                                <input type="date" value={endDate || ""} onChange={handleEndDateChange}/>
                            )}
                        </div>
                    ):(
                        null
                    )}
                </div>

                {(!readingStart || !selectedBook) ?(
                    <button type="button" className="start-reading" onClick={start}>시작하기</button>
                ):(
                    !endStatus &&
                        <button type="button" className="end-reading" onClick={end}>독서완료</button>
                )}
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
                                                    endStatus={endStatus}
                                                />}
                    {activeMenu === 'page' && <PerPage bookNoteNoStr={newBookNoteNo || bookNoteNo}
                                                    bookNo={bookNo || null}
                                                    storeStatus={storeStatus}
                                                    setStoreStatus={setStoreStatus}
                                                    endStatus={endStatus}
                                                />}
                    {activeMenu === 'review' && <BookNoteReview bookNoteNoStr={newBookNoteNo || bookNoteNo}
                                                    bookNo={selectedBook.bookNo || bookNo}
                                                    storeStatus={storeStatus}
                                                    setStoreStatus={setStoreStatus}
                                                    endStatus={endStatus}
                                                />}
                </>
            }

        </div>
    )
}

export default ReadingManage;