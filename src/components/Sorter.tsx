import React, { FC, ReactElement } from 'react'

interface Props {
    clicked: string;
    onSelect: (type: string) => void;
}

const Sorter: FC<Props> = (props): ReactElement => {

    const buttons = [
        { type: 'ASC', icon: 'asc' },
        { type: 'DESC', icon: 'desc' },
    ]

    const buttonsClass = (type: string) => type === props.clicked ? 'sorter-button active' : 'sorter-button'

    return (
        <div className="sorter">
            { buttons.map((el, index) => (
                <div
                    key={ `buttons${index}` }
                    className={ buttonsClass(el.type) }
                    onClick={() => props.onSelect(el.type)}
                >
                    <img
                        src={ `./icon-${el.icon}.svg` }
                        alt={ el.type }
                    />
                </div>
            )) }
        </div>
    )
}

export default Sorter
