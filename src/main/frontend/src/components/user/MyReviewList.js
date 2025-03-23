import React, {useState, useEffect} from 'react';
import ReactPaginate from 'react-paginate';
import axios from 'axios';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../../css/user/MyReviewList.css';

function MyReviewList(){

    const [myReviews, setMyReviews] = useState([]);
    const [reviewInput, setReviewInput] = useState({}); // 입력값
    const [images, setImages] = useState([]); //리뷰이미지
    const [expandedReviews, setExpandedReviews] = useState({});

    //pagination
    const [pageCount, setPageCount] = useState(0); //전체 페이지수
    const [currentPage, setCurrentPage] = useState(0); //현재 페이지번호

    const reviewCnt = 10; //페이지당 도서 개수

    useEffect(() => {
        scrollTop();
        getMyReviews();
    },[currentPage]);

    const scrollTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handlePageClick = (e) => {
        setCurrentPage(e.selected);
    }
    //--pagination

    useEffect(()=>{
        getMyReviews();
    },[]);

    const getMyReviews = async() => {
        const resp = await axios.get('/api/userBook/getMyReviews',{
            params: {
                page : currentPage+1,
                pageSize : reviewCnt
            }
        });
        console.log('나의리뷰: ', resp.data);
        setMyReviews(resp.data.myReviews.map(review => ({
            ...review,
            isEditing : false
        })));
        setPageCount(Math.ceil(resp.data.totalCnt/reviewCnt));
    };

    //수정완료
    const handleModifyMr = async(reviewNo) => {
        const updatedReview = myReviews.find(review => review.reviewNo === reviewNo);
        if (!updatedReview) return;

        try{
            const resp = await axios.post('/api/userBookNote/storeReview',{
                review: updatedReview,
                images: updatedReview.reviewImgDTOS
            });
            alert(resp.data);
            setMyReviews(prevReviews =>
                prevReviews.map(review =>
                    review.reviewNo === reviewNo ? { ...review, isEditing: false } : review
                )
            );
        }catch (error){
            console.error('my review 수정 error ', error);
        }
    };

    // 수정 모드로 전환
    const handleEditClick = (reviewNo) => {
        setMyReviews(prevReviews =>
            prevReviews.map(review =>
                review.reviewNo === reviewNo ? { ...review, isEditing: true } : review
            )
        );
    };

    //입력값 변경
    const handleChangeMr = (e, reviewNo) => {
        const { id, value } = e.target;

        setMyReviews(prevReviews =>
            prevReviews.map(review =>
                review.reviewNo === reviewNo
                    ? { ...review, [id]: value }
                    : review
            )
        );
    };


    // 이미지 삭제 핸들러
    const handleRemoveImage = (reviewNo, index) => {
        setMyReviews(prevReviews =>
            prevReviews.map(review =>
                review.reviewNo === reviewNo
                    ? { ...review, reviewImgDTOS: review.reviewImgDTOS.filter((_, i) => i !== index) }
                    : review
            )
        );
    };

    //나의리뷰삭제
    const handleDelMr = async(reviewNo) => {
        if(!window.confirm('삭제하시겠습니까?')){
            return;
        };
        try{
            const resp = await axios.delete(`/api/userBook/delMyReview/${reviewNo}`);
            alert(resp.data);
            getMyReviews();
        }catch (error){
            console.log('나의 리뷰 삭제 중 오류 ', error);
            alert('리뷰 삭제 중 오류 발생');
        }
    };

    const handleExpand = (reviewNo) => {
        setExpandedReviews(prevState => ({
            ...prevState,
            [reviewNo]: !prevState[reviewNo],  // 해당 reviewNo에 대한 expanded 상태를 토글
        }));
    };

    return(
        <div className="my-review-container">
            <div className="my-review-top">
                <p>나의 리뷰</p>
            </div>
            <div className="my-review-list">
                {myReviews.length > 0 ? (
                    myReviews.map((myReview, index) => (
                        <div className="my-review-box" key={myReview.reviewNo}>
                            <div className="mr-top-group">
                                <p>작성일 | {myReview.reviewRegDate}</p>
                                <div className="mr-btn-group">
                                    {!myReview.isEditing ? (
                                        <p className="mr-mod-btn" onClick={() => handleEditClick(myReview.reviewNo)}>수정</p>
                                    ):(
                                        <p className="mr-mod-btn" onClick={()=>handleModifyMr(myReview.reviewNo)}>완료</p>
                                    )}
                                    <p className="mr-del-btn" onClick={()=>handleDelMr(myReview.reviewNo)}>삭제</p>
                                </div>
                            </div>
                            <p>{myReview.title}</p>
                            <div className="mr-content-group">
                                <input className={`mr-short ${myReview.isEditing ? '' : 'disabled'}`}
                                    id="reviewShort"
                                    value={myReview.reviewShort}
                                    onChange={(e) => handleChangeMr(e, myReview.reviewNo)}
                                    disabled={!myReview.isEditing}
                                />

                                {(!myReview.isEditing ? ( //읽기 상태
                                    <div className="mr-text-group">
                                        <p className={`mr-text ${expandedReviews[myReview.reviewNo] ? "expanded" : ""}`}>
                                            {myReview.reviewText}
                                        </p>
                                        <i className={`bi ${expandedReviews[myReview.reviewNo] ? "bi-chevron-up" : "bi-chevron-down"} mr-toggle-icon`}
                                            onClick={() => handleExpand(myReview.reviewNo)}
                                        ></i>
                                    </div>
                                ):( // 수정상태
                                    <div className="mr-text-group">
                                        <textarea className="mr-text-edit"
                                            id="reviewText"
                                            value={myReview.reviewText}
                                            onChange={(e) => handleChangeMr(e, myReview.reviewNo)}
                                        ></textarea>
                                    </div>
                                ))}
                                <div className="mr-img-box">
                                    {myReview.reviewImgDTOS && myReview.reviewImgDTOS.length > 0 && (
                                        myReview.reviewImgDTOS.map((reviewImg, i) => (
                                            reviewImg.reviewImgURL ? (
                                                <div className="mr-img" key={reviewImg.reviewImgNo}>
                                                    <img src={reviewImg.reviewImgURL} alt="리뷰 이미지" />
                                                    {myReview.isEditing &&
                                                        <button onClick={() => handleRemoveImage(myReview.reviewNo, i)}>X</button>
                                                    }
                                                </div>
                                            ) : null
                                        ))
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                ):(
                    <div className="none-my-review">
                        <p>작성하신 리뷰가 없습니다.</p>
                    </div>
                )}
            </div>

            {/* React Paginate 컴포넌트 */}
            <ReactPaginate
                previousLabel={"이전"} // 이전 버튼 텍스트
                nextLabel={"다음"} // 다음 버튼 텍스트
                breakLabel={"..."} // 페이지 사이 구분자
                pageCount={pageCount} // 전체 페이지 수
                marginPagesDisplayed={1} // 처음과 끝에 보여질 페이지 수
                pageRangeDisplayed={5} // 현재 페이지 주변에 보여질 페이지 수
                onPageChange={handlePageClick} // 페이지 클릭 이벤트
                containerClassName={"mr-pagination"} // 페이지네이션 컨테이너 클래스
                activeClassName={"active"} // 활성화된 페이지 클래스
                forcePage={pageCount > 0 ? currentPage : undefined} // 현재 페이지를 강제로 지정
            />
        </div>
    );
}

export default MyReviewList;