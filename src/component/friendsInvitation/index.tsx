import { useState } from "react"
import { FRIEND_EVENT, BRIDE_INFO, GROOM_INFO } from "../../const"
import { Button } from "../button"
import { Modal } from "../modal"
import { LazyDiv } from "../lazyDiv"

/**
 * 1. 초대 인사말 및 일시/장소 카드
 */
export const FriendsInvitationMain = () => {
  return (
    <LazyDiv className="card invitation">
      <h2 className="english">Dinner Invitation</h2>
      <div className="break" />

      <div className="content" style={{ lineHeight: "1.8", fontSize: "0.8rem", textAlign: "left" }}>
        소중한 친구들에게,
        <br /><br />
        양가 가족분들만 모시고 조용히 가족식을 올리게 되어,<br/>늘 곁에서 힘이 되어준 소중한 친구들을 모시고<br/> 따뜻한 밥 한 끼 대접하고자 자리를 마련했습니다.
        <br /><br />
        <strong>"오랜만에 친구들끼리 모여 연말 송년회 한다"</strong> 생각하시고<br/> 가벼운 마음으로 편안하게 와주세요!
      </div>

      <div className="break" />
      <hr style={{ border: "none", borderTop: "1px dashed var(--light-grey-color)", margin: "1.2rem 0" }} />

      {/* 일시 및 장소 */}
      <div style={{ textAlign: "left", lineHeight: "1.8", fontSize: "0.95rem" }}>
        <div><strong>일시:</strong> {FRIEND_EVENT.DATE}</div>
        <div><strong>장소:</strong> {FRIEND_EVENT.LOCATION}</div>
        <div style={{ opacity: 0.8, fontSize: "0.85rem" }}>{FRIEND_EVENT.ADDRESS}</div>
      </div>
    </LazyDiv>
  )
}

/**
 * 2. 룸 배정 및 참석 변동 안내 카드
 */
export const FriendsInvitationSub = () => {
  return (
    <LazyDiv className="card invitation">
      <h2 className="english">Room & Attendance</h2>
      <div className="break" />

      {/* 룸별 그룹(A, B, C, D) 지정 및 좌석 배치도 영역 */}
      <div style={{ textAlign: "left" }}>
        <div style={{ fontWeight: "bold", fontSize: "1rem", marginBottom: "0.4rem" }}>
          📍 룸 및 좌석 배정 안내
        </div>
        <div style={{ fontSize: "0.85rem", opacity: 0.75, marginBottom: "0.8rem" }}>
          방문 시 본인의 그룹에 해당하는 룸으로 입장해 주세요.
        </div>

        {/* 그룹별 룸 안내 박스 */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.6rem",
            backgroundColor: "var(--alt-bg-color)",
            padding: "0.9rem",
            borderRadius: "0.5rem",
            marginBottom: "1rem",
            fontSize: "0.9rem",
          }}
        >
          {/* 1번 룸 배정 그룹 */}
          <div style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem" }}>
            <span
              style={{
                backgroundColor: "var(--theme-color)",
                color: "#ffffff",
                padding: "0.15rem 0.45rem",
                borderRadius: "0.25rem",
                fontSize: "0.8rem",
                whiteSpace: "nowrap",
              }}
            >
              1번 룸
            </span>
            <div>
              <strong>그룹 A, 그룹 B</strong>
              <div style={{ fontSize: "0.8rem", opacity: 0.7, marginTop: "0.1rem" }}>
                (예: 고등학교 친구들, 대학 동기 모임 등)
              </div>
            </div>
          </div>

          {/* 2번 룸 배정 그룹 */}
          <div style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem" }}>
            <span
              style={{
                backgroundColor: "var(--theme-color)",
                color: "#ffffff",
                padding: "0.15rem 0.45rem",
                borderRadius: "0.25rem",
                fontSize: "0.8rem",
                whiteSpace: "nowrap",
              }}
            >
              2번 룸
            </span>
            <div>
              <strong>그룹 C, 그룹 D</strong>
              <div style={{ fontSize: "0.8rem", opacity: 0.7, marginTop: "0.1rem" }}>
                (예: 직장 동료, 동호회/동네 친구들 등)
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="break" />

      {/* 참석 변동 및 동행인 사전 안내 섹션 */}
      <div
        style={{
          backgroundColor: "var(--light-color)",
          border: "1px solid var(--theme-color)",
          borderRadius: "0.6rem",
          padding: "1rem",
          textAlign: "left",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.4rem",
            fontWeight: "bold",
            fontSize: "0.9rem",
            color: "var(--theme-color)",
            marginBottom: "0.4rem",
          }}
        >
          <span>💌</span>
          <span>참석 여부 안내 (필독 부탁드려요!)</span>
        </div>

        <div
          style={{
            fontSize: "0.82rem",
            lineHeight: "1.6",
            color: "var(--dark-color)",
            opacity: 0.9,
          }}
        >
          예약 룸 특성상 좌석 수가 지정되어 있어, 일정 변동이나 동행인이 생기신 경우 꼭 신랑·신부에게 연락 부탁드립니다!
          <span style={{ fontSize: "0.75rem", opacity: 0.75, display: "block", marginTop: "0.3rem" }}>
            쾌적한 식사를 위한 추가 좌석 예약 조정에 꼭 필요하니 너른 양해 부탁드립니다.
          </span>
        </div>

        {/* 신랑/신부에게 바로 연락하기 버튼 */}
        <div
          style={{
            display: "flex",
            gap: "0.5rem",
            marginTop: "0.8rem",
            paddingTop: "0.7rem",
            borderTop: "1px dashed var(--light-grey-color)",
          }}
        >
          <Button
            style={{ flex: 1, padding: "0.45rem", fontSize: "0.78rem" }}
            onClick={() => window.open("tel:010-9033-7782", "_self")}
          >
            📞 신랑 연락하기
          </Button>
          <Button
            style={{ flex: 1, padding: "0.45rem", fontSize: "0.78rem" }}
            onClick={() => window.open("tel:010-5775-6030", "_self")}
          >
            📞 신부 연락하기
          </Button>
        </div>
      </div>
    </LazyDiv>
  )
}

