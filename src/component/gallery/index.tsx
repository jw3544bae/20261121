import { useState, useEffect, useRef } from "react"
import { LazyDiv } from "../lazyDiv"
import { GALLERY_IMAGES } from "../../images"

export const Gallery = () => {
  // 현재 확대해서 보고 있는 사진의 인덱스 (null이면 닫힘)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  // 모바일 터치 스와이프 좌표 및 애니메이션 오프셋 관리
  const touchStartX = useRef<number | null>(null)
  const touchEndX = useRef<number | null>(null)
  const [dragOffset, setDragOffset] = useState(0)

  // 이전 사진으로 이동
  const handlePrev = () => {
    setSelectedIndex((prev) =>
      prev !== null
        ? (prev - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length
        : null,
    )
  }

  // 다음 사진으로 이동
  const handleNext = () => {
    setSelectedIndex((prev) =>
      prev !== null ? (prev + 1) % GALLERY_IMAGES.length : null,
    )
  }

  // 모달이 열려 있을 때 배경 스크롤 방지 및 PC 키보드 좌우 화살표 지원
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return
      if (e.key === "ArrowLeft") handlePrev()
      if (e.key === "ArrowRight") handleNext()
      if (e.key === "Escape") setSelectedIndex(null)
    }

    if (selectedIndex !== null) {
      document.body.classList.add("modal-open")
      window.addEventListener("keydown", handleKeyDown)
    } else {
      document.body.classList.remove("modal-open")
    }

    return () => {
      document.body.classList.remove("modal-open")
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [selectedIndex])

  // 모바일 손가락 터치 시작
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX
    touchEndX.current = null
  }

  // 모바일 손가락 드래그 중 (손가락 따라 사진이 살짝 움직이는 효과)
  const onTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return
    const currentX = e.targetTouches[0].clientX
    touchEndX.current = currentX
    setDragOffset(currentX - touchStartX.current)
  }

  // 모바일 손가락 뗐을 때 (50px 이상 밀었으면 다음/이전 사진으로 전환)
  const onTouchEnd = () => {
    if (touchStartX.current !== null && touchEndX.current !== null) {
      const distance = touchStartX.current - touchEndX.current
      const minSwipeDistance = 50

      if (distance > minSwipeDistance) {
        handleNext() // 왼쪽으로 밀었을 때 -> 다음 사진
      } else if (distance < -minSwipeDistance) {
        handlePrev() // 오른쪽으로 밀었을 때 -> 이전 사진
      }
    }
    touchStartX.current = null
    touchEndX.current = null
    setDragOffset(0)
  }

  return (
    <LazyDiv className="card gallery">
      <h2 className="english">Gallery</h2>
      <div className="break" />

      {/* 1. 사진 전체가 한눈에 주르륵 보이는 그리드 영역 */}
      <div className="gallery-grid">
        {GALLERY_IMAGES.map((img, idx) => (
          <div
            key={idx}
            className="grid-item"
            onClick={() => setSelectedIndex(idx)}
          >
            <img src={img} alt={`웨딩 사진 ${idx + 1}`} draggable={false} />
          </div>
        ))}
      </div>

      {/* 2. 클릭 시 확대되고 손으로 넘기는 전체화면 슬라이드 모달 */}
      {selectedIndex !== null && (
        <div
          className="gallery-lightbox"
          onClick={() => setSelectedIndex(null)}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {/* 상단 현재 페이지 표시 및 닫기(X) 버튼 */}
          <div className="lightbox-header" onClick={(e) => e.stopPropagation()}>
            <span className="lightbox-counter">
              {selectedIndex + 1} / {GALLERY_IMAGES.length}
            </span>
            <button
              className="lightbox-close"
              onClick={() => setSelectedIndex(null)}
              aria-label="닫기"
            >
              ✕
            </button>
          </div>

          {/* 좌측 화살표 버튼 */}
          <button
            className="lightbox-nav prev"
            onClick={(e) => {
              e.stopPropagation()
              handlePrev()
            }}
            aria-label="이전 사진"
          >
            ‹
          </button>

          {/* 확대된 이미지 본문 */}
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

          {/* 우측 화살표 버튼 */}
          <button
            className="lightbox-nav next"
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