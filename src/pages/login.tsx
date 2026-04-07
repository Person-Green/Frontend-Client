import Button from '../shared/button.tsx';
import AllPlant from '../assets/plants/allPlant.svg';

const Login = () => {
  const item = {
    img: AllPlant,
    title: (
      <>
        오늘, 내 공간에 <span className="text-text-highlight">초록</span>을
        들여볼까요?
      </>
    ),
    description: '가든 스텝으로 공간에 초록을 더해보세요.',
    button: '구글로 로그인하기',
    subTag: '로그인에 문제가 있나요?',
  };
  return (
    <main className={'min-h-screen p-20 flex items-center justify-center'}>
      <div className={'h-fit flex flex-col gap-24'}>
        <div className={'flex flex-col items-center gap-20'}>
          <img src={item.img} alt="식물사진" />
          <div className="flex flex-col items-center gap-12">
            <div className={'title-m text-text-10'}>{item.title}</div>
            <div className="whitespace-pre-line body-s text-text-20 text-center">
              {item.description}
            </div>
          </div>
        </div>
        <div className={'py-24 flex flex-col justify-center gap-6'}>
          {/*  버튼 컴포넌트*/}
          <Button disabled>{item.button}</Button>
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
      </div>
    </main>
  );
};
export default Login;
