import { Button, Tooltip } from "@nextui-org/react";

function ActionButton({ tooltipContent, onClick, icon: Icon, className, tooltipColor = "foreground" }) {
  return (
    <Tooltip color={tooltipColor} showArrow={true} content={tooltipContent}>
      <Button isIconOnly onClick={onClick} className={`bg-cadet-grey ${className || ''}`.trim()}>
        <Icon />
      </Button>
    </Tooltip>
  );
}

export default ActionButton;