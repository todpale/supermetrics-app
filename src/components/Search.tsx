import React, { FC, ReactElement } from 'react'

interface Props {
    placeholder?: string;
    onSearch: (value: string) => void;
}

const Search: FC<Props> = (props): ReactElement => {
    return (
        <div className="search">
            <input
                type="text"
                name="search"
                placeholder={ props.placeholder }
                onChange={(e) => props.onSearch(e.target.value)}
            />
        </div>
    )
}

export default Search
