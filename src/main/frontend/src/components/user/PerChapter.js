import {useState, useEffect} from 'react';
import axios from 'axios';
import '../../css/user/PerChapter.css';
import 'bootstrap-icons/font/bootstrap-icons.css';


function PerChapter({bookNoteNo, bookNo}){

    const [chapters, setChapters] = useState([]);

    useEffect(() => {
        if(bookNo && bookNoteNo){
            getChapterData();
        } else {
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
    };

    //저장버튼
    const storeChapter = async() => {
        const resp = await axios.post('/api/userBook/storeChapter',chapters);
        alert(resp.data);
        window.location.reload(); //새로고침
    };

    useEffect(()=>{
        console.log("chapters ", chapters);
    },[chapters]);

    return(
        <div className="per-chapter-container">

            {chapters.map((chapter, index)=>(
                <div className="per-chapter-group" key={index}>
                    <p>Chapter{chapter.chapterNo}</p>
                    <input type="text"
                        placeholder="소제목"
                        name="chapterTitle"
                        value={chapter.chapterTitle}
                        onChange={(e)=>handleChangeInput(index, e)}
                    />
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
            <div className="store-btn">
                <button type="button" onClick={storeChapter}>저장</button>
            </div>

        </div>
    )
}

export default PerChapter;