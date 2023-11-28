import React from 'react'

export default function SecondaryButton({ title = "", handleOnClick = () => { }, bodyClass = "", className = "" }) {
    return (
        <div className={`${bodyClass}`}>
            <p className={`buy-tickets ${className}`}>
                <a onClick={() => handleOnClick()}>
                    {title}
                </a>
            </p>
        </div>
    )
}
