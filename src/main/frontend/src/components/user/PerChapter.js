import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import '../../css/user/PerChapter.css';
import 'bootstrap-icons/font/bootstrap-icons.css';


function PerChapter({bookNoteNo, bookNo}){

    const navigate =useNavigate();

    const [chapters, setChapters] = useState([]);
    const [storeStatus, setStoreStatus] = useState(true); //저장상태

    useEffect(() => {
        if(bookNo && bookNoteNo){
            getChapterData();
        } else {
            setStoreStatus(false);
            setChapters([
                { perChapterNo: null, chapterNo: 1, chapterTitle: "", chapterContent: "", bookNoteNo }
            ]);
        }
    }, [bookNoteNo, bookNo]);

    //기존 데이터 호출
    const getChapterData = async() => {
        const resp = await axios.get('/api/userBook/chapterData',{
          params:{bookNoteNo}
        });
        console.log(resp.data);
        const dataList = resp.data;
        setChapters(dataList.map((data)=>({
            perChapterNo: data.perChapterNo,
            chapterNo: data.chapterNo,
            chapterTitle: data.chapterTitle,
            chapterContent: data.chapterContent,
            bookNoteNo: data.bookNoteNo
        })));
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
        const resp = await axios.post('/api/userBook/storeChapter',chapters);
        alert(resp.data);
        navigate("/user/BookNoteList"); //목록이동
    };

    //목록버튼
    const moveToList = () => {
        if (storeStatus) {
            navigate("/user/BookNoteList");
        } else {
            if (window.confirm("저장되지 않았습니다. 페이지를 이동하시겠습니까?")) {
                navigate("/user/BookNoteList");
            }
        }
    };

    useEffect(()=>{
        console.log('chapters: ', chapters);
    },[chapters]);

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
                        />
                        {(index === chapters.length - 1 && chapters.length > 1) &&
                            <i className="bi bi-dash" onClick={()=>removeChapter(chapter.chapterNo)}></i>
                        }
                    </div>
                    <textarea placeholder="내용입력"
                        name="chapterContent"
                        value={chapter.chapterContent}
                        onChange={(e)=>handleChangeInput(index, e)}
                    ></textarea>
                    {(index === chapters.length - 1) &&
                        <i className="bi bi-plus-square" onClick={handleAddChapter}></i>
                    }
                </div>
            ))}
            <div className="last-btn">
                <button type="button" className="list-btn" onClick={moveToList}>목록</button>
                <button type="button" className="store-btn" onClick={storeChapter}>저장</button>
            </div>

        </div>
    )
}

export default PerChapter;