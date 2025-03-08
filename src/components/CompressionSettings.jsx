import React, { useRef, useEffect } from 'react'

export default function CompressionSettings({ 
  showSettings, 
  onToggleSettings, 
  compressionSettings, 
  setCompressionSettings 
}) {
  const settingsRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (settingsRef.current && !settingsRef.current.contains(event.target)) {
        onToggleSettings(false)
      }
    }

    if (showSettings) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showSettings, onToggleSettings])

  return (
    <div className="relative" ref={settingsRef}>
      <button
        onClick={() => onToggleSettings(!showSettings)}
        className="w-full bg-white/90 backdrop-blur-sm rounded-lg shadow-sm p-3 md:p-4 flex justify-between items-center hover:bg-white/95 transition-colors"
      >
        <div className="flex items-center">
          <svg className="h-4 w-4 md:h-5 md:w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="text-base md:text-lg font-medium text-gray-900">压缩设置</span>
        </div>
        <svg
          className={`h-4 w-4 md:h-5 md:w-5 text-gray-500 transform transition-transform ${showSettings ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {showSettings && (
        <div className="absolute left-0 right-0 mt-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-4 md:p-6 z-10">
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-600 mb-1 block">压缩质量 ({compressionSettings.quality * 100}%)</label>
              <input
                type="range"
                min="0.1"
                max="1"
                step="0.1"
                value={compressionSettings.quality}
                onChange={(e) => setCompressionSettings(prev => ({
                  ...prev,
                  quality: parseFloat(e.target.value)
                }))}
                className="w-full"
              />
            </div>
            
            <div>
              <label className="text-sm text-gray-600 mb-1 block">最大文件大小 ({compressionSettings.maxSizeMB} MB)</label>
              <input
                type="range"
                min="0.1"
                max="10"
                step="0.1"
                value={compressionSettings.maxSizeMB}
                onChange={(e) => setCompressionSettings(prev => ({
                  ...prev,
                  maxSizeMB: parseFloat(e.target.value)
                }))}
                className="w-full"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-600 mb-1 block">最大宽度 (px)</label>
                <input
                  type="number"
                  value={compressionSettings.maxWidth}
                  onChange={(e) => setCompressionSettings(prev => ({
                    ...prev,
                    maxWidth: parseInt(e.target.value)
                  }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="text-sm text-gray-600 mb-1 block">最大高度 (px)</label>
                <input
                  type="number"
                  value={compressionSettings.maxHeight}
                  onChange={(e) => setCompressionSettings(prev => ({
                    ...prev,
                    maxHeight: parseInt(e.target.value)
                  }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="keepAspectRatio"
                checked={compressionSettings.keepAspectRatio}
                onChange={(e) => setCompressionSettings(prev => ({
                  ...prev,
                  keepAspectRatio: e.target.checked
                }))}
                className="mr-2"
              />
              <label htmlFor="keepAspectRatio" className="text-sm text-gray-600">
                保持宽高比
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 