const API_SERVER = "http://127.0.0.1:8080/api"

async function apiRequest(path, method= "GET", body=null){
    
    const headers = {}

    if(path!=="/user/login"){
        Object.assign(headers, getAuthHeaders());
    }
    if(body!==null){
        headers["Content-Type"]="application/json";
    }
    let response;
    try{
        response = await fetch(`${API_SERVER}${path}`, {
            method, 
            headers,
            body: body===null? undefined : JSON.stringify(body)
        })

    } catch{
        throw new Error("서버에 연결할 수 없습니다.")

    }

   
    const result = await response.json()
     .catch((err)=>{
        console.log(err);
  
    });

    //? 해당 변수가 비어있는지 체크 후 나머지 코드 실행
    if(!response.ok||!result?.success){
        if(response.status ===401&& path!=="/user/login"){

            localStorage.removeItem("accessToken");
            console.log("401 Unauthorized");
           try{
                const response = await fetch("http://127.0.0.1:8080/api/user/refresh",{
                    method:"POST",
                    headers:{"Content-Type": "application/json"},
                   
                    body: JSON.stringify({
                        refreshToken: localStorage.getItem("refreshToken")
                    })
                });

                tokenResult = await response.json();
            console.log(tokenResult)
                localStorage.setItem("accessToken",tokenResult.data.accessToken);
                return await apiRequest(path, method, body);
            

            } catch(error) {
                throw new Error("토큰 요청 실패")   }
        }  
    throw new Error(result?.message || `요청 실패(${response.status})`)
    } 

    return result.data;

}





