import React from 'react'

export default function TextInputComp({ type = "text", placeholder = "", className = "", value, onChange }) {
    return (
        <div className={`form-group ${className} `}>
            <input
                className={`form-control `}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(
                    type == "file" ? e.target.files[0] : e.target.value
                )}
            />
        </div>
    )
}
