import React, { useState } from 'react'

const ERROR_IMG_SRC =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg=='

export function ImageWithFallback(props: React.ImgHTMLAttributes<HTMLImageElement>) {
  const { src, alt, style, className, ...rest } = props
  const [didError, setDidError] = useState(!src || src === "")

  const handleError = () => {
    setDidError(true)
  }

  if (didError) {
    return (
      <div
        className={`flex items-center justify-center bg-gray-50 border border-gray-100 ${className ?? ''}`}
        style={{ ...style, minHeight: '100px' }}
      >
        <div className="flex flex-col items-center gap-2 opacity-30">
          <img src={ERROR_IMG_SRC} alt="Missing" className="w-8 h-8" />
          <span style={{ fontSize: '10px', fontWeight: 600 }}>IMAGE UNAVAILABLE</span>
        </div>
      </div>
    )
  }

  return (
    <img 
      src={src} 
      alt={alt} 
      className={className} 
      style={style} 
      {...rest} 
      onError={handleError} 
    />
  )
}
