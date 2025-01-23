import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../../css/admin/RegistSearchBook.css';

function RegistSearchBook(){
    const [loading, setLoading] = useState(false);

    //검색박스
    const [query, setQuery] = useState(''); //검색어상태
    const [searchTerm, setSearchTerm] = useState(''); //검색어
    const [searchList, setSearchList] = useState([]); //도서data
    const [cantSelect, setCantSelect] = useState([]); //이미 등록된 도서

    //목록박스
    const [addedList, setAddedList] = useState([]); //추가된 도서 목록
    const [genre, setGenre] = useState([]); // 장르 호출

    useEffect(() => {
        checkSameBook();
        getGenre();
    },[]);

    //검색목록
    //이미 등록된 도서 처리
    const checkSameBook = async() => {
        try{
            const resp = await axios.get('/api/adminBook/getIsbn');
            setCantSelect(resp.data);
        } catch(error){
            console.log("등록된 도서 호출 중 error ", error);
        }
    }

    //장르호출
    const getGenre = async() => {
        try{
            const resp = await axios.get('/api/adminBook/getGenre');
            setGenre(resp.data);
            console.log("장르 ", resp.data);
        }catch (error){
            console.log("장르 호출 중 error ", error);
        }
    }

    // 검색버튼
    const searchClick = async(e) => {

        if (!query.trim()) {
            alert("검색어를 입력하세요.");
            return;
        }
        setSearchTerm(query);
        setLoading(true);
        try{
            const resp = await axios.get('/api/adminBook/searchBook', {
                params:{query}
            });
            const data = resp.data;
            setSearchList(data.items);
        }catch (error){
            // 서버에서 반환한 응답 처리
            if (error.response.status === 400) {
                alert(error.response.data); // "검색어를 입력하세요."
            } else {
                alert("에러 발생: " + error.response.status);
            }
        } finally{
            setLoading(false);
        }
    };

    //목록에 도서 추가
    const addList = (list) => {
        setAddedList((prevList) => {
            if (prevList.some((prev) => prev.isbn === list.isbn)) {
                alert('이미 존재');
                return prevList;
            }
            return [...prevList, { ...list, genreNo: "" }];
        });
    };

    //등록하기
    const registBook = async() => {
        if(addedList.length === 0){
            alert('목록이 비어있습니다.');
            return;
        }

        for (const book of addedList) {
            if (!book.genreNo) {
                alert('장르를 선택하지 않은 도서가 있습니다.');
                return;
            }
        }

        try {
            const response = await axios.post('/api/adminBook/registBook', addedList);
            alert(response.data); // "등록성공"

            if(response.status){
                window.location.href="/iread/admin/booklist";
            }
        } catch (error) {
            console.error(error.response ? error.response.data : error.message);
            alert('서버 오류가 발생했습니다.');
        }
    }

    //삭제
    const deleteListBook = (isbn) => {
        setAddedList((prev) =>
            prev.filter((item) => item.isbn !== isbn)
        );
    };

    const genreChange = (e, isbn) => {
        const genreNo = e.target.value;
        setAddedList((prev) =>
            prev.map((book) =>
                book.isbn === isbn ? { ...book, genreNo } : book
            )
        );
        console.log('추가된 목록 ', addedList);
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
                                onKeyDown={(e) => e.key === 'Enter' && searchClick(e)}
                            />
                            <button type="button" onClick={searchClick}>
                                <i className="bi bi-search"></i>
                            </button>
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
                                loading ? (
                                    <div className="search-book">
                                        <p style={{width: "100%"}}>Loading...</p>
                                    </div>
                                ) : searchList.length > 0 ? (
                                        searchList.map((list) => (
                                            <div className={cantSelect.includes(list.isbn) ? "search-book activated" : "search-book"}
                                                key={list.isbn}
                                            >
                                                <img src={list.image || "/img/noImg.png"} alt="책표지"/>
                                                <p>{list.title}</p>
                                                <p>{list.author}</p>
                                                <p>{list.publisher}</p>
                                                <p>{list.pubdate}</p>
                                                <button
                                                    type="button"
                                                    onClick={() => addList(list)}
                                                    disabled={cantSelect.includes(list.isbn)}  // cantSelect에 포함된 ISBN이면 disabled 처리
                                                >추가</button>
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
                                    {genre.length > 0 ? (
                                        <select onChange={(e)=> genreChange(e, item.isbn)}>
                                            <option value="" disabled selected>장르</option>
                                            {genre.map((genreItem, genreIndex) => (
                                                <option key={genreIndex} value={genreItem.genreNo}>{genreItem.genreName}</option>
                                            ))}
                                        </select>
                                    ):(
                                        <select>
                                            <option value="" hidden>없음</option>
                                        </select>
                                    )}
                                    <button type="button" onClick={()=>deleteListBook(item.isbn)}>삭제</button>
                                </div>
                            ))
                        ):(
                            <div className="book-of-list">
                                <p style={{gridColumn:"span 15", textAlign: "center", fontWeight: "normal"}}>비어있음</p>
                            </div>
                        )}


                    </div>
                    <button type="button" onClick={registBook}>등 록 하 기</button>
                </div>
            </div>
        </div>
    );
}


export default RegistSearchBook;