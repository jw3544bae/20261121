import { useMemo } from "react"
import { Cover } from "./component/cover"
import { Location } from "./component/location"
import "./App.scss"
import { BGEffect } from "./component/bgEffect"
import { Invitation } from "./component/invitation"
import { Calendar } from "./component/calendar"
import { Gallery } from "./component/gallery"
import { Information } from "./component/information"
import { LazyDiv } from "./component/lazyDiv"
import { ShareButton } from "./component/shareButton"
import {
  FriendsInvitationMain,
  FriendsInvitationSub,
  FriendsDonation,
} from "./component/friendsInvitation"

/**
 * 메인 애플리케이션 컴포넌트입니다.
 * URL에 ?to=friends 가 있으면 본식 내용 + 친구 식사 초대장을, 없으면 본식 청첩장을 보여줍니다.
 */
function App() {
  // 브라우저 주소창의 ?to=friends 쿼리스트링 확인
  const isFriendsPage = useMemo(() => {
    const params = new URLSearchParams(window.location.search)
    return params.get("to") === "friends"
  }, [])

  return (
    <div className="background">
      {/* 눈 내리는 배경 효과 */}
      <BGEffect />
      
      <div className="card-view">
        {/* 공통 상단 영역: 커버, 본식 안내, 달력, 웨딩 촬영 사진 갤러리 */}
        <LazyDiv className="card-group">
          <Cover />
          <Invitation />
        </LazyDiv>

        <LazyDiv className="card-group">
          <Calendar />
          <Gallery />
        </LazyDiv>

        {isFriendsPage ? (
          /* 1. 친구 전용 모임 안내 및 계좌 안내 (?to=friends 로 접속 시) */
          <>
            {/* 카드 그룹 1: 초대 편지 & 룸/참석 안내 (2단 구성) */}
            <LazyDiv className="card-group">
              <FriendsInvitationMain />
              <FriendsInvitationSub />
            </LazyDiv>

            {/* 카드 그룹 2: 마음 전하기 (단독 카드) */}
            <LazyDiv className="card-group">
              <FriendsDonation />
            </LazyDiv>

            <ShareButton />
          </>
        ) : (
          /* 2. 일반 본식 청첩장 전체 화면 */
          <>
            {/* 카드 그룹 3: 왼쪽 Location (지도+교통+식사 통합) & 오른쪽 Information (마음 전하기 & 참석의사) */}
            <LazyDiv className="card-group">
              <Location />
              <Information />
            </LazyDiv>

            <ShareButton />
          </>
        )}
      </div>
    </div>
  )
}

export default App
