import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import '../../css/user/BookNoteReview.css';

function BookNoteReview({bookNoteNo, bookNo, storeStatus, setStoreStatus}){

    const [images, setImages] = useState([]);

    useEffect(()=>{
        console.log('이미지: ', images);
    },[images]);

    // 파일 선택 핸들러
    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);

        if (files.length + images.length > 5) {
            alert("최대 5개의 이미지만 업로드할 수 있습니다.");
            return;
        }

        const newImages = files.map((file) => ({
            file,
            preview: URL.createObjectURL(file),
        }));

        setImages((prevImages) => [...prevImages, ...newImages]);
    };

    // 이미지 삭제 핸들러
    const handleRemoveImage = (index) => {
        setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    };

    return(
        <div className="book-review-container">
            <div className="book-review-group">
                <p>어떤 책이었나요?</p>
                <textarea placeholder="내용입력"></textarea>
            </div>
            <div className="book-img-group">
                <label htmlFor="fileInput" className="custom-file-label">이미지 업로드</label>
                <input type="file" id="fileInput" className="file-input" accept="image/*" multiple onChange={handleFileChange}/>

                <div className="book-review-img">
                    {images.map((img, index) => (
                        <div key={index} className="image-preview">
                            <img src={img.preview} alt={`preview-${index}`} />
                            <button onClick={() => handleRemoveImage(index)}>X</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default BookNoteReview;