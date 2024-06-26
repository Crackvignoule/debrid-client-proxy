import { Button, Tooltip } from "@nextui-org/react";

function ActionButton({ tooltipContent, onClick, icon: Icon }) {
  return (
    <Tooltip color="foreground" showArrow={true} content={tooltipContent}>
      <Button isIconOnly onClick={onClick} className="bg-cadet-grey">
        <Icon />
      </Button>
    </Tooltip>
  );
}

export default ActionButton;