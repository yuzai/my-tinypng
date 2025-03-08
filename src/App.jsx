import { useState, useEffect, useMemo } from 'react'
import imageCompression from 'browser-image-compression'
import JSZip from 'jszip'
import { saveAs } from 'file-saver'

// 导入组件
import Navbar from './components/Navbar'
import ImageUploader from './components/ImageUploader'
import ImageList from './components/ImageList'
import ImagePreview from './components/ImagePreview'
import CompressionSettings from './components/CompressionSettings'
import AboutModal from './components/AboutModal'
import Features from './components/Features'
import Footer from './components/Footer'

function App() {
  const [files, setFiles] = useState([])
  const [compressedFiles, setCompressedFiles] = useState({})
  const [compressing, setCompressing] = useState({})
  const [progress, setProgress] = useState({})
  const [isDragging, setIsDragging] = useState(false)
  const [downloadingAll, setDownloadingAll] = useState(false)
  const [showAbout, setShowAbout] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [previewIndex, setPreviewIndex] = useState(null)
  const [comparePosition, setComparePosition] = useState(50)
  const [showSettings, setShowSettings] = useState(false)
  
  // 压缩设置
  const [compressionSettings, setCompressionSettings] = useState(() => {
    const savedSettings = localStorage.getItem('compressionSettings')
    return savedSettings ? JSON.parse(savedSettings) : {
      quality: 0.7,
      maxSizeMB: 2,
      maxWidth: 1920,
      maxHeight: 1920,
      keepAspectRatio: true
    }
  })

  // 保存设置到本地存储
  useEffect(() => {
    localStorage.setItem('compressionSettings', JSON.stringify(compressionSettings))
  }, [compressionSettings])

  // 计算压缩统计信息
  const stats = useMemo(() => {
    const total = files.length
    const completed = Object.keys(compressedFiles).length
    const inProgress = Object.values(compressing).filter(Boolean).length
    const pending = total - completed - inProgress
    
    let totalProgress = 0
    if (total > 0) {
      const completedProgress = completed * 100
      const inProgressProgress = Object.keys(progress).reduce((sum, key) => sum + progress[key], 0)
      totalProgress = Math.floor((completedProgress + inProgressProgress) / total)
    }
    
    let totalSaved = 0
    let totalOriginal = 0
    Object.keys(compressedFiles).forEach(index => {
      totalOriginal += compressedFiles[index].originalSize
      totalSaved += (compressedFiles[index].originalSize - compressedFiles[index].compressedSize)
    })
    
    const savedPercentage = totalOriginal > 0 
      ? ((totalSaved / totalOriginal) * 100).toFixed(1) 
      : 0
    
    return {
      total,
      completed,
      inProgress,
      pending,
      totalProgress,
      totalSaved: (totalSaved / (1024 * 1024)).toFixed(2),
      savedPercentage
    }
  }, [files, compressedFiles, compressing, progress])

  useEffect(() => {
    const newFiles = files.filter((_, index) => 
      !compressedFiles[index] && !compressing[index]
    )
    
    newFiles.forEach((file, i) => {
      const index = files.indexOf(file)
      if (index !== -1) {
        compressImage(file, index)
      }
    })
  }, [files])

  useEffect(() => {
    const handlePaste = (e) => {
      e.preventDefault()
      const items = e.clipboardData.items
      const imageItems = Array.from(items).filter(item => item.type.indexOf('image') !== -1)
      
      if (imageItems.length > 0) {
        const newFiles = imageItems.map(item => item.getAsFile())
        setFiles(prev => [...prev, ...newFiles])
      }
    }

    document.addEventListener('paste', handlePaste)
    return () => document.removeEventListener('paste', handlePaste)
  }, [])

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    const droppedFiles = Array.from(e.dataTransfer.files)
    setFiles(prev => [...prev, ...droppedFiles])
  }

  const handleFileSelect = (e) => {
    const selectedFiles = Array.from(e.target.files)
    setFiles(prev => [...prev, ...selectedFiles])
  }

  const compressImage = async (file, index) => {
    try {
      setCompressing(prev => ({ ...prev, [index]: true }))
      setProgress(prev => ({ ...prev, [index]: 0 }))

      const options = {
        maxSizeMB: compressionSettings.maxSizeMB,
        maxWidthOrHeight: Math.max(compressionSettings.maxWidth, compressionSettings.maxHeight),
        useWebWorker: true,
        initialQuality: compressionSettings.quality,
        alwaysKeepResolution: compressionSettings.keepAspectRatio,
        onProgress: (percent) => {
          setProgress(prev => ({ ...prev, [index]: percent }))
        }
      }

      const compressedFile = await imageCompression(file, options)
      
      setCompressedFiles(prev => ({
        ...prev,
        [index]: {
          file: compressedFile,
          url: URL.createObjectURL(compressedFile),
          originalSize: file.size,
          compressedSize: compressedFile.size,
          savings: ((file.size - compressedFile.size) / file.size * 100).toFixed(1)
        }
      }))
    } catch (error) {
      console.error('压缩失败:', error)
    } finally {
      setCompressing(prev => ({ ...prev, [index]: false }))
    }
  }

  const downloadFile = (index) => {
    if (!compressedFiles[index]) return
    const fileName = files[index].name
    const link = document.createElement('a')
    link.href = compressedFiles[index].url
    link.download = fileName
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const downloadAllFiles = async () => {
    try {
      setDownloadingAll(true)
      
      const completedFiles = Object.keys(compressedFiles)
      if (completedFiles.length === 0) {
        alert('没有可下载的压缩文件')
        return
      }
      
      const zip = new JSZip()
      
      const promises = completedFiles.map(async (index) => {
        const file = compressedFiles[index]
        const fileName = files[index].name
        const response = await fetch(file.url)
        const blob = await response.blob()
        zip.file(fileName, blob)
      })
      
      await Promise.all(promises)
      const zipBlob = await zip.generateAsync({ type: 'blob' })
      saveAs(zipBlob, 'compressed-images.zip')
    } catch (error) {
      console.error('下载失败:', error)
      alert('下载失败，请重试')
    } finally {
      setDownloadingAll(false)
    }
  }

  const handleRemoveFile = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index))
    setCompressedFiles(prev => {
      const newState = {...prev}
      delete newState[index]
      return newState
    })
  }

  const handleRecompress = (index) => {
    // 清除之前的压缩结果
    setCompressedFiles(prev => {
      const newState = {...prev}
      delete newState[index]
      return newState
    })
    // 重新压缩
    compressImage(files[index], index)
  }

  const handleClearAll = () => {
    setFiles([])
    setCompressedFiles({})
    setCompressing({})
    setProgress({})
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onShowAbout={() => setShowAbout(true)} />
      
      <main className="flex-grow">
        <div className="bg-[#A8C9A1]">
          <ImageUploader
            isDragging={isDragging}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onFileSelect={handleFileSelect}
          />
          
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <CompressionSettings
                showSettings={showSettings}
                onToggleSettings={(show) => setShowSettings(show)}
                compressionSettings={compressionSettings}
                setCompressionSettings={setCompressionSettings}
              />
            </div>
          </div>
          
          {/* 预留空间给设置面板 */}
          <div className="h-6"></div>
        </div>
        
        {files.length > 0 ? (
          <ImageList
            files={files}
            compressedFiles={compressedFiles}
            compressing={compressing}
            progress={progress}
            stats={stats}
            onPreview={(index) => {
              setPreviewIndex(index)
              setShowPreview(true)
            }}
            onDownload={downloadFile}
            onRemoveFile={handleRemoveFile}
            onRecompress={handleRecompress}
            onClearAll={handleClearAll}
            downloadingAll={downloadingAll}
            onDownloadAll={downloadAllFiles}
          />
        ) : (
          <Features />
        )}
      </main>
      
      <Footer />
      
      <ImagePreview
        showPreview={showPreview}
        setShowPreview={setShowPreview}
        previewIndex={previewIndex}
        files={files}
        compressedFiles={compressedFiles}
        comparePosition={comparePosition}
        setComparePosition={setComparePosition}
      />
      
      <AboutModal
        show={showAbout}
        onClose={() => setShowAbout(false)}
      />
    </div>
  )
}

export default App
