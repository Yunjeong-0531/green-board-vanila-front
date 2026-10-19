//현재 로그인 여부 조회
function isLoggedIn(){
    return Boolean(localStorage.getItem("accessToken"));
}

//로그인 페이지 리다이렉션
function requireLogin(){
    if(isLoggedIn()){
        return true;
    }
    location.replace("login.html");
    return false;
}
//Authorization Header 생성
function getAuthHeaders(){
    const accessToken = localStorage.getItem("accessToken");
    return{
        Authorization: `Bearer ${accessToken}`
    }
}

//로그인 상태에 따른 navigation UI 설정
function setupNavigation(){
    //로그인 상태인 경우 ->로그인 버튼 숨김
    document.querySelector(".login-link").hidden = isLoggedIn();
    //로그아웃 상태인 경우 ->로그아웃 버튼 숨김
    document.querySelector(".logout-button").hidden = !isLoggedIn();
    //로그아웃 상태인 경우 -> 글쓰기 버튼 숨김
    document.querySelector(".write-link").hidden = !isLoggedIn();
    //로그아웃 상태인 경우 -> 우측 nav의 게시판 버튼 숨김
    document.querySelector('nav > a[href="index.html"]').hidden = !isLoggedIn();    
}

 setupNavigation();
