import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../../css/RegistBookSearch.css';

function RegistBookSearch(){
    //검색박스
    const [query, setQuery] = useState(''); //검색어상태
    const [searchTerm, setSearchTerm] = useState(''); //검색어
    const [searchList, setSearchList] = useState([]); //도서data

    //목록박스
    const [addedList, setAddedList] = useState([]); //추가된 도서 목록


    // 검색버튼
    const searchClick = async() => {

        if (!query.trim()) {
            alert("검색어를 입력하세요.");
            return;
        }
        setSearchTerm(query);
        try{
            const resp = await axios.get('/api/adminBook/searchBook', {
                params:{query}
            });
            const data = resp.data;
            setSearchList(data.items);
            console.log("도서정보 ", data.items);
        }catch (error){
            if (error.response) {
                // 서버에서 반환한 응답 처리
                if (error.response.status === 400) {
                    alert(error.response.data); // "검색어를 입력하세요."
                } else {
                    alert("에러 발생: " + error.response.status);
                }
            } else {
                console.error("네트워크 오류:", error.message);
            }
        }
    };

    //목록에 도서 추가
    const addList = (list) => {
        setAddedList((prevList) => {
            if (prevList.some((prev) => prev.isbn === list.isbn)) {
                alert('이미 존재');
                return prevList;
            }
            return [...prevList, list];
        });
    };

    //등록하기
    const registBook = async() => {
        try {
            const response = await axios.post('/api/adminBook/registBook', addedList);
            console.log(response.data); // "200"
        } catch (error) {
            console.error(error.response.data); // "리스트 못받음."
        }
    }

    return(
        <div className="search-book-container">
            <div className="top-title">
                <p>> 도서등록</p>
            </div>

            <div className="search-book-box">
                <div className="search-book-left">
                    <div className="search-book-content">
                        <p> 도서검색</p>
                        <div className="write-query">
                            <input type="text"
                                value={query}
                                placeholder="검색어를 입력해주세요." 
                                onChange={(e) => setQuery(e.target.value)}
                            />
                            <button type="button" onClick={searchClick}><i className="bi bi-search"></i></button>
                        </div>
                        <div className="search-result">
                            <div className="search-title">
                                <p>표지</p>
                                <p>제목</p>
                                <p>저자</p>
                                <p>출판사</p>
                                <p>출간일</p>
                                <p></p>
                            </div>
                            <div className="search-list">
                                {searchTerm ?(
                                    searchList.length > 0 ? (
                                        searchList.map((list) => (
                                            <div className="search-book" key={list.isbn}>
                                                <img src={list.image || "/img/noImg.png"} alt="책표지"/>
                                                <p>{list.title}</p>
                                                <p>{list.author}</p>
                                                <p>{list.publisher}</p>
                                                <p>{list.pubdate}</p>
                                                <button type="button" onClick={() => addList(list)}>추가</button>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="search-book" >
                                            <p style={{width: "100%"}}>해당 도서를 찾을 수 없습니다.</p>
                                        </div>
                                    )
                                ):(
                                    <div className="search-book">
                                        <p style={{width: "100%"}}>검색어를 입력해주세요.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="search-book-right">
                    <div className="search-book-list">
                        {addedList.length > 0 ? (
                            addedList.map((item, index) => (
                                <div className="book-of-list" key={item.isbn}>
                                    <p>{index+1}</p>
                                    <p>{item.title}</p>
                                    <select>
                                        <option value="" hidden>장르</option>
                                        <option>소설</option>
                                        <option>스릴러</option>
                                        <option>동화</option>
                                        <option>에세이</option>
                                    </select>
                                </div>
                            ))
                        ):(
                            null
                        )}


                    </div>
                    <button type="button" onClick={registBook}>등 록 하 기</button>
                </div>
            </div>
        </div>
    );
}

//const root = ReactDOM.createRoot(document.getElementById('root'));
//root.render(
//    <BookRegist />
//);

export default RegistBookSearch;