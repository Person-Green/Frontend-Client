import { createPortal } from "react-dom";
import exitDoor from "../../assets/plants/ExitDoor.png";
import ModalButton from "./modalButton";
import Dim from "./dim";
import { useModalStore } from "../stores/modalStore";

const Modal = () => {
  const isOpen = useModalStore((state) => state.isOpen);
  const useImage = useModalStore((state) => state.content?.useImage)
  const title = useModalStore((state) => state.content?.title);
  const body = useModalStore((state) => state.content?.body);
  const label = useModalStore((state) => state.content?.label);
  const buttonAmount = useModalStore(
    (state) => state.content?.buttonAmount ?? 1
  );

  if (!isOpen) return null;

  return createPortal(
    <>
      <Dim />
      <div className="fixed bottom-0 w-[calc(100%-16px)] flex flex-col p-16 gap-16 rounded-14 bg-surface-10 z-2000 left-1/2 -translate-x-1/2">
      <div className="flex flex-col py-16 gap-12 items-center">
        {!useImage && <img src={exitDoor} className="h-[144px] w-[144px]" />}
        <h1 className="title-m text-text-10">{title}</h1>
        <div className="flex flex-col gap-6 items-center">
          <p className="body-s text-text-20">{body}</p>
          {label && <p className="label-s text-text-20">{label}</p>}
        </div>
      </div>
      <div className="flex flex-col gap-8">
        {Array.from({ length: buttonAmount }).map((_, idx) => (
          <ModalButton key={idx} index={idx} />
        ))}
      </div>
      </div>
    </>,
    document.body
  );
};

export default Modal;