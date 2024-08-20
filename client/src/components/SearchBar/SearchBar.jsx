import { Input } from "@nextui-org/react";
import { Search } from 'lucide-react';

function SearchBar({ placeholder, value, onChange }) {
  return (
    <Input
      placeholder={placeholder}
      className="m-5 w-1/2 mx-auto text-rich-black"
      startContent={<Search />}
      value={value}
      onValueChange={onChange}
    />
  );
}

export default SearchBar;