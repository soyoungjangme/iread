import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import '../../css/admin/RegistWriteBook.css';


function RegistWriteBook(){

    const imgRef = useRef();

    const [bookInfo, setBookInfo] = useState({}); // 입력정보
    const [genre, setGenre] = useState([]); //장르

    useEffect(()=>{
        getGenre();
    },[]);

    const saveImgFile = async(e) => {
        const id = e.target.id;

        const file = imgRef.current.files[0];
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "czw3v2c2"); // Cloudinary 업로드 프리셋 이름
        formData.append("cloud_name", "dpyihadmu"); // Cloudinary Cloud Name

        try {
            const response = await axios.post(
                "https://api.cloudinary.com/v1_1/dpyihadmu/image/upload",
                formData
            );
            console.log("업로드 성공:", response.data);
            setBookInfo((prev) => ({ // 이미지 URL 저장
                            ...prev,
                            [id]: response.data.secure_url
                        }));
        } catch (error) {
            console.error("업로드 실패:", error);
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

    const genreChange = (e) => {
        const genreNo = e.target.value;
        setBookInfo((prev) => ({
            ...prev,
            genreNo
        }));
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
                        <input type="text" id="title" value={bookInfo.title || ''} onChange={changeInput} placeholder="도서명 입력"/>
                    </div>
                    <div className="input-group">
                        <p>출판사</p>
                        <input type="text" id="publisher" value={bookInfo.publisher || ''} onChange={changeInput} placeholder="출판사 입력"/>
                    </div>
                    <div className="input-group">
                        <p>ISBN</p>
                        <input type="text" id="isbn" value={bookInfo.isbn || ''} onChange={changeInput} placeholder="isbn 입력"/>
                    </div>
                    <div className="img-group">
                        <p>표지</p>
                        <div className="img-regist">
                            <div className="img-regist">
                                <input type="file"
                                    accept="image/*"
                                    id="image"
                                    onChange={saveImgFile}
                                    ref={imgRef}
                                />
                                <div className="img-box">
                                    <img src={bookInfo.image || "/null-img.png"}
                                        alt="이미지"
                                        value={bookInfo.image}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="form right-box">
                    <div className="input-group">
                        <p>저자</p>
                        <input type="text" id="author" value={bookInfo.author || ''} onChange={changeInput} placeholder="저자 입력"/>
                    </div>
                    <div className="input-group">
                        <p>출간일</p>
                        <input type="text" id="pubdate" value={bookInfo.pubdate || ''} onChange={changeInput} placeholder="출간일 입력"/>
                    </div>
                    <div className="input-group">
                        <p>장르</p>
                        {genre.length > 0 ? (
                            <select value={bookInfo.genreNo} onChange={(e)=> genreChange(e)}>
                                <option value="" disabled>장르</option>
                                {genre.map((item, index) => (
                                    <option key={index} value={item.genreNo}>{item.genreName}</option>
                                ))}
                            </select>
                        ):(
                            <select>
                                <option value="" hidden>없음</option>
                            </select>
                        )}
                    </div>
                    <div className="input-group descript">
                        <p>설명</p>
                        <textarea id="description" value={bookInfo.description || ''} onChange={changeInput} placeholder="설명을 입력해주세요."></textarea>
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