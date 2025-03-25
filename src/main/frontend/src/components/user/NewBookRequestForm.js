import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../../css/user/NewBookRequestForm.css';

function NewBookRequestForm(){

    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');

    //신청하기
    const handleRegistBook = async() => {
        //날짜 포맷
        const today = new Date();
        const formattedDate = `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일`;

        await axios.post('/api/userBook/registedNewBook',{
            requestBookName: title,
            requestBookAuthor: author,
            requestRegDate: formattedDate
        });
        navigate('/user/NewBookRequestList');
    };

    return(
        <div className="book-request-form-container">
            <div className="request-form-name">
                <p>신청 도서 정보 입력</p>
            </div>
            <div className="request-form-input-group">
                <div className="request-text">
                    <p>저자</p>
                    <input type="text" placeholder="저자명"
                        value={author}
                        onChange={(e)=>setAuthor(e.target.value)}
                    />
                </div>
                <div className="request-text">
                    <p>제목</p>
                    <input type="text" placeholder="도서명"
                        value={title}
                        onChange={(e)=>setTitle(e.target.value)}
                    />
                </div>
            </div>
            <div className="request-form-btn-group">
                <p className="book-regist-btn" onClick={handleRegistBook}>신청하기</p>
                <p className="move-to-list" onClick={()=>navigate(`/user/NewBookRequestList`)}>목록</p>
            </div>
        </div>
    );
}

export default NewBookRequestForm;