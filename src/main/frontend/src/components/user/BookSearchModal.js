import React,{useState} from 'react';
import axios from 'axios';
import '../../css/user/BookSearchModal.css';

function BookSearchModal({onClose}){

    const [keyword, setKeyword] = useState('');
    const [searchResult, setSearchResult] = useState({}); //검색결과

    //검색
    const searchKeyword = async() => {
        console.log('검색어: ', keyword);
        if(!keyword.trim()){
            alert('검색어를 입력해주세요.');
            return;
        }

        const resp = await axios.get('/api/userBook/searchResult',{
            params: {keyword}
        });
        setSearchResult(resp.data);
        console.log(resp.data);
    }

    const changeKeyword = (e) => {
        setKeyword(e.target.value);
    }

    return(
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="btn-close">
                    <button onClick={onClose}>x</button>
                </div>
                <div className="modal-input">
                    <input type="text" value={keyword} onChange={(e)=>changeKeyword(e)} placeholder="도서명, 저자" />
                    <button onClick={searchKeyword}>검색</button>
                </div>
                <div className="modal-result-container">
                    <div className="list-content-group">
                        <div className="list-content">
                            <img src="/img/FB_IMG_1430747203165.jpg"/>
                            <div className="content-info">
                                <p>제목임제목임제목임제목임제목임제목임제목임제목임제목임제목임ddddddddddd</p>
                                <p>저자 | 저자임</p>
                            </div>
                            <input type="radio" />
                        </div>

                        <div className="before-search">
                            <p className="search-text">검색결과</p>
                        </div>
                    </div>
                    <div className="select-btn">
                        <button>선택</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BookSearchModal;