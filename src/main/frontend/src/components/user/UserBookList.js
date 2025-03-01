import React, {useState, useEffect, useRef, useCallback} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../css/user/UserBookList.css';

function UserBookList(){
    const navigate = useNavigate();

    const [myLikes, setMyLikes] = useState({}); //관심도서목록
    const [books, setBooks] = useState([]); //도서목록
    const [page, setPage] = useState(1); //현재페이지
    const [loading, setLoading] = useState(false); //로딩상태
    const [hasMore, setHasMore] = useState(true); //추가데이터여부
    const observerRef = useRef(null); //감지할 요소 ref

    // 도서 목록 호출
    const getAllBook = async () => {
        if (!hasMore || loading) return;
        setLoading(true);

        try {
            const resp = await axios.get('/api/userBook/getAllBook', {
                params: { page, limit: 15 }
            });
            const data = resp.data;

            setBooks((prev) => [...prev, ...data]);
            setHasMore(data.length === 15);
            console.log(data);
        } catch (error) {
            console.error('도서 호출 중 에러 발생', error);
        } finally {
            setLoading(false);
        }
    };

    // 페이지 변경 시 도서 목록 호출
    useEffect(() => {
        getAllBook();
    }, [page]);

    //유저의 관심도서 호출
    const getMyLike = async() => {
        const resp = await axios.get('/api/userBook/getMyBookLikes');
        console.log('관심도서목록: ', resp.data);
        setMyLikes(resp.data);
    };

    useEffect(()=>{
        getMyLike();
    },[]);

    // Intersection Observer 설정
    const observerCallback = useCallback((entries) => {
        if (entries[0].isIntersecting) {
            setPage((prevPage) => (!loading && hasMore ? prevPage + 1 : prevPage));
        }
    }, [loading, hasMore]);

    useEffect(() => {
        const observer = new IntersectionObserver(observerCallback, { threshold: 0.1 });

        if (observerRef.current) observer.observe(observerRef.current);

        return () => {
            if (observerRef.current) observer.unobserve(observerRef.current);
        };
    }, [observerCallback]);

    //독서할래
    const handleBookNote = (bookNo, title) => {
        navigate('/user/BookNote', { state : {bookNo, title}});
    };

    //도서상세보기(더블클릭)
    const handleClickBook = (bookNo) => {
        navigate(`/user/BookDetail?no=${bookNo}`);
    };

    //도서관심
    const handleBookLike = async(bookNo) => {
        await axios.post('/api/userBook/bookLike',{bookNo});

        getMyLike();
    };

    return(
        <div className="registed-book-list-container">
            <div className="book-list-top">
                <p>전체보기</p>
            </div>
            {books.length > 0 ? (
                    books.map((book, index)=>(
                    <div className="user-book-list-container">
                        <div className="list-no">
                            <p>{index+1}</p>
                        </div>
                        <div className="book-img" onDoubleClick={() => handleClickBook(book.bookNo)}>
                            <img src={book.image || "/null-img.png"} />
                        </div>
                        <div className="book-info" onDoubleClick={() => handleClickBook(book.bookNo)}>
                            <div>
                                <div className="info-title">
                                    <p>{book.title}</p>
                                </div>
                                <div className="info-from">
                                    <p>{book.genreName} | {book.author} | {book.publisher} | {book.pubdate}</p>
                                </div>
                                <div className="info-review">
                                    <p>리뷰 {book.reviewCnt}건</p>
                                </div>
                            </div>
                        </div>
                        <div className="book-btns">
                            <div className="like-btn btns" onClick={() => handleBookLike(book.bookNo)}>
                                {myLikes.includes(book.bookNo) ? (
                                    <button type="button" className="like-book"><i className="bi bi-suit-heart-fill"></i></button>
                                ):(
                                    <>
                                        <button type="button" className="like-text">관심있어?</button>
                                        <button type="button" className="like-icon"><i className="bi bi-suit-heart-fill"></i></button>
                                    </>
                                )}
                            </div>
                            <div className="reading-btn btns" onClick={() => handleBookNote(book.bookNo, book.title)}>
                                <button type="button" className="reading-text">독서할래?</button>
                                <button type="button" className="reading-icon"><i className="bi bi-pencil-fill"></i></button>
                            </div>
                            {/*<button type="button" className="write-review">리뷰쓸래</button>*/}
                        </div>
                    </div>
                ))
            ):(
                <div className="book-none-list" >
                    <p>도서가 존재하지 않습니다.</p>
                </div>
            )}

            {/*무한스크롤 감지영역*/}
            <div ref={observerRef} style={{ height: "20px" }} />
            {/*로딩메시지*/}
            {/*{ loading && <p className="loading-text">Loading...</p> }*/}
        </div>
    );
}

export default UserBookList;