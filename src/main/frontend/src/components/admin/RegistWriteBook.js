import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../css/admin/RegistWriteBook.css';


function RegistWriteBook(){

    const [bookInfo, setBookInfo] = useState([]);

    const changeInput = (e) => {
        const {id, value} = e.target;
        setBookInfo((prev) => ({
            ...prev,
            [id]: value
        }));
    }

    const registBook = async() => {
        console.log('bookInfo ',bookInfo);
        try{
            const resp = await axios.post('/api/adminBook/registWriteBook', bookInfo);
            alert(resp.data);
            if(resp.status){
                window.location.href="/iread/admin/booklist";
            }
        }catch (error){
            console.log("도서등록실패 ", error);
        }
    }

    return(
        <div className="write-book-container">
            <div className="top-title">
                <p>> 직접등록</p>
            </div>
            <div className="form-container">
                <div className="form left-box">
                    <div className="input-group">
                        <p>도서명</p>
                        <input type="text" id="title" value={bookInfo.title} onChange={changeInput} placeholder="도서명 입력"/>
                    </div>
                    <div className="input-group">
                        <p>출판사</p>
                        <input type="text" id="publisher" value={bookInfo.publisher} onChange={changeInput} placeholder="출판사 입력"/>
                    </div>
                    <div className="input-group">
                        <p>ISBN</p>
                        <input type="text" id="isbn" value={bookInfo.isbn} onChange={changeInput} placeholder="isbn 입력"/>
                    </div>
                    <div className="img-group">
                        <p>표지</p>
                        <div className="img-regist">
                            <button type="button">이미지 업로드</button>
                            <div className="img-box">
                                <img src="" alt="이미지" id="image" value={bookInfo.image} onChange={changeInput}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="form right-box">
                    <div className="input-group">
                        <p>저자</p>
                        <input type="text" id="author" value={bookInfo.author} onChange={changeInput} placeholder="저자 입력"/>
                    </div>
                    <div className="input-group">
                        <p>출간일</p>
                        <input type="text" id="pubdate" value={bookInfo.pubdate} onChange={changeInput} placeholder="출간일 입력"/>
                    </div>
                    <div className="input-group descript">
                        <p>설명</p>
                        <textarea id="description" value={bookInfo.description} onChange={changeInput} placeholder="설명을 입력해주세요."></textarea>
                    </div>
                </div>
            </div>
            <div className="regist-btn">
                <button type="button" onClick={registBook}>등록하기</button>
            </div>
        </div>
    );
}

export default RegistWriteBook;