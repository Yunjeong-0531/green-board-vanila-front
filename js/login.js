async function login(event){
    event.preventDefault();

    const form = event.currentTarget;

    const message = document.querySelector("#login-message");

    const username = form.elements.username.value.trim();
    const password = form.elements.password.value.trim();

    try{ 
    const tokens = await apiRequest(
        "/user/login",
        "POST",
        {username,password});
    
        console.log(tokens);
     
        // //통신용 라이브러리 fetch
    // const response = await fetch("http://127.0.0.1:8080/api/user/login", {
    //     method:"POST",
    //     headers:{"Content-Type": "application/json"},
    //     body: JSON.stringify({username, password})
    // });

    // const result = await response.json();
    // console.log(result)

    // if (!response.ok || !result.success){
    //     throw new Error(result.message||"로그인에 실패했습니다.")
    // }

    if(!tokens?.accessToken){
        throw new Error("토큰이 없습니다.");
    }

    localStorage.setItem("accessToken", tokens.accessToken);
    localStorage.setItem("refreshToken", tokens.refreshToken);
    localStorage.setItem("userId",tokens.userId);
    location.href = "index.html"

    
} catch (error){
    message.textContent = error.message;
}


}




document.querySelector("#login-form").addEventListener("submit", login)