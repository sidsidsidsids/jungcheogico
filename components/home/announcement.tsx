export default function Announcement() {
  const text = "정보처리기사 코딩 문제 솔루션";
  return (
    <div className="w-72 sm:w-full text-2xl w-48 xs:text-3xl sm:text-4xl lg:text-5xl p-6 font-noto_sans_kr text-center">
      {text.split("").map((char, index) => {
        let fontWeight = "font-thin";
        if (["정", "처", "기", "코"].includes(char)) {
          fontWeight = "font-black";
        }
        return (
          <span key={index} className={`${fontWeight}`}>
            {char}
          </span>
        );
      })}
    </div>
  );
}
