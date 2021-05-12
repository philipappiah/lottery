import React from 'react'
import styled from 'styled-components'

import Button from '../Button'
import Input, { InputProps } from './Input'

interface SearchInputProps extends InputProps {
  onSearch:  () => void,
}

const SearchInput: React.FC<SearchInputProps> = ({
  onSearch,
  onChange,
  value,
}) => {
  return (
    <StyledSearchInput>
      <Input
        endAdornment={(
          <StyledTokenAdornmentWrapper>
            <div>
              <Button size="sm" text="🔍" onClick={onSearch} />
            </div>
          </StyledTokenAdornmentWrapper>
        )}
        value={value}
        onChange={onChange}
      />
    </StyledSearchInput>
  )
}

const StyledSearchInput = styled.div`
width:100%;
`

const StyledTokenAdornmentWrapper = styled.div`
  align-items: center;
  display: flex;
  margin-right: 10px;
`


export default SearchInput