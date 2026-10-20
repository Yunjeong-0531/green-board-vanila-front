

const menuBox = document.querySelector("#menu-box");


const editButton = document.querySelector("#edit-btn");
const deleteButton = document.querySelector("#delete-btn");



menuToggle.addEventListener("click", (e) => {
    e.stopPropagation();               // 아래 document 클릭 핸들러로 전파 방지
    menuBox.hidden = !menuBox.hidden;  // 숨김 ↔ 보임 전환
});

// 바깥을 클릭하면 닫기 (선택)
document.addEventListener("click", (e) => {
    if (!menuBox.contains(e.target)) {
        menuBox.hidden = true;
    }
});



deleteButton.addEventListener("click",deletePost);
editButton.addEventListener("click",()=>{
      location.href = `write.html?id=${postId}`;
});


async function deletePost(){

    if(!confirm("정말로 삭제하시겠습니까?")) return;
    
    try{
        const response = await apiRequest(`/board/${postId}`,"DELETE");
        console.log(response);
        alert("삭제되었습니다.");
        location.href="index.html";

    } catch(error){
        alert(`삭제실패(${error})`);
    }    
}

