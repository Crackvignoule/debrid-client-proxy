import { Input } from '@nextui-org/react';
import './InputField.scss';

function InputField({ inputKey, isInvalid, apiKey, handleInputChange, handleClearInput }) {

  return (
    <div className="input-container">
      <Input
        variant="faded"
        key={inputKey}
        isClearable
        label="Alldebrid API Key"
        isInvalid={isInvalid === false}
        value={apiKey}
        onChange={handleInputChange}
        onClear={handleClearInput}
        className='input-field'
      />
    </div>
  );
}

export default InputField;