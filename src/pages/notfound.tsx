import { useNavigate } from "react-router-dom";
import surprised from "../assets/character/surprised.svg";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-surface-10 text-center px-20 gap-12">
      <div className="flex flex-col items-center gap-20 mt-12 mb-12">
        <img src={surprised} alt="surprised character" className="w-40" />
        <div className="flex flex-col gap-6">
          <p className="title-l text-text-10">이런!</p>
          <p className="title-s text-text-10 mt-1">존재하지 않는 페이지에요.</p>
          <p className="body-s text-text-20 mt-2">하지만, 좋은 식물들을 찾을 수 있을 것 같아요!</p>
        </div>
      </div>
      <button
        onClick={() => navigate("/")}
        className=" body-s text-primary underline gap-12"
      >
        홈으로 돌아가기
      </button>
    </div>
  );
}

export default NotFound;
