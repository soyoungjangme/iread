import '../../css/user/PerPage.css';

function PerPage(){

    return(
    <div className="per-page-container">
        <div className="per-page-group">
            <p>Page</p>
            <input type="text" placeholder="소제목" />
            <textarea placeholder="내용입력"></textarea>
        </div>
    </div>
    )
}

export default PerPage;