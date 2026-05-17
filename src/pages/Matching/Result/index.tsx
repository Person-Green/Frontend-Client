import { useLocation, useNavigate } from 'react-router-dom';
import Button from '../../../shared/ui/button.tsx';
import type { SurveyAnswers } from '../Survey/types.ts';

const MatchingResult = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const answers = (location.state as { answers?: SurveyAnswers } | null)
    ?.answers;

  return (
    <main className="min-h-screen flex flex-col p-20">
      <h1 className="title-l py-24">매칭 결과</h1>
      <pre className="flex-1 body-s whitespace-pre-wrap">
        {JSON.stringify(answers ?? {}, null, 2)}
      </pre>
      <div className="h-fit">
        <Button onClick={() => navigate('/')}>홈으로</Button>
      </div>
    </main>
  );
};

export default MatchingResult;
