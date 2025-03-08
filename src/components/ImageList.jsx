import React from 'react'

export default function ImageList({
  files,
  compressedFiles,
  compressing,
  progress,
  stats,
  onPreview,
  onDownload,
  onRemoveFile,
  onRecompress,
  onClearAll,
  downloadingAll,
  onDownloadAll
}) {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-6">
        {/* 标题和统计信息 */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3 min-h-[60px] transition-all duration-300">
          <div>
            <h2 className="text-lg md:text-xl font-bold text-gray-800">您的图片 ({stats.completed}/{stats.total})</h2>
            <p className="text-xs text-gray-600 mt-1">
              {stats.completed > 0 ? (
                <>已节省 {stats.totalSaved} MB ({stats.savedPercentage}%)</>
              ) : (
                <>&nbsp;</>
              )}
            </p>
          </div>
          <div className="flex flex-wrap gap-2 mt-3 md:mt-0">
            {stats.completed > 0 && (
              <button
                className={`bg-[#A8C9A1] text-white px-3 py-1.5 rounded text-sm font-medium hover:bg-[#96B78F] transition-colors flex items-center cursor-pointer ${downloadingAll ? 'opacity-75 cursor-not-allowed' : ''}`}
                onClick={onDownloadAll}
                disabled={downloadingAll}
              >
                {downloadingAll ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-1.5 h-3.5 w-3.5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    打包中...
                  </>
                ) : (
                  <>
                    <svg className="mr-1.5 h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    下载全部 ({stats.completed})
                  </>
                )}
              </button>
            )}
            <button 
              className="text-[#A8C9A1] hover:text-[#96B78F] text-sm font-medium cursor-pointer"
              onClick={onClearAll}
            >
              清空全部
            </button>
          </div>
        </div>
        
        {/* 总体进度条 - 限制最大宽度 */}
        {stats.total > 0 && (
          <div className="w-full max-w-full overflow-hidden bg-gray-200 rounded-full h-2 mb-1.5">
            <div 
              className="bg-[#A8C9A1] h-2 rounded-full transition-all duration-300" 
              style={{ width: `${Math.min(stats.totalProgress, 100)}%` }}
            ></div>
          </div>
        )}
        
        {/* 进度状态文本 */}
        <div className="text-xs text-gray-500">
          {stats.inProgress > 0 && `${stats.inProgress} 张图片正在压缩中 • `}
          {stats.pending > 0 && `${stats.pending} 张图片等待处理 • `}
          {stats.completed > 0 && `${stats.completed} 张图片已完成`}
        </div>
      </div>
      
      <div className="space-y-4">
        {[...files].reverse().map((file, originalIndex) => {
          // 计算原始索引，因为我们反转了数组
          const index = files.length - 1 - originalIndex;
          
          return (
            <div 
              key={index} 
              className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200"
            >
              <div className="flex flex-col md:flex-row">
                {/* 图片预览 */}
                <div className="w-full md:w-1/5 p-3 flex items-center justify-center bg-gray-50">
                  <img
                    src={compressedFiles[index]?.url || URL.createObjectURL(file)}
                    alt={file.name}
                    className="max-h-32 max-w-full object-contain"
                  />
                </div>
                
                {/* 图片信息 */}
                <div className="w-full md:w-4/5 p-4 flex flex-col">
                  <div className="flex flex-col md:flex-row md:items-start justify-between mb-2">
                    <div className="mb-2 md:mb-0">
                      <h3 className="text-base font-medium text-gray-900 mb-1 truncate max-w-md">
                        {file.name}
                      </h3>
                      <p className="text-xs text-gray-500">
                        原始大小: {(file.size / 1024).toFixed(1)} KB
                        {compressedFiles[index] && (
                          <>
                            <span className="mx-2">→</span>
                            压缩后: {(compressedFiles[index].compressedSize / 1024).toFixed(1)} KB
                            <span className="ml-2 text-green-600 font-medium">
                              (节省 {compressedFiles[index].savings}%)
                            </span>
                          </>
                        )}
                      </p>
                    </div>
                    <button 
                      className="text-gray-400 hover:text-gray-600 cursor-pointer"
                      onClick={() => onRemoveFile(index)}
                    >
                      <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                  
                  {/* 压缩状态 - 进度条或结果 */}
                  <div className="mt-2 min-h-[38px]">
                    {compressing[index] ? (
                      <div className="flex flex-col justify-center h-[38px]">
                        <div className="w-full max-w-full overflow-hidden bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-[#A8C9A1] h-2 rounded-full transition-all duration-300" 
                            style={{ width: `${Math.min(progress[index] || 0, 100)}%` }}
                          ></div>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">压缩中... {Math.min(progress[index] || 0, 100)}%</p>
                      </div>
                    ) : compressedFiles[index] ? (
                      <div className="flex flex-wrap gap-2">
                        <button 
                          className="bg-[#A8C9A1] text-white px-3 py-1.5 rounded text-sm font-medium hover:bg-[#96B78F] transition-colors flex items-center cursor-pointer"
                          onClick={() => onDownload(index)}
                        >
                          <svg className="mr-1.5 h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                          下载
                        </button>
                        <button 
                          className="border border-[#A8C9A1] text-[#A8C9A1] px-3 py-1.5 rounded text-sm font-medium hover:bg-gray-50 transition-colors cursor-pointer"
                          onClick={() => onPreview(index)}
                        >
                          <svg className="mr-1.5 h-3.5 w-3.5 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          预览
                        </button>
                        <button 
                          className="border border-[#A8C9A1] text-[#A8C9A1] px-3 py-1.5 rounded text-sm font-medium hover:bg-gray-50 transition-colors cursor-pointer"
                          onClick={() => onRecompress(index)}
                        >
                          <svg className="mr-1.5 h-3.5 w-3.5 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                          </svg>
                          重压
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-col justify-center h-[38px]">
                        <div className="w-full max-w-full overflow-hidden bg-gray-200 rounded-full h-2">
                          <div className="bg-gray-300 h-2 rounded-full w-full"></div>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">准备压缩...</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
} 