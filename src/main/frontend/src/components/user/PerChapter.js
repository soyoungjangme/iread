import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import '../../css/user/PerChapter.css';
import 'bootstrap-icons/font/bootstrap-icons.css';


function PerChapter({bookNoteNoStr, storeStatus, setStoreStatus, endStatus}){
    const bookNoteNo = Number(bookNoteNoStr);
    const navigate =useNavigate();

    const [chapters, setChapters] = useState([]);

    useEffect(()=>{
        if(storeStatus){ //저장시 데이터호출
            getChapterData();
        };
    },[storeStatus]);

    useEffect(() => {
        if (!bookNoteNo) {
            console.log("bookNoteNo가 아직 없습니다. API 호출하지 않음");
            return;
        }
        getChapterData();
    }, [bookNoteNo]);

    //기존 데이터 호출
    const getChapterData = async() => {
        const resp = await axios.get('/api/userBookNote/chapterData',{
          params:{bookNoteNo}
        });
        console.log(resp.data);
        const dataList = resp.data;

        setChapters(dataList.length === 0 ? [{
            perChapterNo: null, chapterNo: 1, chapterTitle: "", chapterContent: "", bookNoteNo
        }] : dataList);
    };

    const handleChangeInput = (index, e) => {
        const { name, value } = e.target;
        const updatedChapters = chapters.map((chapter, i)=>
                i === index ? {
                    ...chapter,
                    [name]: value
                } : chapter
        );
        setChapters(updatedChapters);
        setStoreStatus(false);
    };

    // 새로운 챕터 추가 함수
    const handleAddChapter = () => {
        const newChapter = {
            chapterNo: chapters.length + 1,
            chapterTitle: "",
            chapterContent: "",
            bookNoteNo
        };
        setChapters([...chapters, newChapter]);
        setStoreStatus(false);
    };

    //챕터삭제
    const removeChapter = (chNo) => {
        if(window.confirm('삭제하시겠습니까?')){
            //filter()가 true인 것들만 남긴다.
            setChapters((prev)=>prev.filter((chapter)=>chapter.chapterNo !== chNo));
        }
        setStoreStatus(false);
    };

    //저장버튼
    const storeChapter = async() => {
        const resp = await axios.post('/api/userBookNote/storeChapter',{
            chapters: chapters,
            bookNoteNo: bookNoteNo
        });
        alert(resp.data);
        setStoreStatus(true);
    };

    //목록버튼
    const moveToList = () => {
        if (storeStatus) {
            navigate("/user/BookNoteList");
        } else {
            if (window.confirm("저장되지 않았습니다. 목록으로 이동하시겠습니까?")) {
                navigate("/user/BookNoteList");
            }
        }
    };

    return(
        <div className="per-chapter-container">

            {chapters.map((chapter, index)=>(
                <div className="per-chapter-group" key={index}>
                    <p>Chapter{chapter.chapterNo}</p>
                    <div className="ch-input-group">
                        <input type="text"
                            placeholder="소제목"
                            name="chapterTitle"
                            value={chapter.chapterTitle}
                            onChange={(e)=>handleChangeInput(index, e)}
                            disabled={endStatus}
                        />
                        {(index === chapters.length - 1 && chapters.length > 1) && (!endStatus) &&
                            <i className="bi bi-dash" onClick={()=>removeChapter(chapter.chapterNo)}></i>
                        }
                    </div>
                    <textarea placeholder="내용입력"
                        name="chapterContent"
                        className={`text-chapter ${endStatus ? 'done-reading' : ''}`}
                        value={chapter.chapterContent}
                        onChange={(e)=>handleChangeInput(index, e)}
                        disabled={endStatus}
                    ></textarea>
                    {(index === chapters.length - 1) && (!endStatus) &&
                        <i className="bi bi-plus-square" onClick={handleAddChapter}></i>
                    }
                </div>
            ))}
                <div className="page-btn-box">
                    <button type="button" className="list-btn" onClick={moveToList}>목록</button>
                    {!endStatus &&
                        <button type="button" className="store-btn" onClick={storeChapter}>저장</button>
                    }
                </div>
        </div>
    )
}

export default PerChapter;