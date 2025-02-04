import '../../css/user/PerPage.css';

function PerPage(){

    return(
    <div className="per-chapter-container">
        <div className="per-chapter-group">
            <p>Page</p>
            <input type="text" placeholder="소제목" />
            <textarea placeholder="내용입력"></textarea>
        </div>
    <div className="per-chapter-group">
    <p>Page</p>
    <input type="text" placeholder="소제목" />
    <textarea placeholder="내용입력"></textarea>
    </div>
    </div>
    )
}

export default PerPage;