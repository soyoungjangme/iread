import React, { useEffect, useState }  from 'react';
import axios from 'axios';
import '../../css/user/ReadingManage.css';
import PerChapter from './PerChapter.js';
import PerPage from './PerPage.js';
import BookSearchModal from './BookSearchModal.js';

function ReadingManage(){

    const [activeMenu, setActiveMenu] = useState('chapter');
    const [isModal, setIsModal] = useState(false);

    const handleMenu = (menu) => {
        setActiveMenu(menu);
    }

    const today = new Date();
    const formattedDate = `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일`;


    return(
        <div className="reading-manage-container">
            <div className="manage-top">> 나의 n번째 독서기록</div>
            <div className="reading-info">
                <div className="reading reading-what">
                    <p>어떤 책을 기록하시겠습니까?</p>
                    <div className="book-search">
                        <button onClick={()=>setIsModal(true)}>도서검색</button>
                        <input type="text" placeholder="도서명" disabled/>
                    </div>
                    {/*도서검색팝업창*/}
                    {isModal && <BookSearchModal onClose={()=>setIsModal(false)} />}
                </div>
                <div className="reading reading-start-date">
                    <p>독서시작일</p>
                    <p>{formattedDate}</p>
                </div>
                <div className="reading-count">
                    <p>다시 읽은 책입니다.</p>
                </div>
                <button type="button" className="start-reading">시작하기</button>
            </div>
            <div className="start-reading-menu">
                <div className={`menu-group ${activeMenu === 'chapter' ? 'active':''}`}
                    onClick={()=>handleMenu('chapter')}
                >
                    <p>챕터별 기록</p>
                </div>
                <div className={`menu-group ${activeMenu === 'page' ? 'active':''}`}
                    onClick={()=>handleMenu('page')}
                >
                    <p>페이지별 기록</p>
                </div>
                <div className={`menu-group ${activeMenu === 'review' ? 'active':''}`}
                    onClick={()=>handleMenu('review')}
                >
                    <p>독서록</p>
                </div>
            </div>
            {/*챕터별 기록*/}
            {activeMenu === 'chapter' && <PerChapter />}
            {activeMenu === 'page' && <PerPage />}
        </div>
    )
}

export default ReadingManage;