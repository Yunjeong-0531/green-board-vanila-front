const params = new URLSearchParams(location.search);
const postId = Number(params.get("id"));
let postUserId;
const menuToggle = document.querySelector("#menu-toggle");

// //posts 배열에서 사용자가 누른 게시글 찾기
// let  post = posts.find(item=>item.id ===postId);


// if(Number.isSafeInteger(postId)&&postId>0&&post!=undefined){
//     renderPost(post);

//     let filteredComments = comments.filter(item => item.boardId === postId);
//     renderComments(filteredComments);
// } 
// if(post == undefined){
//     document.querySelector("#post-title").textContent = "게시글 조회 실패";
//     document.querySelector("#post-content").textContent ="";
//     document.querySelector("#comments-section").hidden = true;
// }


if(requireLogin()){
    if (Number.isSafeInteger(postId) && postId > 0) {
        loadPost().then(() => {
           
           
            loadComment();


            //토글버튼 표시
            const savedId = localStorage.getItem("userId");
            
            console.log("저장된 userId:", savedId, typeof savedId);
            console.log("postUserId:", postUserId, typeof postUserId);

            menuToggle.hidden = savedId !== String(postUserId);
            console.log("menuToggle.hidden:", menuToggle.hidden);
        });
    }
}

async function loadPost(){
    const message = document.querySelector("#post-message");
    message.textContent = "게시글 불러오는 중"
    try{

        const post = await apiRequest(`/board/${postId}`)
        
        
        console.log(post)
        renderPost(post);
        message.textContent ="";
     

        postUserId = post.authorId;
        console.log(postUserId)
    
   
    } catch(error){
       document.querySelector("#post-title").textContent= "게시글 조회 실패";
    document.querySelector("#post-content").textContent="";
        message.textCOntent =error.message;
     document.querySelector("#comments-section").hidden=true;
    }
}

async function loadComment(){
    try{

        const comments = await apiRequest(`/board/${postId}/comment`)
        console.log(comments)
        renderComments(comments);

   
    } catch(error){
       document.querySelector("#post-title").textContent=error;
   
    }
}



//댓글 추가
document.querySelector("#comment-form")
        .addEventListener("submit",async function(event){
            
            
    event.preventDefault();

    const content = document.querySelector("#comment-content").value.trim();
   

    //현재 페이지에 해당하는 게시글 없거나
    //댓글 내용이 비었거나 255자 넘는 경우 예외처리
    if( !content || content.length>255){

        document.querySelector("#comment-message").textContent=
        "댓글은 1~255자로 입력하세요.";
        return;

    }


    try{ 

    const response = apiRequest(`/board/${postId}/comment`,"POST",{content})
      
    console.log(response)

    document.querySelector("#comment-content").value = "";
    loadComment();

    
} catch (error){
    document.querySelector("#comment-message").textContent= error.message;
}

});

