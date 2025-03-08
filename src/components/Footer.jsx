import React from 'react'

export default function Footer() {
  return (
    <footer className="bg-gray-100 py-4">
      <div className="container mx-auto px-4 text-center text-sm text-gray-600">
        <p>
          Made with ❤️ by <a href="https://cursor.sh/" target="_blank" rel="noopener noreferrer" className="text-[#A8C9A1] hover:text-[#96B78F]">Cursor</a>
        </p>
        <p className="mt-1 text-xs text-gray-500">仅供学习使用</p>
        <p className="mt-1 text-xs text-gray-400 md:hidden">建议使用电脑访问以获得最佳体验</p>
      </div>
    </footer>
  )
} 