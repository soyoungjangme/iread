import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import '../../css/admin/GenreManage.css';

function GenreManage(){
    const inputRef = useRef(null);

    const [inputGenre, setInputGenre] = useState(''); // 장르입력
    const [genreList, setGenreList] = useState([]); // 보기용 (기존장르 + new장르)

    useEffect(()=>{
        const getGenre = async() => {
            try{
                const resp = await axios.get('/api/adminBook/getGenre');
                console.log('기존장르 ', resp.data);
                setGenreList(resp.data);
            }catch (error){
                console.log('기존 장르 호출 중 에러 ', error);
            }
        }
        getGenre();
    },[]);

    // list에 장르추가
    const addGenre = () => {
        if(genreList.includes(inputGenre)){
            alert('이미 등록되어있습니다.');
            inputRef.current.focus(); // input 포커스
            return;
        }

        setGenreList((prev) => [
            ...prev,
            inputGenre
        ]);
        setInputGenre(''); //input 초기화
        inputRef.current.focus(); // input 포커스
    }

    //완료
    const registGenre = async() => {
        console.log("최종 장르 리스트 ", genreList);
        try{
            const resp = await axios.post('/api/adminBook/registGenre',genreList);
            alert(resp.data);
        }catch(error){
            console.log('장르등록 중 오류 ', error);
        }
    }

    //삭제
    const deleteGenre = (indexToDelete) => {
        if (window.confirm('삭제하시겠습니까?')) {
            setGenreList((prev) =>
            prev.filter((_, index) => index !== indexToDelete)
            );
        }
    };

    return(
        <div className="genre-manage-container">
            <div className="top-title">
                <p>> 장르관리</p>
            </div>
            <div className="genre-manage-box">
                <div className="input-group">
                    <input type="text" ref={inputRef} value={inputGenre} onChange={(e)=>setInputGenre(e.target.value)} placeholder="장르 입력"/>
                </div>
                <div className="btn-group">
                    <button type="button" onClick={addGenre}>추가 ></button>
                </div>
                <div className="list-group">
                    {genreList.length > 0 ? (
                        genreList.map((genre,index) => (
                            <div className="genre-list">
                                <p>{genre}</p>
                                <button type="button" onClick={()=>deleteGenre(index)}>삭제</button>
                            </div>
                        ))
                    ):(
                        <div className="genre-list" style={{justifyContent:"center"}}>
                            <p>등록된 장르가 없습니다.</p>
                        </div>
                    )}
                </div>
            </div>
            <div className="end-btn-group">
                <button type="button" className="complete-btn" onClick={registGenre}>완료</button>
                <button type="button" className="cancle-btn">취소</button>
            </div>
        </div>
    );
}

export default GenreManage;