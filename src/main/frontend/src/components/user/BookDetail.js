import {useState, useEffect} from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../css/user/BookDetail.css';

function BookDetail(){

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const bookNo = searchParams.get("no");

    const [activeMenu, setActiveMenu] = useState('descript'); //메뉴상태
    const [book, setBook] = useState({}); //도서정보
    const [reviews, setReviews] = useState([]); //리뷰정보

    //발행일 날짜 포맷
    const formattedDate = (pubdate) => {
        if(!pubdate) return "";
        const [year, month, day] = pubdate.split(". ").map(Number);
        return `${year}년 ${month}월 ${day}일`;
    };

    useEffect(()=>{
        getBookInfo();
        getReview();
    },[]);

    //도서정보 호출
    const getBookInfo = async() => {
        const resp = await axios.get('/api/userBook/getABook',{
            params: {bookNo}
        });
        setBook(resp.data);
        console.log('책정보: ', resp.data);
    };

    //리뷰정보 호출
    const getReview = async() => {
        const resp = await axios.get('/api/userBook/getReviews',{
            params: {bookNo}
        });
        setReviews(resp.data);
        console.log('리뷰정보: ', resp.data);
    };

    //독서할래
    const handleBookNote = (bookNo, title) => {
        navigate('/user/BookNote', { state : {bookNo, title}});
    };

    //메뉴클릭
    const handleMenuChange = (menu) => {
        setActiveMenu(menu);
    };

    return(
        <div className="book-detail-container">
            <div className="book-info-box">
                <div className="book-img-box">
                    <img src={book.image || "/null-img.png"} />
                </div>
                <div className="book-text-box">
                    <div>
                        <div className="book-detail-title">
                            <p>{book.title}</p>
                        </div>
                        <div className="book-from">
                            <p>{book.author}</p>
                        </div>
                    </div>
                    <div className="book-detail-btns">
                        <div className="like-btn btns">
                            <button type="button" className="like-text">관심있어?</button>
                            <button type="button" className="like-icon"><i className="bi bi-suit-heart-fill"></i></button>
                        </div>
                        <div className="reading-btn btns" onClick={() => handleBookNote(book.bookNo, book.title)}>
                            <button type="button" className="reading-text">독서할래?</button>
                            <button type="button" className="reading-icon"><i className="bi bi-pencil-fill"></i></button>
                        </div>
                        <button type="button" className="write-review">리뷰쓸래</button>
                    </div>
                </div>
            </div>
            <div className="book-publish-info">
                <div className="publish-group">
                    <p>출판사</p>
                    <p>{book.publisher}</p>
                </div>
                <div className="publish-group">
                    <p>발행일</p>
                    <p>{formattedDate(book?.pubdate)}</p>
                </div>
                <div className="publish-group">
                    <p>ISBN 13</p>
                    <p>{book.isbn}</p>
                </div>
            </div>
            <div className="book-detail-menu">
                <div className={`detail-menu-group ${activeMenu === 'descript' ? 'menu-active' : ''}`}
                    onClick={() => handleMenuChange('descript')}
                >
                    <p>책 설명</p>
                </div>
                <div className={`detail-menu-group ${activeMenu === 'review' ? 'menu-active' : ''}`}
                    onClick={() => handleMenuChange('review')}
                >
                    <p>리뷰/한줄평</p>
                </div>
            </div>

            {/*책설명*/}
            {activeMenu === 'descript' &&
                <div className="book-detail-content">
                    <p>{book.description}</p>
                </div>
            }

            {/*리뷰 및 한줄평*/}
            {activeMenu === 'review' &&
                <div className="book-detail-content">
                    <div className="detail-review">
                        <p className="review-one">한줄평</p>
                        <p className="review-real">부처의 가르침을 현대적인 언어로 풀어낸 책입니다. 깊고 철학적인 내용을 쉽게 이해할 수 있도록 설명하며, 삶에 대한 통찰과 깨달음을 제공합니다. 인간의 고통, 행복, 인생의 의미 등을 다룬 부처의 가르침은 독자들에게 마음의 평화와 지혜를 선사합니다. 불교에 대한 이해를 넓히고 싶은 독자에게 적합한 책입니다.</p>
                        <div className="review-imgs">
                            <img src="/null-img.png" />
                            <img src="/null-img.png" />
                            <img src="/null-img.png" />
                        </div>
                        <div className="review-bottom-group">
                            <p className="review-writer">작성자 닉네임</p>
                            <p className="review-reg-date">2024. 1. 13</p>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}

export default BookDetail;