import React, { useEffect, useState }  from 'react';
import ReactPaginate from 'react-paginate';
import axios from 'axios';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../../css/admin/BookList.css';

function BookList(){
    const [keyword, setKeyword] = useState(''); //검색어
    const [searching, setSearching] = useState(false); //검색여부
    const [bookList, setBookList] = useState([]); //도서전체목록

    //pagination
    const [pageCount, setPageCount] = useState(0); //전체 페이지수
    const [currentPage, setCurrentPage] = useState(0); //현재 페이지번호

    const bookPerPage = 10; //페이지당 도서 개수



    useEffect(() => {
        scrollTop();
        if(searching){
            searchKeyword();
        }else{
            getBooks();
        }
    },[currentPage]);

    const scrollTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    //목록호출
    const getBooks = async() => {
        try{
            const resp = await axios.get('/api/adminBook/getAllBook',{
                params: {
                    page : currentPage+1,
                    pageSize : bookPerPage
                }
            });
            setBookList(resp.data.books);
            setPageCount(Math.ceil(resp.data.totalCount/bookPerPage));
        }catch(error){
            console.log('도서목록 호출 중 error, ', error);
        }
    }

    const handlePageClick = (e) => {
        setCurrentPage(e.selected);
    }

    //검색
    const searchKeyword = async(e) => {
        console.log("검색어: ", keyword);

        if(!keyword){
            alert('검색어를 입력해주세요.');
            return;
        }
        setSearching(true);

        try{
            const resp = await axios.get('/api/adminBook/searchResult',{
                params: {
                    page : currentPage+1,
                    pageSize : bookPerPage,
                    keyword
                }
            });

            setBookList(resp.data.books);
            setPageCount(Math.ceil(resp.data.totalCount/bookPerPage));
        }catch (error){
            console.log("검색결과 호출 중 error ", error);
        }
    }

    //삭제
    const deleteBook = async (bookNoToDelete) => {
        if(!window.confirm('삭제하시겠습니까?')){
            return;
        }
        try {
            // 쿼리 파라미터를 통해 bookNo 전달
            const resp = await axios.delete(`/api/adminBook/deleteBook?bookNo=${bookNoToDelete}`);

            alert(resp.data || "삭제가 완료되었습니다.");
            setBookList((prev)=> prev.filter((book)=>book.bookNo !== bookNoToDelete)); //삭제한 도서 필터링
        } catch (error) {
            console.error("삭제 중 오류 발생:", error);
            alert("삭제 중 오류가 발생했습니다.");
        }
    };

    return(
        <div className="registed-book-list-container">
            <div className="book-search">
                <p><i className="bi bi-search"></i></p>
                <div className="search-box">
                    <input type="text"
                        value={keyword}
                        onChange={(e)=>setKeyword(e.target.value.trim())}
                        onKeyDown={(e) => e.key === 'Enter' && searchKeyword(e) && setCurrentPage(0)}
                        placeholder="도서명, 저자, 장르, 출판사"
                    />
                </div>
            </div>
            <div className="book-regist">
                <div className="list-cnt">
                    <p>총 {bookList?.length || 0}개</p>
                </div>
                <button type="button">도서등록</button>
                <div className="regist-way-container">
                    <div className="regist-way-box">
                        <div className="write-way">
                            <a href="./RegistWriteBook">직접등록</a>
                        </div>
                        <div className="search-way">
                            <a href="./RegistSearchBook">도서검색</a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="registed-book-list">

                {bookList.length > 0 ? (
                    bookList.map((list, index)=>(
                        <div className="book-box" key={index}>
                            <div className="book-title">
                                <div className="book-no">{currentPage*bookPerPage + index + 1} | </div>
                                <p>{list.title}</p>
                            </div>
                            <div className="info">
                                <div className="book-img">
                                    <img src={list.image} alt="이미지"/>
                                </div>
                                <div className="book-info">

                                    <div className="info-title">
                                        <p>저자 </p>
                                        <p>장르 </p>
                                        <p>출간일 </p>
                                        <p>출판사 </p>
                                    </div>
                                    <div className="info-cont">
                                        <p>{list.author}</p>
                                        <p>{list.genreName}</p>
                                        <p>{list.pubdate}</p>
                                        <p>{list.publisher}</p>
                                    </div>
                                </div>
                                <div className="book-review-cnt">
                                    <p>리뷰(231)</p>
                                </div>
                                <div className="info-btn">
                                    <button className="book-detail">상세보기</button>
                                    <button className="book-modify">수정</button>
                                    <button className="book-del" onClick={() => deleteBook(list.bookNo)}>삭제</button>
                                </div>
                            </div>
                        </div>
                    ))
                ):(
                    <div className="book-box">
                        <p style={{fontSize:"small"}}>등록된 도서가 존재하지 않습니다.</p>
                    </div>
                )}
            </div>
            {/* React Paginate 컴포넌트 */}
            <ReactPaginate
                previousLabel={"이전"} // 이전 버튼 텍스트
                nextLabel={"다음"} // 다음 버튼 텍스트
                breakLabel={"..."} // 페이지 사이 구분자
                pageCount={pageCount} // 전체 페이지 수
                marginPagesDisplayed={1} // 처음과 끝에 보여질 페이지 수
                pageRangeDisplayed={5} // 현재 페이지 주변에 보여질 페이지 수
                onPageChange={handlePageClick} // 페이지 클릭 이벤트
                containerClassName={"pagination"} // 페이지네이션 컨테이너 클래스
                activeClassName={"active"} // 활성화된 페이지 클래스
                forcePage={pageCount > 0 ? currentPage : undefined} // 현재 페이지를 강제로 지정
            />
        </div>
    );
}

export default BookList;