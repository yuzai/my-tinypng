import React from 'react'

export default function Features() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold mb-4">为什么选择我们的服务？</h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          我们的智能有损压缩算法可以显著减小 PNG 文件的大小，同时保持视觉质量。
        </p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8">
        <div className="text-center">
          <div className="bg-[#F8F9FA] rounded-full p-6 inline-block mb-4">
            <svg className="h-12 w-12 text-[#A8C9A1]" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.5 17a4.5 4.5 0 01-1.44-8.765 4.5 4.5 0 018.302-3.046 3.5 3.5 0 014.504 4.272A4 4 0 0115 17H5.5zm3.75-2.75a.75.75 0 001.5 0V9.66l1.95 2.1a.75.75 0 101.1-1.02l-3.25-3.5a.75.75 0 00-1.1 0l-3.25 3.5a.75.75 0 101.1 1.02l1.95-2.1v4.59z" clipRule="evenodd" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-2">简单易用</h3>
          <p className="text-gray-600">
            只需拖放您的图片，我们会自动为您处理压缩过程。
          </p>
        </div>
        
        <div className="text-center">
          <div className="bg-[#F8F9FA] rounded-full p-6 inline-block mb-4">
            <svg className="h-12 w-12 text-[#A8C9A1]" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3.5 2A1.5 1.5 0 002 3.5V15a3 3 0 106 0V3.5A1.5 1.5 0 006.5 2h-3zm11.753 6.99L9.5 14.743V6.257l5.753 2.733a.75.75 0 010 1.334z" clipRule="evenodd" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-2">高效压缩</h3>
          <p className="text-gray-600">
            我们的算法可以减小高达 70% 的文件大小，加快您的网站加载速度。
          </p>
        </div>
        
        <div className="text-center">
          <div className="bg-[#F8F9FA] rounded-full p-6 inline-block mb-4">
            <svg className="h-12 w-12 text-[#A8C9A1]" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-2">安全可靠</h3>
          <p className="text-gray-600">
            所有压缩都在您的浏览器中完成，图片不会上传到服务器，确保您的隐私安全。
          </p>
        </div>
      </div>
    </div>
  )
} 