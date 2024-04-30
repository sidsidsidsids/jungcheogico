interface CommentListProps {
  comments: {
    _id: string;
    writer: string;
    date: string;
    content: string;
    language: string;
    quizid: number
  }[];
}
async function deleteFunc(language: string, quizid: number, id: any) {
  const userInput = prompt("해당 댓글의 비밀번호를 입력해주세요 (4~8자)");
  const res = await fetch(`${process.env.API_URI}/api/comment/${language}/${quizid}`,
  {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      _id: id,
      password: userInput
    }),
  })
  const json = await res.json()
  
  return json;
}
export default function CommentList({ comments }: CommentListProps) {
  return (
    <div className="flex flex-col w-72 sm:w-122 mt-2">
      {comments.map((comment, _) => (
        <div key={comment._id} className="relative m-1">
          <div className="flex flex-row w-72 sm:w-122 gap-2 place-items-end">
            <span className="text-md font-noto_sans_kr font-medium">
              {comment.writer}
            </span>
            <span className="text-xs text-slate-500 font-noto_sans_kr">
              {comment.date.slice(2, 10)}
            </span>
          </div>
          <p>{comment.content}</p>
          <div
            className="absolute bottom-5 right-2 font-black font-roboto text-red-600 cursor-pointer"
            onClick={() => deleteFunc(comment.language, comment.quizid, comment._id)}
          >
            X
          </div>
          <div className="h-0.5 bg-slate-200 m-1 rounded-xl" />
        </div>
      ))}
    </div>
  );
}
