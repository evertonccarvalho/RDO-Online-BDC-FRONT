import { ReactNode, useState } from "react";
import { Button } from "../ui/button";

interface ButtonContentSwitcherProps {
  buttons: {
    label: string;
    content: ReactNode;
  }[];
}

const ButtonContentSwitcher: React.FC<ButtonContentSwitcherProps> = ({
  buttons,
}) => {
  const [activeButton, setActiveButton] = useState<string>("");
  const [selectedContent, setSelectedContent] = useState<ReactNode | null>(
    null,
  );

  const handleButtonClick = (index: number, content: ReactNode) => {
    setSelectedContent(content);
    setActiveButton(buttons[index].label.toLowerCase());
  };

  return (
    <div>
      <header className="flex w-full bg-gray-900">
        {buttons.map((button, index) => (
          <Button
            key={index}
            className={
              activeButton === button.label.toLowerCase()
                ? "active"
                : "bg-gray-950 text-white"
            }
            onClick={() => handleButtonClick(index, button.content)}
          >
            {button.label}
          </Button>
        ))}
      </header>
      {selectedContent}
    </div>
  );
};

export default ButtonContentSwitcher;
