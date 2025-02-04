import '../../css/user/PerChapter.css';

function PerChapter(){

    return(
        <div className="per-chapter-container">
            <div className="per-chapter-group">
                <p>Chapter1</p>
                <input type="text" placeholder="소제목" />
                <textarea placeholder="내용입력"></textarea>
            </div>
            <div className="per-chapter-group">
                <p>Chapter2</p>
                <input type="text" placeholder="소제목" />
                <textarea placeholder="내용입력"></textarea>
            </div>
        </div>
    )
}

export default PerChapter;