/**
 * 3. 마음 전하기 (계좌번호) 카드
 */
export const FriendsDonation = () => {
  const donationModalState = useState(false)
  const [isGroom, setIsGroom] = useState(true)

  return (
    <LazyDiv className="card information">
      <h2 className="english">Heart</h2>

      <div className="info-card" style={{ marginTop: "1.5rem" }}>
        <div className="label">마음 전하기</div>
        <div className="content" style={{ textAlign: "left", lineHeight: "1.7", marginBottom: "1rem" }}>
          따뜻한 축하와 발걸음만으로도 큰 힘이 됩니다. 뜻을 전하고자 하시는 분들을 위해 조심스럽게 계좌번호를 남깁니다.
        </div>

        <div style={{ display: "flex", gap: "0.5rem" }}>
          <Button
            style={{ flex: 1 }}
            onClick={() => {
              donationModalState[1](true)
              setIsGroom(true)
            }}
          >
            신랑측 계좌보기
          </Button>
          <Button
            style={{ flex: 1 }}
            onClick={() => {
              donationModalState[1](true)
              setIsGroom(false)
            }}
          >
            신부측 계좌보기
          </Button>
        </div>
      </div>

      {/* 계좌 정보 모달 */}
      <Modal
        modalState={donationModalState}
        className="donation-modal"
        closeOnClickBackground={true}
      >
        <div className="header">
          <div className="title">
            {isGroom ? "신랑측 계좌번호" : "신부측 계좌번호"}
          </div>
        </div>
        <div className="content">
          {(isGroom ? GROOM_INFO : BRIDE_INFO)
            .filter(({ account }) => !!account)
            .map(({ relation, name, account }) => (
              <div className="account-info" key={relation}>
                <div>
                  <div className="name">
                    <span className="relation">{relation}</span> {name}
                  </div>
                  <div>{account}</div>
                </div>
                <Button
                  className="copy-button"
                  onClick={async () => {
                    if (account) {
                      try {
                        await navigator.clipboard.writeText(account)
                        alert(account + "\n복사되었습니다.")
                      } catch {
                        alert("복사에 실패했습니다.")
                      }
                    }
                  }}
                >
                  복사하기
                </Button>
              </div>
            ))}
        </div>
        <div className="footer">
          <Button
            buttonStyle="style2"
            className="bg-light-grey-color text-dark-color"
            onClick={() => donationModalState[1](false)}
          >
            닫기
          </Button>
        </div>
      </Modal>
    </LazyDiv>
  )
}
