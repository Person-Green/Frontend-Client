import Button from "./button";
import { useModalStore } from "../stores/modalStore";

interface ModalButtonProps {
  index: number;
}

const ModalButton = ({ index }: ModalButtonProps) => {
  const button = useModalStore((state) => state.content?.buttons[index]);

  if (!button) return null;

  return (
    <Button icon={button.icon} onClick={button.onClick}>
      {button.label}
    </Button>
  );
};

export default ModalButton;