import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../../css/admin/UserManage.css';

function UserManage(){

    const [users, setUsers] = useState([]);
    const [keyword, setKeyword] = useState('');

    useEffect(()=>{
        getUsers();
    },[]);

    const getUsers = async() => {
        try{
            const resp = await axios.get('/api/adminManage/getUserInfo');
            setUsers(resp.data);
        } catch (error) {
            console.log('회원정보 호출 중 error', error);
        }

    };

    //유저활동상태 변경
    const handleChangeState = async(userNo, userActivatedYN) => {
        await axios.patch('/api/adminManage/changeUserState',{
            userNo, userActivatedYN
        });
        getUsers();
    };

    //유저활동상태 필터
    const handleStateFilter = async(state) => {
        const resp = await axios.get('/api/adminManage/getUserInfo', {
            params: { state }
        });
        setUsers(resp.data);
    };

    //검색어입력
    const changeKeyword = (e) => {
        setKeyword(e.target.value);
    }

    //검색_엔터키
    const handleKeyDown = async(e) =>{
        if(e.key !== 'Enter') return;

        const resp = await axios.get('/api/adminManage/getUserInfo', {
            params: { keyword }
        });
        setUsers(resp.data);
    };

    return(
        <div className="user-manage-container">
            <div className="user-manage-top">
                <p>회원관리</p>
                <p>누적회원수 {users?.length || 0}명</p>
            </div>

            <div className="user-search-part">
                <div className="user-state-filter">
                    <p className="disabled-user-filter" onClick={()=>handleStateFilter('N')}>비활성화</p>
                    <p className="activated-user-filter" onClick={()=>handleStateFilter('Y')}>활성화</p>
                    <i className="bi bi-arrow-repeat" onClick={getUsers}></i>
                </div>
                <div className="user-name-filter">
                    <input type="text" placeholder="회원명, 닉네임"
                        value={keyword}
                        onKeyDown={handleKeyDown}
                        onChange={(e)=>changeKeyword(e)}
                    />
                </div>
            </div>

            <div className="user-info-table">
                <div className="user-info-title">
                    <span>no</span>
                    <span>닉네임</span>
                    <span>회원명</span>
                    <span>생년월일</span>
                    <span>북노트</span>
                    <span>리뷰</span>
                    <span>가입일</span>
                    <span>활동상태</span>
                </div>
                <div className="user-info-content-box">
                    {users.length > 0 ? (
                        users.map((user, index) => (
                            <div className="user-info-content" key={index}>
                                <span>{index+1}</span>
                                <span>{user.userNick}</span>
                                <span>{user.userName}</span>
                                <span>{user.userBirth || 'x'}</span>
                                <span>{user.bookNoteCnt}개</span>
                                <span>{user.reviewCnt}개</span>
                                <span>{user.userRegDate || 'x'}</span>
                                <div className="user-activation-state">
                                    <p className={`activation-state ${user.userActivatedYN === 'N' ? 'disabled-user' : ''}`}
                                        onClick={()=>handleChangeState(user.userNo, 'N')}>
                                        비활성화
                                    </p>
                                    <p className={`activation-state ${user.userActivatedYN === 'Y' ? 'activated-user' : ''}`}
                                        onClick={()=>handleChangeState(user.userNo, 'Y')}>
                                        활성화
                                    </p>
                                </div>
                            </div>
                        ))
                    ):(
                        <div className="no-user">
                            <p>회원이 존재하지 않습니다.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default UserManage;