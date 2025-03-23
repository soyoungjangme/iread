import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../../css/admin/ComplaintManage.css';

function ComplaintManage(){

    const navigate = useNavigate();
    const [complaints, setComplaints] = useState([]);
    const [keyword, setKeyword] = useState('');
    const [expandedComplaints, setExpandedComplaints] = useState({});

    useEffect(()=>{
        getComplaints();
    },[]);

    const getComplaints = async() => {
        const resp = await axios.get('/api/adminManage/getComplaintReview');
        console.log('신고목록: ', resp.data);
        setComplaints(resp.data);
    };

    //리뷰공개상태 필터
    const handleStateFilter = async(state) => {
        setKeyword('');

        const resp = await axios.get('/api/adminManage/getComplaintReview', {
            params: { state }
        });
        setComplaints(resp.data);
    };

    //리뷰공개상태변경
    const handleChangeOpenStatus = async(reviewNo, reviewOpenYN) => {
        setKeyword('');
        await axios.patch('/api/adminManage/changeReviewStatus',{
            reviewNo, reviewOpenYN
        });
        getComplaints();
    };

    const changeKeyword = (e) => {
        setKeyword(e.target.value);
    };

    const handleKeyDown = async(e) => {
        if(e.key !== 'Enter') return;

        const resp = await axios.get('/api/adminManage/getComplaintReview',{
            params: { keyword }
        });
        setComplaints(resp.data);
    };

    //리뷰내용 토글
    const handleExpand = (reviewNo) => {
        setExpandedComplaints(prevState => ({
            ...prevState,
            [reviewNo]: !prevState[reviewNo],  // 해당 reviewNo에 대한 expanded 상태를 토글
        }));
    };

    return(
        <div className="complaint-manage-container">
            <div className="complaint-manage-top">
                <p>신고관리</p>
            </div>

            <div className="complaint-search-part">
                <div className="complaint-state-filter">
                    <p className="disabled-complaint-filter" onClick={()=>handleStateFilter('N')}>비공개</p>
                    <p className="activated-complaint-filter" onClick={()=>handleStateFilter('Y')}>공개</p>
                    <i className="bi bi-arrow-repeat" onClick={()=>{getComplaints(); setKeyword('');}}></i>
                </div>
                <div className="complaint-name-filter">
                    <input type="text" placeholder="도서명"
                        value={keyword}
                        onKeyDown={handleKeyDown}
                        onChange={(e)=>changeKeyword(e)}
                    />
                </div>
            </div>

            <div className="complaint-info-table">
                <div className="complaint-info-title">
                    <span>no</span>
                    <span>리뷰내용</span>
                    <span className="complainted-book-title">신고도서</span>
                    <span>작성자</span>
                    <span>작성일</span>
                    <span>공개여부</span>
                    <span>누적수</span>
                </div>
                <div className="complaint-info-content-box">
                    {complaints.length > 0 ? (
                        complaints.map((complaint, index) => (
                            <div className="complaint-info-content">
                                <span>{index+1}</span>
                                <div className="complaint-review">
                                    <span className={`review-text ${expandedComplaints[complaint.reviewNo] ? "expanded" : ""}`}>
                                        {complaint.reviewText}
                                    </span>
                                    <i className={`bi ${expandedComplaints[complaint.reviewNo] ? "bi-chevron-up" : "bi-chevron-down"} mr-toggle-icon`}
                                        onClick={() => handleExpand(complaint.reviewNo)}
                                    ></i>
                                </div>
                                <span className="complainted-book-title"
                                    onClick={()=>navigate(`/user/BookDetail?no=${complaint.bookNo}`)}
                                >{complaint.title}</span>
                                <span>{complaint.userNick}</span>
                                <span>{complaint.reviewRegDate}</span>
                                <div className="complaint-activation-state">
                                    <p className={`complaint-open-state ${complaint.reviewOpenYN === 'N' ? 'disabled-complaint' : ''}`}
                                        onClick={()=>handleChangeOpenStatus(complaint.reviewNo, 'N')}
                                    >비공개</p>
                                    <p className={`complaint-open-state ${complaint.reviewOpenYN === 'Y' ? 'activated-complaint' : ''}`}
                                        onClick={()=>handleChangeOpenStatus(complaint.reviewNo, 'Y')}
                                    >공개</p>
                                </div>
                                <span>{complaint.reviewComplaintCnt}</span>
                            </div>
                        ))
                    ):(
                        <div className="no-complaint">
                            <p>신고된 리뷰가 존재하지 않습니다.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ComplaintManage;