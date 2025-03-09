import React from 'react'

export default function ImagePreview({ 
  showPreview, 
  setShowPreview, 
  previewIndex, 
  files, 
  compressedFiles,
  comparePosition,
  setComparePosition 
}) {
  if (!showPreview || previewIndex === null) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 md:p-4 bg-black/30 backdrop-blur-sm">
      <div className="bg-white/95 backdrop-blur-sm rounded-lg max-w-6xl w-full max-h-[95vh] md:max-h-[90vh] overflow-hidden flex flex-col">
        <div className="p-3 md:p-4 border-b border-gray-200 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <h3 className="text-base md:text-lg font-medium">图片预览</h3>
            <div className="hidden md:block text-sm text-gray-500">
              拖动分隔线查看对比效果
            </div>
            <div className="block md:hidden text-xs text-gray-500">
              左右滑动查看对比
            </div>
          </div>
          <button 
            onClick={() => setShowPreview(false)}
            className="text-gray-400 hover:text-gray-600 p-1"
          >
            <svg className="h-5 w-5 md:h-6 md:w-6" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        
        <div className="flex-1 overflow-x-hidden p-2 md:p-4">
          <div className="relative w-full h-[50vh] md:h-[70vh] bg-[#f0f0f0] rounded-lg select-none touch-pan-x">
            <div className="absolute inset-0 flex items-center justify-center">
              {/* 原始图片容器 */}
              <div className="relative w-full h-full">
                <img
                  src={compressedFiles[previewIndex]?.url || URL.createObjectURL(files[previewIndex])}
                  alt="压缩后"
                  className="absolute inset-0 m-auto max-w-full max-h-full object-contain pointer-events-none"
                />
              </div>
              
              {/* 压缩前的图片容器 */}
              {compressedFiles[previewIndex] && (
                <div 
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: `${comparePosition}%` }}
                >
                  <div className="relative w-full h-full" style={{ width: `${100 / (comparePosition/100)}%` }}>
                    <img
                      src={URL.createObjectURL(files[previewIndex])}
                      alt="原图"
                      className="absolute inset-0 m-auto max-w-full max-h-full object-contain pointer-events-none"
                    />
                  </div>
                </div>
              )}

              {/* 分隔线 - 移到图片容器外部 */}
              {compressedFiles[previewIndex] && (
                <div 
                  className="absolute top-0 bottom-0 w-1 bg-white/60 shadow-lg cursor-ew-resize flex items-center justify-center z-10"
                  style={{ left: `${comparePosition}%` }}
                  onMouseDown={(e) => {
                    const container = e.currentTarget.closest('.rounded-lg')
                    const handleMouseMove = (moveEvent) => {
                      const rect = container.getBoundingClientRect()
                      const pos = ((moveEvent.clientX - rect.left) / rect.width) * 100
                      setComparePosition(Math.max(0, Math.min(100, pos)))
                    }
                    const handleMouseUp = () => {
                      document.removeEventListener('mousemove', handleMouseMove)
                      document.removeEventListener('mouseup', handleMouseUp)
                    }
                    document.addEventListener('mousemove', handleMouseMove)
                    document.addEventListener('mouseup', handleMouseUp)
                  }}
                  onTouchStart={(e) => {
                    e.preventDefault() // 防止触摸时页面滚动
                    const container = e.currentTarget.closest('.rounded-lg')
                    const handleTouchMove = (moveEvent) => {
                      moveEvent.preventDefault()
                      const rect = container.getBoundingClientRect()
                      const pos = ((moveEvent.touches[0].clientX - rect.left) / rect.width) * 100
                      setComparePosition(Math.max(0, Math.min(100, pos)))
                    }
                    const handleTouchEnd = () => {
                      document.removeEventListener('touchmove', handleTouchMove)
                      document.removeEventListener('touchend', handleTouchEnd)
                    }
                    document.addEventListener('touchmove', handleTouchMove, { passive: false })
                    document.addEventListener('touchend', handleTouchEnd)
                  }}
                >
                  {/* 分隔线手柄 */}
                  <div className="absolute w-1 h-12 bg-white/60 shadow-lg rounded-full"></div>
                  
                  {/* 分隔线文案容器 */}
                  <div className="absolute bottom-4 -translate-y-0 flex items-center space-x-2 pointer-events-none z-20">
                    {/* 左侧文案 */}
                    <div className="transform -translate-x-[calc(100%+4px)] bg-black/30 backdrop-blur-sm text-white px-2 py-1 rounded text-sm font-medium whitespace-nowrap flex items-center">
                      <svg className="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      压缩前
                    </div>
                    
                    {/* 右侧文案 */}
                    <div className="transform translate-x-[calc(100%+4px)] bg-black/30 backdrop-blur-sm text-white px-2 py-1 rounded text-sm font-medium whitespace-nowrap flex items-center">
                      压缩后
                      <svg className="h-3.5 w-3.5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* 对比标签 */}
            <div className="absolute top-4 left-4 flex flex-col md:flex-row md:space-x-4 space-y-2 md:space-y-0">
              <div className="bg-black/40 backdrop-blur-sm text-white px-3 md:px-4 py-1.5 md:py-2 rounded-lg text-sm font-medium">
                <span>原图</span>
                <span className="ml-2">{(files[previewIndex].size / 1024).toFixed(1)} KB</span>
              </div>
              {compressedFiles[previewIndex] && (
                <div className="bg-black/40 backdrop-blur-sm text-white px-3 md:px-4 py-1.5 md:py-2 rounded-lg text-sm font-medium">
                  <span>压缩后</span>
                  <span className="ml-2">{(compressedFiles[previewIndex].compressedSize / 1024).toFixed(1)} KB</span>
                  <span className="ml-2">(-{compressedFiles[previewIndex].savings}%)</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 