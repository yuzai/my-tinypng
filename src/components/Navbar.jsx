import React from 'react'

export default function Navbar({ onShowAbout }) {
  return (
    <nav className="bg-[#3D3D3D] text-white">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          {/* TinyPNG Logo */}
          <div className="flex items-center mr-8">
            <svg className="w-8 h-8 mr-2" viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="16" r="15" fill="white" stroke="#3D3D3D" strokeWidth="2"/>
              <circle cx="11" cy="13" r="2.5" fill="black"/>
              <circle cx="21" cy="13" r="2.5" fill="black"/>
              <path d="M11 20a5 5 0 0 0 10 0" stroke="black" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <span className="font-bold text-xl">TinyPNG</span>
          </div>
          
          {/* 导航链接 */}
          <div className="hidden md:flex space-x-6">
            <button 
              onClick={onShowAbout}
              className="hover:text-[#A8C9A1] transition-colors cursor-pointer"
            >
              关于
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
} 