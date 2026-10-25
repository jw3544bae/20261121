import { Map } from "./map"
import CarIcon from "../../icons/car-icon.svg?react"
import BusIcon from "../../icons/bus-icon.svg?react"
import { LazyDiv } from "../lazyDiv"
import { LOCATION, LOCATION_ADDRESS } from "../../const"

/**
 * 오시는 길 정보를 표시하는 컴포넌트입니다.
 * 지도, 주소, 대중교통, 자가용 안내를 하나의 단일 카드(card)로 통합하여 표시합니다.
 *
 * @returns {JSX.Element} 오시는 길 통합 카드
 */
export const Location = () => {
  return (
    <LazyDiv
      className="card location"
      style={{
        padding: "1.5rem 1.2rem",
        textAlign: "left",
      }}
    >
      <h2 className="english" style={{ textAlign: "center", marginBottom: "1rem" }}>Location</h2>
      
      {/* 주소 영역 */}
      <div className="addr" style={{ textAlign: "center", marginBottom: "1.2rem" }}>
        <div style={{ fontWeight: "bold", fontSize: "1.05rem" }}>{LOCATION}</div>
        <div className="detail" style={{ fontSize: "0.85rem", opacity: 0.8, marginTop: "0.2rem" }}>{LOCATION_ADDRESS}</div>
      </div>

      {/* 지도 영역 */}
      <div style={{ width: "100%", height: "18rem", marginBottom: "1.5rem" }}>
        <Map />
      </div>

      <hr style={{ border: "none", borderTop: "1px dashed var(--light-grey-color)", margin: "1.5rem 0" }} />

      {/* 대중교통 안내 */}
      <div className="location-info" style={{ marginBottom: "1.2rem" }}>
        <div className="transportation-icon-wrapper">
          <BusIcon className="transportation-icon" style={{ width: "1.2rem", height: "1.2rem" }} />
        </div>
        <div className="heading" style={{ fontSize: "0.95rem" }}>대중교통</div>
        <div />
        <div className="content" style={{ fontSize: "0.85rem", lineHeight: "1.6" }}>
          * 지하철 이용 시
          <br />
          지하철 3호선 <b>수성못역 1번출구로</b> 나와 속초식당 쪽으로 넘어오신 후 수성못 방향으로 걸어오시어 더파크 수성못에서 왼쪽 회전 후 도보 2분
          <br /><br />
          * 버스 이용 시
          <br />
          - 간선(파랑): 204, 403, 814
          <br />
          - 지선(초록): 수성5, 수성6
        </div>
      </div>

      {/* 자가용 안내 */}
      <div className="location-info" style={{ marginBottom: "0.5rem" }}>
        <div className="transportation-icon-wrapper">
          <CarIcon className="transportation-icon" style={{ width: "1.2rem", height: "1.2rem" }} />
        </div>
        <div className="heading" style={{ fontSize: "0.95rem" }}>자가용</div>
        <div />
        <div className="content" style={{ fontSize: "0.85rem", lineHeight: "1.6" }}>
          네이버 지도, 카카오 네비, 티맵 등 이용
          <br />
          <b>라벨라쿠치나</b> 검색 (주차 요금은 무료입니다.)
        </div>
      </div>
    </LazyDiv>
  )
}
