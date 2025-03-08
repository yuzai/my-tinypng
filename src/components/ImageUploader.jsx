import React from 'react'

export default function ImageUploader({ isDragging, onDragOver, onDragLeave, onDrop, onFileSelect }) {
  return (
    <div className="py-8">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white">压缩 PNG 图片</h1>
        <p className="text-lg mb-2 max-w-2xl mx-auto text-white">
          通过我们先进的有损压缩技术，将您的 PNG 文件尺寸减小多达 70%，同时保持完全透明度。
        </p>
        <p className="text-sm text-yellow-200 mb-4 md:hidden">建议使用电脑访问以获得最佳体验</p>
        
        <label 
          className={`
            block max-w-2xl mx-auto bg-white rounded-lg shadow-md overflow-hidden
            ${isDragging ? 'ring-4 ring-[#96B78F] scale-[1.02] bg-[#F8FFF6]' : ''}
            hover:shadow-lg hover:scale-[1.01] hover:bg-[#FCFCFC]
            transition-all duration-300 ease-in-out cursor-pointer
          `}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
        >
          <input
            type="file"
            className="sr-only"
            multiple
            accept="image/*"
            onChange={onFileSelect}
          />
          <div className={`
            px-6 py-12 text-center
            ${isDragging ? 'opacity-70' : ''}
            transition-opacity duration-300
          `}>
            <svg
              className="mx-auto h-16 w-16 text-gray-400 mb-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
              />
            </svg>
            
            <div className="mb-4">
              <div className="text-xl text-gray-700 mb-2">
                拖放图片到这里
              </div>
              <div className="text-gray-500">
                或者点击此处选择图片
              </div>
              <div className="text-sm text-gray-400 mt-1">
                支持 Ctrl+V 直接粘贴图片
              </div>
            </div>
            
            <div className="mt-4 text-sm text-gray-500">
              支持 JPG、PNG、GIF 等常见图片格式
            </div>
          </div>
        </label>
      </div>
    </div>
  )
} 