const params = new URLSearchParams(location.search);
const postId = Number(params.get("id"));

//posts 배열에서 사용자가 누른 게시글 찾기
let  post = posts.find(item=>item.id ===postId);
console.log(post);

if(Number.isSafeInteger(postId)&&postId>0&&post!=undefined){
    renderPost(post);

    let filteredComments = comments.filter(item => item.boardId === postId);
    renderComments(filteredComments);
} 
if(post == undefined){
    document.querySelector("#post-title").textContent = "게시글 조회 실패";
    document.querySelector("#post-content").textContent ="";
        document.querySelector("#comments-section").hidden = true;
}