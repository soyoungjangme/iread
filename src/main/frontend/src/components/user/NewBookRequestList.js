import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../../css/user/NewBookRequestList.css';

function NewBookRequestList(){

    const navigate = useNavigate();
    const [checkedItems, setCheckedItems] = useState({});
    const [isAllChecked, setIsAllChecked] = useState(false);
    const [requestedBooks, setRequestedBookds] = useState([]);

    /*const requestedBooks = [
        { requestNo:1, requestBookName: "살아갈 날들을 위한 괴테의 시", requestBookAuthor: "김종원", requestRegDate: "2025년 10월 12일", requestCheckStatus: "처리완료" },
        { requestNo:2, requestBookName: "살아갈 날들을 위한 괴테의 시", requestBookAuthor: "김종원", requestRegDate: "2025년 10월 12일", requestCheckStatus: "확인중" }
    ];*/

    useEffect(() => {
        getRequestedBooks();
    },[]);

    useEffect(() => {
        console.log('체크내용: ', checkedItems);
    },[checkedItems]);

    const getRequestedBooks = async() => {
        const resp = await axios.get('/api/userBook/getRequestedBooks');
        setRequestedBookds(resp.data);
    };

    //전체체크
    const handleMasterCheckboxChange = () => {
        const newCheckedState = !isAllChecked;
        const newCheckedItems = {};
        requestedBooks.forEach((book) => {
            newCheckedItems[book.requestNo] = newCheckedState;
        });

        setCheckedItems(newCheckedItems);
        setIsAllChecked(newCheckedState);
    };

    //개별체크
    const handleItemCheckboxChange = (requestNo) => {
        const newCheckedItems = { ...checkedItems, [requestNo] : !checkedItems[requestNo]};
        setCheckedItems(newCheckedItems);

        // 전체 목록에서 모든 항목이 체크되었는지 확인
        const allChecked = requestedBooks.every((book) => newCheckedItems[book.requestNo]);

        // 전체 체크 여부를 업데이트
        setIsAllChecked(allChecked);
    };

    //처리완료
    const handleRequestComplete = async() => {
        const requestNos = Object.keys(checkedItems)
                            .filter(key => checkedItems[key] === true)
                            .map(key => parseInt(key));

        console.log("확인: ", requestNos);
        await axios.patch('/api/userBook/newRequestComplete', requestNos);
        window.location.reload();
    };

    return(
        <div className="book-request-container">
            <div className="book-request-top">
                <p>도서신청</p>
            </div>

            <div className="book-request-btn-part">
                <button type="button" className="request-complete" onClick={handleRequestComplete}>처리완료</button>
                <p className="move-to-request" onClick={()=>navigate(`/user/NewBookRequestForm`)}>신청하러가기<i className="bi bi-arrow-right-short"></i></p>
            </div>

            <div className="book-request-table">
                <div className="book-request-title">
                    <input type="checkbox"
                        checked={isAllChecked}
                        onChange={handleMasterCheckboxChange}
                    />
                    <span className="request-no">no</span>
                    <span className="request-book-title">도서명</span>
                    <span className="request-author">저자</span>
                    <span className="request-date">신청일</span>
                    <span className="request-status">상태</span>
                </div>
                <div className="book-request-content-box">
                    {requestedBooks.length > 0 ? (
                        requestedBooks.map((book, index) => (
                            <div className="book-request-content">
                                <input
                                    type="checkbox"
                                    checked={!!checkedItems[book.requestNo]}
                                    onChange={() => handleItemCheckboxChange(book.requestNo)}
                                />
                                <span className="request-no">{index+1}</span>
                                <span className="request-book-title">{book.requestBookName}</span>
                                <span className="request-author">{book.requestBookAuthor}</span>
                                <span className="request-date">{book.requestRegDate}</span>
                                <span className={`request-status ${book.requestCheckStatus === "처리완료" ? "completed-request" : "checking-request"}`}>
                                    {book.requestCheckStatus}
                                </span>
                            </div>
                        ))
                    ):(
                        <div className="no-requested-book">
                            <p>존재하지 않습니다.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default NewBookRequestList;