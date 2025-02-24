import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../../css/user/PerPage.css';

function PerPage({bookNoteNoStr, storeStatus, setStoreStatus, endStatus}){
    const bookNoteNo = Number(bookNoteNoStr);

    const navigate = useNavigate();
    const [pages, setPages] = useState([]);

    useEffect(()=>{
        if(storeStatus){ //저장시 데이터호출
            getPageData();
        };
    },[storeStatus]);

    useEffect(() => {
        if (!bookNoteNo) {
            console.log("bookNoteNo가 아직 없습니다. API 호출하지 않음");
            return;
        }
        getPageData();
    }, [bookNoteNo]);  // bookNoteNo가 변경될 때마다 실행


    //기존 데이터 호출
    const getPageData = async() => {
        const resp = await axios.get('/api/userBookNote/pageData',{
            params:{bookNoteNo}
        });
        console.log(resp.data);
        const dataList = resp.data;

        setPages(dataList.length === 0 ? [{
            perPageNo: null, pageIndex: 0, startPage: "0", endPage: "", pageContent: "", bookNoteNo
        }] : dataList);
    };

    const handleChangeInput = (index, e) => {
        const { name, value } = e.target;
        let updatedPages = pages.map((page, i) =>
            i === index ? { ...page, [name]: value } : page
        );

        // endPage가 변경될 경우, 다음 항목의 startPage만 변경
        if (name === "endPage") {
            const nextIndex = index + 1;

            if (nextIndex < pages.length) { // 다음 페이지가 존재하는 경우
                updatedPages = updatedPages.map((page, i) =>
                    i === nextIndex
                    ? { ...page, startPage: value ? String(Number(value) + 1) : page.startPage } // startPage만 변경
                    : page
                );
            }
        }
        setPages(updatedPages);
        setStoreStatus(false);
    };

    // 새로운 챕터 추가 함수
    const handleAddChapter = () => {
        const lastEndPage = pages[pages.length - 1].endPage; // 마지막 endPage 값 가져오기
        const newStartPage = lastEndPage ? Number(lastEndPage) + 1 : 0; // 숫자로 변환 후 +1 (endPage가 비어있으면 0)

        const newPage = {
            perPageNo: null,
            pageIndex: pages.length,
            startPage: newStartPage.toString(), // 문자열로 변환
            endPage: "",
            pageContent: "",
            bookNoteNo
        };

        setPages([...pages, newPage]);
        setStoreStatus(false);
    };

    //항목삭제
    const removeChapter = (pIndex) => {
        if(window.confirm('삭제하시겠습니까?')){
            //filter()가 true인 것들만 남긴다.
            setPages((prev)=>prev.filter((page)=>page.pageIndex !== pIndex));
        }
        setStoreStatus(false);
    };

    //저장버튼
    const storePage = async() => {
        const resp = await axios.post('/api/userBookNote/storePage',{
            pages: pages,
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
        <div className="per-page-container">
            {pages.map((page, index)=>(
                <div className="per-page-group" key={index}>
                    <div className="page-input-group">
                        <div className="page-input">
                            <span>Page. {page.startPage}</span>
                            <span>~</span>
                            <input type="text"
                                name="endPage"
                                className={`last-page ${endStatus ? 'done-reading-page' : ''}`}
                                value={page.endPage}
                                onChange={(e)=>handleChangeInput(index, e)}
                            />
                        </div>

                        {(index === pages.length - 1 && pages.length > 1) && (!endStatus) &&
                            <i className="bi bi-dash" onClick={()=>removeChapter(page.pageIndex)}></i>
                        }
                    </div>
                    <textarea placeholder="내용입력"
                        name="pageContent"
                        className={`text-page ${endStatus ? 'done-reading' : ''}`}
                        value={page.pageContent}
                        onChange={(e)=>handleChangeInput(index, e)}
                        disabled={endStatus}
                    ></textarea>
                    {(index === pages.length - 1) && (!endStatus) &&
                        <i className="bi bi-plus-square" onClick={handleAddChapter}></i>
                    }
                </div>
            ))}
                <div className="page-btn-box">
                    <button type="button" className="list-btn" onClick={moveToList}>목록</button>
                    {!endStatus &&
                        <button type="button" className="store-btn" onClick={storePage}>저장</button>
                    }
                </div>

        </div>
    );
}

export default PerPage;