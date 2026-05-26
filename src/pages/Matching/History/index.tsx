import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DetailHeader from '../../../widgets/detailHeader.tsx';
import Title from '../../../shared/ui/title.tsx';
import HistoryItem from './component/HistoryItem.tsx';
import { getRecommendationHistories } from '../../../entities/history.ts';
import type { RecommendationHistoryItem } from '../../../entities/types.ts';
import { useBackOrHome } from '../../../shared/lib/useBackOrHome.ts';

const PAGE_SIZE = 20;

const MatchingHistory = () => {
  const navigate = useNavigate();
  const goBack = useBackOrHome();
  const [items, setItems] = useState<RecommendationHistoryItem[]>([]);
  const [cursor, setCursor] = useState<number | undefined>(undefined);
  const [hasNext, setHasNext] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const loadMore = useCallback(async () => {
    if (isLoading || !hasNext) return;
    setIsLoading(true);
    setError(null);
    try {
      const data = await getRecommendationHistories({
        cursor,
        size: PAGE_SIZE,
      });
      setItems((prev) => [...prev, ...data.items]);
      setCursor(data.nextCursor ?? undefined);
      setHasNext(data.hasNext);
    } catch (e) {
      console.error(e);
      setError('기록을 불러오지 못했습니다.');
    } finally {
      setIsLoading(false);
    }
  }, [cursor, hasNext, isLoading]);

  useEffect(() => {
    void loadMore();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const target = sentinelRef.current;
    if (!target) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          void loadMore();
        }
      },
      { rootMargin: '120px' },
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, [loadMore]);

  return (
    <main className="min-h-screen flex flex-col">
      <DetailHeader onBack={goBack}>매칭기록</DetailHeader>
      <section className="flex flex-1 flex-col gap-24 p-20">
        <div className="flex flex-1 flex-col gap-16 py-16">
          <Title icon="search_activity" title="기록" />
          <ul className="flex flex-col gap-8 w-full">
            {items.map((item) => (
              <HistoryItem
                key={item.historyId}
                title={item.title}
                description={item.plantSummaryText}
                onClick={() =>
                  navigate('/matching/result', {
                    state: { historyId: item.historyId },
                  })
                }
              />
            ))}
          </ul>

          {isLoading && (
            <p className="label-s text-text-30 text-center py-8">
              불러오는 중...
            </p>
          )}
          {error && (
            <p className="label-s text-text-30 text-center py-8">{error}</p>
          )}
          {!isLoading && !error && items.length === 0 && (
            <p className="label-s text-text-30 text-center py-8">
              매칭 기록이 없습니다.
            </p>
          )}

          <div ref={sentinelRef} className="h-1" />
        </div>
      </section>
    </main>
  );
};

export default MatchingHistory;
