
const params = new URLSearchParams(location.search);
const postId = params.get("id");
const form = document.querySelector("#post-form");


//로그인 체크 
requireLogin();


async function loadPost() {
  const response = await apiRequest(`/board/${postId}`);
    console.log(response)
  form.elements.title.value = response.title;
  form.elements.content.value =response.content;
   document.querySelector("h1").textContent = "글 수정";
  form.querySelector("button[type='submit']").textContent = "게시글 수정";



}

if (postId) {
  loadPost();
} 




form.addEventListener("submit", async function(event){
    event.preventDefault();
    const title = form.elements.title.value.trim();
    const content = form.elements.content.value.trim();

    const button = form.querySelector(`button[type="submit"]`)


    if( title.length<10 || title.lengh>50 || content.length< 10){
        document.querySelector("#form-message").textContent = 
        "제목은 10~50자, 본문은 10자 이상 입력하세요.";
        return;   
    }



    if(button.disabled){
        return
    }

    button.disabled=true;
    document.querySelector("#form-message").textContent = 
            "저장 중입니다.";

    try{ 

    let response;
    if(postId){
        response =await apiRequest(`/board/${postId}`,"PATCH",{title, content}) 
        console.log(response);

        location.href=`detail.html?id=${postId}`;
    }else{
        response =await apiRequest(`/board`,"POST",{title, content}) ;
    
        console.log(response);
        location.href = "index.html"
    }   

        
    } catch (error){
        document.querySelector("#form-message").textContent= error.message;
    } finally{
        button.disabled=false;
    }

})

