import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

type Props = {};

const SearchBar = ({}: Props) => {
  return (
    <InputGroup>
      <InputLeftElement pointerEvents='none'>
        <SearchIcon />
      </InputLeftElement>
      <Input placeholder='Search' />
    </InputGroup>
  );
};

export default SearchBar;
