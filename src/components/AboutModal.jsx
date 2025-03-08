import React from 'react'

export default function AboutModal({ show, onClose }) {
  if (!show) return null

  return (
    <div className="fixed inset-0 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white/90 backdrop-blur-sm rounded-lg max-w-2xl w-full p-6 relative shadow-xl">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 cursor-pointer"
        >
          <svg className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
        
        <h2 className="text-2xl font-bold mb-4">关于 TinyPNG Clone</h2>
        
        <div className="prose max-w-none">
          <p className="mb-4">
            TinyPNG Clone 是一个开源的图片压缩工具，专注于提供简单、高效的图片压缩服务。我们的目标是帮助用户轻松压缩图片，同时保持良好的图片质量。
          </p>
          
          <h3 className="text-xl font-bold mb-3">主要特点</h3>
          <ul className="list-disc pl-6 mb-4">
            <li>完全免费：所有功能完全免费使用</li>
            <li>本地处理：所有压缩都在浏览器中完成，保护您的隐私</li>
            <li>批量处理：支持多张图片同时压缩</li>
            <li>高压缩率：最高可达70%的压缩率</li>
            <li>保持质量：智能压缩算法确保图片质量</li>
          </ul>
          
          <h3 className="text-xl font-bold mb-3">技术说明</h3>
          <p className="mb-4">
            本项目使用 React 和 Tailwind CSS 构建，采用 browser-image-compression 库进行图片压缩。所有操作都在浏览器端完成，无需服务器支持，确保您的图片安全。
          </p>
          
          <p className="text-sm text-gray-500 mt-6">
            注意：这是一个学习项目，仅用于演示目的。原始 TinyPNG 是 Voormedia 的商标。
          </p>
        </div>
      </div>
    </div>
  )
} 