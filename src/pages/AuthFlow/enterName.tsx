import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../shared/ui/button.tsx';
import { updateUsername } from '../../shared/api';

const EnterName = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const hasValue = name.length > 0;

  const validate = (value: string): boolean => {
    const trimmed = value.trim();
    if (trimmed.length === 0 || trimmed.length > 5) return false;
    if (!/^[a-zA-Z0-9가-힣]+$/.test(trimmed)) return false;
    if (/\s/.test(value)) return false;
    return true;
  };

  const item = {
    title: (
      <>
        안녕하세요! 사용자님을 <br />
        <span className="text-text-highlight">어떻게 불러드려야</span>할까요?
      </>
    ),
    description: '가든 스텝으로 공간에 초록을 더해보세요.',
    button: '시작하기',
    subTag: '다른 계정으로 로그인',
  };

  const onClickHandle = async () => {
    if (!validate(name)) {
      setError(true);
      return;
    }
    setError(false);
    setIsLoading(true);
    try {
      const user = await updateUsername({ username: name.trim() });
      localStorage.setItem(`hasSetUsername:${user.id}`, 'true');
      navigate('/', { replace: true });
    } catch (e) {
      console.error('이름 저장 실패', e);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className={'min-h-screen p-20 flex items-center justify-center'}>
      <div className={'w-full h-fit flex flex-col gap-24'}>
        <div className={'title-m text-text-10'}>{item.title}</div>
        <div className="w-full flex flex-col gap-6">
          <div className="w-full p-16 rounded-14 bg-surface-20 flex justify-between gap-6">
            <input
              type="text"
              placeholder="이름을 입력해주세요!"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError(false);
              }}
              className={`w-full body-s bg-transparent outline-none placeholder:text-text-30 ${hasValue ? 'text-text-20' : 'text-text-30'}`}
            />
            <span
              className={`icon-s ${hasValue ? 'text-text-20' : 'text-text-30'}`}
            >
              ar_on_you
            </span>
          </div>
          <div className={`label-s ${error ? 'text-warning' : 'text-text-30'}`}>
            ※ 필수 입력란 입니다. 5자 이내, 특수문자, 공백 사용불가.
          </div>
        </div>
        <Button
          icon="flag_2"
          dimmed={!hasValue || isLoading}
          onClick={onClickHandle}
        >
          {isLoading ? '저장 중...' : item.button}
        </Button>
        <button
          type="button"
          disabled
          className={
            'label-s text-text-30 underline opacity-50 cursor-not-allowed'
          }
        >
          {item.subTag}
        </button>
      </div>
    </main>
  );
};
export default EnterName;
