const samplePost = {
    id:1,
    title: "첫 번째 게시글",
    content: "더미입니다",
    author:"학생",
    createdDatetime:"2026-10-16"
};

let posts = [
    samplePost,{
        ...samplePost, id:2, title:"HTML문서구조"
    },{
        ...samplePost, id:3, title:"학습 내용정리"
    }
]

let comments = [
    {id:1, boardId:1, content:"첫댓글", author:"학생"}
]