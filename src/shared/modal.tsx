import exitDoor from "../assets/plants/ExitDoor.png"
import Button from "./button";

interface ModalProps {
  title: string;
  body: string;
  label?: string | undefined;
}

const Modal = ({ title, body, label } : ModalProps) => {
  return(
    <div className=" fixed bottom-0 w-[calc(100%-16px)] flex flex-col p-16 gap-16 rounded-14 bg-surface-10 z-2000 left-1/2 -translate-x-1/2">
      <div className="flex flex-col py-16 gap-12 items-center">
        <img src={exitDoor} className="h-[144px] w-[144px]" />
        <h1 className="title-m text-text-10">{title}</h1>
        <div className="flex flex-col gap-6 items-center">
          <p className="body-s text-text-20">{body}</p>
          <p className="label-s text-text-20">{label}</p>
        </div>
      </div>
      <div className="flex flex-col gap-8">
        <Button>더 둘러보기</Button>
        <Button icon="door_open">나가기</Button>
      </div>
    </div>
  );
}

export default Modal;