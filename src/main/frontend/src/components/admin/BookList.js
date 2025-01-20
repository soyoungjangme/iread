import React, { useEffect, useState }  from 'react';
import axios from 'axios';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../../css/admin/BookList.css';

function BookList(){
    const [bookList, setBookList] = useState([]);

    useEffect(() => {
        const getBooks = async() => {
            try{
                const resp = await axios.get('/api/adminBook/getAllBook');
                setBookList(resp.data);
            }catch(error){
                console.log('도서목록 호출 중 error, ', error);
            }
        }
        getBooks();
    },[]);

    //검색
    const searchKeyword = async(e) => {
        const keyword = e.target.value;
        console.log("검색어: ", keyword);

        if (e.type === "keypress" && e.key !== "Enter") {
            return;
        }

        try{
            const resp = await axios.get('/api/adminBook/searchResult',{
                params: {keyword}
            });
            //setBookList(resp.data);
            console.log(resp.data);
        }catch (error){
            console.log("검색결과 호출 중 error ", error);
        }
    }

    return(
        <div className="registed-book-list-container">
            <div className="book-search">
                <p><i className="bi bi-search"></i></p>
                <div className="search-box">
                    <input type="text"
                        onKeyPress={(e) => searchKeyword(e)}
                        placeholder="도서명, 작가명, 장르"
                    />
                </div>
            </div>
            <div className="book-regist">
                <button type="button">도서등록</button>
                <div className="regist-way-container">
                    <div className="regist-way-box">
                        <div className="write-way">
                            <a href="./RegistWriteBook">직접등록</a>
                        </div>
                        <div className="search-way">
                            <a href="./RegistSearchBook">도서검색</a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="registed-book-list">

                {bookList.length > 0 ? (
                    bookList.map((list, index)=>(
                        <div className="book-box">
                            <div className="book-title">
                                <div className="book-no">{index + 1}</div>
                                    <p>{list.title}</p>
                                </div>
                                <div className="info">
                                    <div className="book-img">
                                        <img src={list.image} alt="이미지"/>
                                    </div>
                                <div className="book-info">

                                <div className="info-title">
                                    <p>작가명 </p>
                                    <p>장르 </p>
                                    <p>출간일 </p>
                                </div>
                                <div className="info-cont">
                                    <p>{list.author}</p>
                                    <p>소설</p>
                                    <p>{list.pubdate}</p>
                                </div>
                                </div>
                                <div className="book-review-cnt">
                                    <p>리뷰(231)</p>
                                </div>
                                <div className="info-btn">
                                    <button className="book-detail">상세보기</button>
                                    <button className="book-modify">수정</button>
                                    <button className="book-del">삭제</button>
                                </div>
                            </div>
                        </div>
                    ))
                ):(
                    <div className="book-box">
                        <p style={{fontSize:"small"}}>등록된 도서가 존재하지 않습니다.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default BookList;