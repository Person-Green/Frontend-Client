import { useNavigate } from 'react-router-dom';
import Button from '../../shared/button.tsx';
import Swing from '../../assets/character/swing.svg';

const Matching = () => {
  const navigate = useNavigate();
  return (
    <main className="min-h-screen flex flex-col p-20 pb-[96px]">
      <article className="flex-1 flex flex-col justify-center items-center gap-24">
        <object type="image/svg+xml" data={Swing} width={161} height={200} />
        <div className="flex flex-col gap-8 py-12">
          <span className="title-l">이제 같이 식물을 찾아볼까요?</span>
          <span className="body-s text-center">
            간단한 8개의 간단한 질문으로,
            <br /> 공간에 딱 맞는 식물을 찾아드릴게요!
          </span>
        </div>
      </article>
      <div className="h-fit">
        <Button onClick={() => navigate('/matching/survey')}>매칭하기</Button>
      </div>
    </main>
  );
};
export default Matching;
