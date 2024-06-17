import { Button } from '@nextui-org/react';

function CheckValidityButton({ handleCheckValidity }) {
  return (
    <Button onClick={handleCheckValidity}>Check validity</Button>
  );
}

export default CheckValidityButton;