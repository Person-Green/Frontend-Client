import { useNavigate } from 'react-router-dom';
import DetailHeader from '../../../widgets/detailHeader.tsx';
import Title from '../../../shared/ui/title.tsx';
import HistoryItem from './component/HistoryItem.tsx';

const MOCK_HISTORY = [
  { id: 1, title: '햇빛이 잘드는 공간', description: '스투키, 몬스테라...' },
  { id: 2, title: '햇빛이 잘드는 공간', description: '스투키, 몬스테라...' },
  { id: 3, title: '햇빛이 잘드는 공간', description: '스투키, 몬스테라...' },
  { id: 4, title: '햇빛이 잘드는 공간', description: '스투키, 몬스테라...' },
  { id: 5, title: '햇빛이 잘드는 공간', description: '스투키, 몬스테라...' },
];

const MatchingHistory = () => {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen flex flex-col">
      <DetailHeader onBack={() => navigate(-1)}>매칭기록</DetailHeader>
      <section className="flex flex-1 flex-col gap-24 p-20">
        <div className="flex flex-1 flex-col gap-16 py-16">
          <Title icon="search_activity" title="기록" />
          <ul className="flex flex-col gap-8 w-full">
            {MOCK_HISTORY.map((item) => (
              <HistoryItem
                key={item.id}
                title={item.title}
                description={item.description}
              />
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
};

export default MatchingHistory;
