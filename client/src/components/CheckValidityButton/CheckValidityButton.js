import { Button } from '@nextui-org/react';

function CheckValidityButton({ handleCheckValidity }) {
  return (
    <Button
      onClick={handleCheckValidity}
      radius="full"
      className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
    >
      Check validity
    </Button>
  );
}

export default CheckValidityButton;