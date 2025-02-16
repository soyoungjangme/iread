import {useState, useEffect, useRef, useCallback } from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import '../../css/user/BookNoteReview.css';

function BookNoteReview({bookNoteNo, bookNo, storeStatus, setStoreStatus}){

    const imgRef = useRef();

    const [images, setImages] = useState([]);
    const [review, setReview] = useState({
        bookNo,
        reviewRegDate:"",
        reviewShort: "",
        reviewText: "",
        reviewOpenStatus: "public"
    });
    const maxLength = 20; //한줄평 최대 글자수

    //날짜 포맷
    const today = new Date();
    const formattedDate = `${today.getFullYear()}. ${today.getMonth() + 1}. ${today.getDate()}`;

    useEffect(()=>{
        console.log('리뷰: ', review);
        console.log('images: ', images);
    },[review, images]);

    useEffect(() => {
        setReview((prev)=>({
            ...prev,
            reviewRegDate: formattedDate
        }));
    },[]);

    //입력값 저장
    const handleReviewChange = useCallback((e) => {
        const { id, value } = e.target;
        setReview((prev) => ({
            ...prev,
            [id]: value
        }));

        setStoreStatus(false); // setReview가 완료된 후에 호출
    }, []);

    //이미지등록
    const handleFileChange = async(e) => {
        setStoreStatus(false);

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
        setStoreStatus(false);
        setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    };

    //공개여부
    const handleVisibilityChange = (e) => {
        setStoreStatus(false);
        setReview((prevReview) => ({
            ...prevReview,
            reviewOpenStatus: e.target.value
        }));
    };

    //저장하기
    const storeReview = async() => {
        const resp = await axios.post('/api/userBook/storeReview',{
            review: review,
            images: images
        });
        alert(resp.data);
        window.location.reload();
    };

    return(
        <div className="book-review-container">
            <div className="book-review-group">
                <p>어떤 책이었나요?</p>
                <div className="simple-input-group">
                    <input placeholder="한줄평"
                        id="reviewShort"
                        className="simple-review"
                        maxLength={maxLength}
                        onChange={handleReviewChange}
                        value={review.reviewShort}
                    />
                    <span>{review.reviewShort?.length || 0}/{maxLength}</span>
                </div>
                <textarea
                    placeholder="내용입력"
                    id="reviewText"
                    className="text-review"
                    onChange={handleReviewChange}
                    value={review.reviewText}
                ></textarea>
            </div>
            <div className="book-img-group">
                <label htmlFor="reviewImg" className="custom-file-label">이미지 업로드</label>
                <input type="file"
                    id="reviewImg"
                    className="file-input"
                    accept="image/*"
                    multiple
                    onChange={handleFileChange}
                    ref={imgRef}
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
            <div className="store-review">
                <div className="visibility-options">
                    <label>
                        <input
                            type="radio"
                            value="public"
                            checked={review.reviewOpenStatus === "public"}
                            onChange={handleVisibilityChange}
                        />
                        공개
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="private"
                            checked={review.reviewOpenStatus === "private"}
                            onChange={handleVisibilityChange}
                        />
                        비공개
                    </label>
                </div>
                <button className="review-store-btn" onClick={storeReview}>저장</button>
            </div>
        </div>
    );
}

export default BookNoteReview;