import { useEffect, useRef } from "react"

// 눈송이의 이동 및 흔들림 속도 설정
const Y_SPEED = 0.5
const Y_SPEED_VARIANCE = 0.7
const SWING_SPEED_VARIANCE = 0.02

/**
 * 개별 눈송이(함박눈 & 육각 눈꽃 결정) 객체를 관리하는 클래스입니다.
 */
class Snowflake {
  x: number
  y: number
  radius: number = 0
  opacity: number = 0
  ySpeed: number = 0
  swing: number = 0
  swingSpeed: number = 0
  swingRange: number = 0
  angle: number = 0
  spinSpeed: number = 0
  isCrystal: boolean = false // true면 육각 눈꽃 모양, false면 포근한 동그란 함박눈

  constructor(
    private canvas: HTMLCanvasElement,
    private ctx: CanvasRenderingContext2D,
  ) {
    this.x = Math.random() * canvas.width
    this.y = Math.random() * canvas.height * 2 - canvas.height
    this.initialize()
  }

  /**
   * 눈송이의 크기, 모양, 투명도, 속도 등을 무작위로 초기화합니다.
   */
  initialize() {
    // 25% 확률로 육각 눈꽃 결정, 75% 확률로 포근한 함박눈 생성
    this.isCrystal = Math.random() < 0.25

    if (this.isCrystal) {
      this.radius = 5 + Math.random() * 5 // 육각 눈꽃 크기 (5~10px)
      this.opacity = 0.55 + Math.random() * 0.35
    } else {
      this.radius = 2 + Math.random() * 4.5 // 동그란 눈송이 크기 (2~6.5px)
      this.opacity = 0.4 + Math.random() * 0.5
    }

    this.ySpeed = Y_SPEED + Math.random() * Y_SPEED_VARIANCE
    this.swing = Math.random() * Math.PI * 2
    this.swingSpeed = 0.01 + Math.random() * SWING_SPEED_VARIANCE
    this.swingRange = 0.3 + Math.random() * 0.5 // 좌우로 살랑거리는 폭

    this.angle = Math.random() * Math.PI * 2
    this.spinSpeed = (Math.random() - 0.5) * 0.015 // 눈꽃 회전 속도
  }

  /**
   * 육각형 눈꽃 결정(❄️)을 캔버스에 직접 그립니다 (이미지 파일 불필요)
   */
  drawCrystal() {
    const ctx = this.ctx
    ctx.save()
    ctx.translate(this.x, this.y)
    ctx.rotate(this.angle)

    ctx.strokeStyle = `rgba(255, 255, 255, ${this.opacity})`
    ctx.lineWidth = 1.3
    ctx.lineCap = "round"

    // 밝은 배경에서도 눈꽃이 잘 보이도록 은은한 그림자 효과
    ctx.shadowColor = "rgba(100, 110, 125, 0.35)"
    ctx.shadowBlur = 3

    for (let i = 0; i < 6; i++) {
      ctx.beginPath()
      ctx.moveTo(0, 0)
      ctx.lineTo(0, -this.radius)

      // 눈꽃 가지 디테일 추가
      const branchPos = this.radius * 0.55
      const branchLen = this.radius * 0.35
      ctx.moveTo(0, -branchPos)
      ctx.lineTo(-branchLen * 0.7, -(branchPos + branchLen * 0.7))
      ctx.moveTo(0, -branchPos)
      ctx.lineTo(branchLen * 0.7, -(branchPos + branchLen * 0.7))

      ctx.stroke()
      ctx.rotate(Math.PI / 3)
    }
    ctx.restore()
  }

  /**
   * 포근하게 번지는 함박눈(동그란 눈송이)을 그립니다.
   */
  drawSoftFlake() {
    const ctx = this.ctx
    ctx.save()
    ctx.beginPath()

    // 중심부는 진한 흰색, 가장자리는 부드럽게 퍼지는 그라데이션 효과
    const grad = ctx.createRadialGradient(
      this.x,
      this.y,
      0,
      this.x,
      this.y,
      this.radius,
    )
    grad.addColorStop(0, `rgba(255, 255, 255, ${this.opacity})`)
    grad.addColorStop(0.6, `rgba(255, 255, 255, ${this.opacity * 0.8})`)
    grad.addColorStop(1, "rgba(255, 255, 255, 0)")

    ctx.shadowColor = "rgba(100, 110, 125, 0.25)"
    ctx.shadowBlur = 2

    ctx.fillStyle = grad
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
    ctx.fill()
    ctx.restore()
  }

  /**
   * 화면에 눈송이를 그립니다.
   */
  draw() {
    // 화면 아래나 좌우 밖으로 나갔을 경우 위에서 다시 내리도록 재배치
    if (
      this.y > this.canvas.height + 15 ||
      this.x > this.canvas.width + 15 ||
      this.x < -15
    ) {
      this.initialize()
      this.x = Math.random() * this.canvas.width
      this.y = -10
    }

    if (this.isCrystal) {
      this.drawCrystal()
    } else {
      this.drawSoftFlake()
    }
  }

  /**
   * 눈송이의 위치를 업데이트하고 다시 그립니다.
   */
  animate() {
    this.swing += this.swingSpeed
    this.x += Math.sin(this.swing) * this.swingRange // 바람에 좌우로 흔들리며 낙하
    this.y += this.ySpeed
    this.angle += this.spinSpeed
    this.draw()
  }
}

/**
 * 배경에 눈이 내리는 애니메이션 효과를 주는 컴포넌트입니다.
 */
export const BGEffect = () => {
  const ref = useRef<HTMLCanvasElement>({} as HTMLCanvasElement)
  const flakesRef = useRef<Snowflake[]>([])
  const resizeTimeoutRef = useRef(0)
  const animationFrameIdRef = useRef(0)

  useEffect(() => {
    const canvas = ref.current
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D

    // 화면 크기에 따른 적절한 눈송이 개수 계산 (꽃잎보다 조금 더 풍성하게)
    const getFlakeNum = () => {
      return Math.floor((window.innerWidth * window.innerHeight) / 18000)
    }

    const initializeFlakes = () => {
      const count = getFlakeNum()
      const flakes = []
      for (let i = 0; i < count; i++) {
        flakes.push(new Snowflake(canvas, ctx))
      }
      flakesRef.current = flakes
    }

    initializeFlakes()

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      flakesRef.current.forEach((flake) => flake.animate())
      animationFrameIdRef.current = requestAnimationFrame(render)
    }

    render()

    const onResize = () => {
      clearTimeout(resizeTimeoutRef.current)
      resizeTimeoutRef.current = window.setTimeout(() => {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
        const newFlakeNum = getFlakeNum()
        if (newFlakeNum > flakesRef.current.length) {
          for (let i = flakesRef.current.length; i < newFlakeNum; i++) {
            flakesRef.current.push(new Snowflake(canvas, ctx))
          }
        } else if (newFlakeNum < flakesRef.current.length) {
          flakesRef.current.splice(newFlakeNum)
        }
      }, 100)
    }

    window.addEventListener("resize", onResize)

    return () => {
      window.removeEventListener("resize", onResize)
      cancelAnimationFrame(animationFrameIdRef.current)
    }
  }, [])

  return (
    <div className="bg-effect">
      <canvas ref={ref} />
    </div>
  )
}