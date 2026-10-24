import { useState, useEffect, useRef, useCallback } from "react"
import { LazyDiv } from "../lazyDiv"
import { GALLERY_IMAGES } from "../../images"

export const Gallery = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  // 모바일 스와이프 및 클릭(탭) 감지용 좌표
  const touchStartX = useRef<number | null>(null)
  const touchStartY = useRef<number | null>(null)
  const touchEndX = useRef<number | null>(null)
  const [dragOffset, setDragOffset] = useState(0)

  // 이전/다음 사진 이동
  const handlePrev = useCallback(() => {
    setSelectedIndex((prev) =>
      prev !== null
        ? (prev - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length
        : null,
    )
  }, [])

  const handleNext = useCallback(() => {
    setSelectedIndex((prev) =>
      prev !== null ? (prev + 1) % GALLERY_IMAGES.length : null,
    )
  }, [])

  // 키보드 방향키 및 ESC 지원 + 모달 오픈 시 배경 스크롤 락
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return
      if (e.key === "ArrowLeft") handlePrev()
      if (e.key === "ArrowRight") handleNext()
      if (e.key === "Escape") setSelectedIndex(null)
    }

    if (selectedIndex !== null) {
      document.body.style.overflow = "hidden"
      window.addEventListener("keydown", handleKeyDown)
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [selectedIndex, handlePrev, handleNext])

  // --- 확대 모달 내부 스와이프 제어 ---
  const onModalTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX
    touchStartY.current = e.targetTouches[0].clientY
    touchEndX.current = null
  }

  const onModalTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return
    const currentX = e.targetTouches[0].clientX
    touchEndX.current = currentX
    setDragOffset(currentX - touchStartX.current)
  }

  const onModalTouchEnd = () => {
    if (touchStartX.current !== null && touchEndX.current !== null) {
      const distance = touchStartX.current - touchEndX.current
      if (distance > 50) {
        handleNext()
      } else if (distance < -50) {
        handlePrev()
      }
    }
    touchStartX.current = null
    touchStartY.current = null
    touchEndX.current = null
    setDragOffset(0)
  }

  // --- 썸네일 그리드 클릭(탭) 확실하게 열기 ---
  const handleThumbnailClick = (e: React.MouseEvent, idx: number) => {
    e.stopPropagation()
    setSelectedIndex(idx)
  }

  return (
    <LazyDiv className="card gallery">
      <h2 className="english">Gallery</h2>
      <div className="break" />

      {/* 썸네일 바둑판 그리드 */}
      <div className="gallery-grid">
        {GALLERY_IMAGES.map((img, idx) => (
          <div
            key={idx}
            className="grid-item"
            role="button"
            tabIndex={0}
            onClick={(e) => handleThumbnailClick(e, idx)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") setSelectedIndex(idx)
            }}
          >
            <img
              src={img}
              alt={`웨딩 사진 ${idx + 1}`}
              loading="lazy"
              draggable={false}
            />
          </div>
        ))}
      </div>

      {/* 전체화면 확대 모달 */}
      {selectedIndex !== null && (
        <div
          className="gallery-lightbox"
          onClick={() => setSelectedIndex(null)}
          onTouchStart={onModalTouchStart}
          onTouchMove={onModalTouchMove}
          onTouchEnd={onModalTouchEnd}
        >
          {/* 상단 인덱스 카운터 및 닫기 버튼 */}
          <div className="lightbox-header" onClick={(e) => e.stopPropagation()}>
            <span className="lightbox-counter">
              {selectedIndex + 1} / {GALLERY_IMAGES.length}
            </span>
            <button
              className="lightbox-close"
              type="button"
              onClick={() => setSelectedIndex(null)}
              aria-label="닫기"
            >
              ✕
            </button>
          </div>

          {/* 좌측 이전 버튼 */}
          <button
            className="lightbox-nav prev"
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              handlePrev()
            }}
            aria-label="이전 사진"
          >
            ‹
          </button>

          {/* 확대 이미지 본문 */}
          <div
            className="lightbox-content"
            onClick={(e) => e.stopPropagation()}
            style={{
              transform: `translateX(${dragOffset}px)`,
              transition: dragOffset === 0 ? "transform 0.25s ease-out" : "none",
            }}
          >
            <img
              src={GALLERY_IMAGES[selectedIndex]}
              alt={`확대된 웨딩 사진 ${selectedIndex + 1}`}
              draggable={false}
            />
          </div>

          {/* 우측 다음 버튼 */}
          <button
            className="lightbox-nav next"
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              handleNext()
            }}
            aria-label="다음 사진"
          >
            ›
          </button>
        </div>
      )}
    </LazyDiv>
  )
}