import React, { useEffect, useState }  from 'react';
import axios from 'axios';
import '../../css/user/ReadingManage.css';
import PerChapter from './PerChapter.js';
import PerPage from './PerPage.js';
import BookSearchModal from './BookSearchModal.js';

function ReadingManage(){

    const [activeMenu, setActiveMenu] = useState('chapter'); //기록메뉴
    const [isModal, setIsModal] = useState(false); //도서검색모달
    const [selectedBook, setSelectedBook] = useState(null); //선택한 도서
    const [readingStart, setReadingStart] = useState(false); //독서시작상태

    //날짜 포맷
    const today = new Date();
    const formattedDate = `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일`;

    const handleMenu = (menu) => {
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
                await axios.post('/api/userBook/readingStart',{startDate: formattedDate});
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
                    {isModal && <BookSearchModal onClose={()=>setIsModal(false)} onSelect={handleSelectBook} />}
                </div>
                <div className="reading reading-start-date">
                    <p>독서시작일</p>
                    <p>{formattedDate}</p>
                </div>

                {/*<div className="reading-count">
                    <p>다시 읽은 책입니다.</p>
                </div>*/}

                {(!readingStart || !selectedBook) &&
                    <button type="button" className="start-reading" onClick={start}>시작하기</button>
                }
            </div>

            {(readingStart && selectedBook) &&
                <>
                    <div className="start-reading-menu">
                        <div className={`menu-group ${activeMenu === 'chapter' ? 'menu-active':''}`}
                            onClick={()=>handleMenu('chapter')}
                        >
                            <p>챕터별 기록</p>
                        </div>
                        <div className={`menu-group ${activeMenu === 'page' ? 'menu-active':''}`}
                            onClick={()=>handleMenu('page')}
                        >
                            <p>페이지별 기록</p>
                        </div>
                        <div className={`menu-group ${activeMenu === 'review' ? 'menu-active':''}`}
                            onClick={()=>handleMenu('review')}
                        >
                            <p>독서록</p>
                        </div>
                    </div>

                    {/*챕터별 기록*/}
                    {activeMenu === 'chapter' && <PerChapter />}
                    {activeMenu === 'page' && <PerPage />}
                </>
            }

        </div>
    )
}

export default ReadingManage;