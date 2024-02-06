"use client"
import { FC, ChangeEvent } from 'react';
import { MdSearch } from 'react-icons/md';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { Input } from '../ui/input';


  interface SearchProps {
      placeholder: string;
    }
    const Search: FC<SearchProps> = ({ placeholder }) => {
    const searchParams = useSearchParams();
    const { replace } = useRouter();
    const pathname = usePathname();
  
    const handleSearch = useDebouncedCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        const params = new URLSearchParams(searchParams);
  
        params.set('page', '1');
  
        if (e.target.value) {
          e.target.value.length > 2 && params.set('query', e.target.value);
        } else {
          params.delete('query');
        }
        replace(`${pathname}?${params}`);
      },
      300
    );
  
    return (
      <div className='flex '>
            <Input placeholder={placeholder} defaultValue={searchParams.get('query')?.toString()} onChange={handleSearch} className=' hover:bg-none hover:border-none bg-white border-none m-2'>
            
            </Input>
      </div>
    );
  };
  
  export default Search;