function formatDate(dateString) {
    const d = new Date(dateString);

    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");  // 월은 0부터 시작
    const dd = String(d.getDate()).padStart(2, "0");
    const hh = String(d.getHours()).padStart(2, "0");
    const min = String(d.getMinutes()).padStart(2, "0");
    return `${yyyy}년 ${mm}월 ${dd}일`;
   // return `${yyyy}년 ${mm}월 ${dd}일 ${hh}시${min}분`;   
}

function renderPosts(posts){
    const list = document.querySelector("#post-list");

    list.replaceChildren();

    
    if(posts.length === 0){
        list.textContent = "아직 게시글이 없습니다.";
    }
    for(const post of posts){
        const item = document.createElement("li");
        const link = document.createElement("a");
        link.href = `detail.html?id=${post.id}`;
        link.textContent = post.title;

        const meta = document.createElement("div");
        meta.className = "meta";
        meta.textContent = `${post.authorNickName} | ${formatDate(post.createdDateTime)}`;
        item.append(link,meta);
        list.append(item);

    }
}

function renderComments(comments){
    const list = document.querySelector("#comment-list");

    list.replaceChildren();

    if(comments.length===0){
        list.textContent = "아직 댓글이 없습니다.";

    }
    for(const comment of comments){
        const item = document.createElement("li");

       const header = document.createElement("div");
        header.classList.add("comment-header");

        const author = document.createElement("strong");
        author.textContent = comment.nickname;

        const date = document.createElement("span");
        date.textContent = formatDate(comment.commentDate);

        const menuBtn = document.createElement("span");
        menuBtn.type = "button";
        menuBtn.classList.add("comment-menu-btn");
        menuBtn.setAttribute("aria-label", "댓글 메뉴");

        const menuIcon = document.createElement("i");
        menuIcon.classList.add("fa-solid", "fa-ellipsis");
        menuBtn.append(menuIcon);

        header.append(author, date, menuBtn);

        // 아래쪽: 댓글 내용
        const content = document.createElement("p");
        content.textContent = comment.content;

        item.append(header, content);
        list.append(item);
        console.log(list)
    }
}


function renderPost(post){
    document.querySelector("#post-title").textContent = post.title;
    document.querySelector("#post-meta").textContent = `${post.authorNickName} | ${formatDate(post.createdDateTime)} | 조회수 ${post.hits} `;
    document.querySelector("#post-content").textContent = post.content;


}