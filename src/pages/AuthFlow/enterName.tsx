import { useState } from 'react';
import Button from '../../shared/button.tsx';

// TODO: 임시 페이지 - 실제 EnterName UI로 교체 필요
const EnterName = () => {
  const [name, setName] = useState('');
  const [error, setError] = useState(true);
  const hasValue = name.length > 0;
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
  const onClickHandle = () => {
    const trimmed = name.trim();
    const isTooShort = trimmed.length >= 5;
    const hasInvalidChar = !/^[a-zA-Z0-9가-힣]+$/.test(trimmed);
    const hasSpace = /\s/.test(name);

    let isError = isTooShort || hasInvalidChar || hasSpace;
    isError = !isError;
    setError(isError);
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
              onChange={(e) => setName(e.target.value)}
              className={`w-full body-s bg-transparent outline-none placeholder:text-text-30 ${hasValue ? 'text-text-20' : 'text-text-30'}`}
            />
            <span
              className={`icon-s ${hasValue ? 'text-text-20' : 'text-text-30'}`}
            >
              ar_on_you
            </span>
          </div>
          <div className={`label-s ${error ? 'text-text-30' : 'text-warning'}`}>
            ※ 필수 입력란 입니다. 5자 이내, 특수문자, 공백 사용불가.
          </div>
        </div>
        {/*  버튼 컴포넌트*/}
        <Button icon="flag_2" dimmed={!hasValue} onClick={onClickHandle}>
          {item.button}
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
