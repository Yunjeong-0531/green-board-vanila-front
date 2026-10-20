//로그인 체크 


let currentPage =0;
let totalPages=0;
const previousButton = document.querySelector("#previous-page");
const nextButton = document.querySelector("#next-page");


if(requireLogin()){
    //게시글 리스트 조회 및 렌더링
    loadPosts(0);
}

async function loadPosts(page = currentPage){
    try{
        const posts = await apiRequest(`/board?page=${page}&size=4`) 
        console.log(posts);

        renderPosts(posts.content);
        currentPage=posts.number;
        totalPages=posts.totalPages;

        document.querySelector("#list-message").textContent = `전체 ${posts.totalElements} 개`;
        let pageNumber=""
        if(totalPages===0){
            pageNumber="0페이지"
        } else {
            pageNumber=`${currentPage +1}/${totalPages}페이지`;
        }
        
        document.querySelector("#page-number").textContent = pageNumber;
        previousButton.disabled = currentPage ===0;
        nextButton.disabled = currentPage +1>=totalPages;
   
    } catch(error){
       document.querySelector("#list-message").textContent=error;
   
    }
}




previousButton.addEventListener("click", function(event){
    if(currentPage>0){
    loadPosts(currentPage-1);
    }
    console.log(currentPage);

});
nextButton.addEventListener("click", function(event){
    if(currentPage+1<totalPages){
    loadPosts(currentPage+1);

    }
    
});