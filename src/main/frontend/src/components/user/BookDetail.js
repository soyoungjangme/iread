import {useState, useEffect, useCallback} from 'react';
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
    const [thisLike, setThisLike] = useState(false); //관심도서유무

    const [images, setImages] = useState([]); //이미지
    const [review, setReview] = useState({ //리뷰작성내용
        bookNo,
        reviewRegDate:"",
        reviewShort: "",
        reviewText: ""
    });
    const maxLength = 20; //한줄평 최대 글자수


    //발행일 날짜 포맷
    /*const formattedPubDate = (pubdate) => {
        if(!pubdate) return "";
        const [year, month, day] = pubdate.split(". ").map(Number);
        return `${year}년 ${month}월 ${day}일`;
    };*/

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

    //목록버튼
    const moveToList = () => {
        navigate("/user/UserBookList");
    };


    /*리뷰작성이벤트*/
    //리뷰값 저장
    const handleReviewChange = useCallback((e) => {
        const { id, value } = e.target;
        setReview((prev) => ({
            ...prev,
            [id]: value
        }));
    }, []);

    //이미지등록
    const handleFileChange = async(e) => {
        const files = Array.from(e.target.files);

        // 현재 등록된 이미지 개수
        const currentImageCount = images.length;

        // 추가하려는 이미지 개수
        if (currentImageCount + files.length > 5) {
            alert("최대 5개까지만 등록할 수 있습니다.");
            return;
        };

        const uploadPromises = files.map(async (file) => {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", "czw3v2c2");
            formData.append("cloud_name", "dpyihadmu");

            try {
                const response = await axios.post(
                    "https://api.cloudinary.com/v1_1/dpyihadmu/image/upload",
                    formData
                );
                return {reviewImgURL: response.data.secure_url}; //객체반환
            } catch (error) {
                console.error("업로드 실패:", error);
                return null;
            }
        });

        //promise.all() : 배열 속 모든 promise가 완료될 때까지 기다린 후, 배열결과 반환
        // filter(Boolean) : false값 제거
        const uploadedImages = (await Promise.all(uploadPromises)).filter(Boolean);
        setImages((prevImages) => [...prevImages, ...uploadedImages]);
    }

    // 이미지 삭제 핸들러
    const handleRemoveImage = (index) => {
        setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    };

    //리뷰등록
    const registReview = async () => {
        const today = new Date();
        const formattedDate = `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일`;

        const updatedReview = {
            ...review,
            reviewRegDate: formattedDate
        };

        setReview(updatedReview);

        try {
            const resp = await axios.post('/api/userBookNote/storeReview', {
                review: updatedReview,
                images: images
            });

            alert(resp.data);

            // 리뷰 목록 새로고침
            getReview();
            // 상태 초기화
            setImages([]); // 이미지 리스트 초기화
            setReview({
                bookNo, // bookNo는 유지
                reviewRegDate: "",
                reviewShort: "",
                reviewText: ""
            });

            // 파일 입력 필드 초기화
            document.getElementById("reviewImg").value = "";
        } catch (error) {
            console.error("리뷰 등록 실패:", error);
            alert("리뷰 등록에 실패했습니다.");
        }
    };

    //해당도서 관심도서 유무
    const getThisBookLike = async() => {
        const resp = await axios.get('/api/userBook/getThisBookLike',{ params: {bookNo} });
        setThisLike(resp.data > 0);
    };

    useEffect(()=>{
        getThisBookLike();
    },[bookNo]);

    //도서관심클릭
    const handleBookLike = async(bookNo) => {
        await axios.post('/api/userBook/bookLike',{bookNo});

        getThisBookLike();
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
                        <div className="like-btn btns" onClick={() => handleBookLike(book.bookNo)}>
                            {(thisLike) ? (
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
            </div>
            <div className="book-publish-info">
                <div className="publish-group">
                    <p>출판사</p>
                    <p>{book.publisher}</p>
                </div>
                <div className="publish-group">
                    <p>발행일</p>
                    <p>{book.pubdate}</p>
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
                <>
                    <div className="book-detail-descript">
                        <p>{book.description}</p>
                    </div>
                    <button type="button" className="book-detail-btn" onClick={moveToList}>목록</button>
                </>
            }

            {/*리뷰 및 한줄평*/}
            {activeMenu === 'review' &&
                <div className="book-detail-content">
                    {/*리뷰작성*/}
                    <div className="review-write-box">
                        <div className="review-write">

                            <div className="book-img-group">
                                <label htmlFor="reviewImg" className="custom-file-label">이미지 업로드</label>
                                <input type="file"
                                    id="reviewImg"
                                    className="file-input"
                                    accept="image/*"
                                    multiple
                                    onChange={handleFileChange}
                                />

                                <div className="book-review-img">
                                    {images.map((img, index) => (
                                        <div key={index} className="image-preview">
                                            <img src={img.reviewImgURL || "/null-img.png"} alt={`preview-${index}`} />
                                            <button onClick={() => handleRemoveImage(index)}>X</button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="simple-review-group">
                                <input placeholder="한줄평"
                                    id="reviewShort"
                                    className="simple-review"
                                    maxLength={maxLength}
                                    onChange={handleReviewChange}
                                    value={review.reviewShort}
                                />
                                <span>{review.reviewShort?.length || 0}/{maxLength}</span>
                                <button type="button" className="review-regist-btn" onClick={registReview}>등록</button>
                            </div>
                            <textarea placeholder="내용입력"
                                id="reviewText"
                                onChange={handleReviewChange}
                                value={review.reviewText}
                            ></textarea>
                        </div>
                    </div>

                    {/*리뷰목록*/}
                    {reviews.length > 0 ? (
                        reviews.map((review, index)=>(
                            <div className="detail-review" key={index}>
                                <div className="review-top-group">
                                    <p className="review-one">{review.reviewShort}</p>
                                    <p className="review-report">신고</p>
                                </div>
                                <p className="review-real">{review.reviewText}</p>
                                <div className="review-imgs">
                                    {review.reviewImgDTOS &&
                                        review.reviewImgDTOS.map((reviewImg, index)=>
                                            reviewImg && reviewImg.reviewImgURL ? (
                                                <img src={reviewImg.reviewImgURL} key={index} />
                                            ) : null
                                        )
                                    }
                                </div>
                                <div className="review-bottom-group">
                                    <p className="review-writer">{review.userNick}</p>
                                    <p className="review-reg-date">{review.reviewRegDate}</p>
                                </div>
                            </div>
                        ))
                    ):(
                        <div className="none-review">
                            <p>리뷰가 존재하지 않습니다.</p>
                        </div>
                    )}
                    <button type="button" className="book-detail-btn" onClick={moveToList}>목록</button>
                </div>
            }
        </div>
    );
}

export default BookDetail;