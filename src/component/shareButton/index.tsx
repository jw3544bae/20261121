import {
  BRIDE_FULLNAME,
  GROOM_FULLNAME,
  LOCATION,
  SHARE_ADDRESS,
  SHARE_ADDRESS_TITLE,
  WEDDING_DATE,
  WEDDING_DATE_FORMAT,
  FRIEND_EVENT,
} from "../../const"
import ktalkIcon from "../../icons/ktalk-icon.png"
import { LazyDiv } from "../lazyDiv"
import { useKakao } from "../store"

const rawBaseUrl = import.meta.env.BASE_URL
// URL 끝 슬래시 정리 (예: '/20261121/' -> '/20261121')
const cleanBaseUrl = rawBaseUrl.endsWith("/") ? rawBaseUrl.slice(0, -1) : rawBaseUrl

export const ShareButton = () => {
  const kakao = useKakao()

  return (
    <LazyDiv className="footer share-button">
      <button
        className="ktalk-share"
        onClick={() => {
          if (!kakao) {
            return
          }

          const origin = window.location.protocol + "//" + window.location.host
          const isFriends = window.location.search.includes("to=friends")
          const siteUrl = origin + cleanBaseUrl + "/" + (isFriends ? "?to=friends" : "")
          
          const shareImageUrl = origin + cleanBaseUrl + "/preview_image4.png"

          const shareTitle = isFriends
            ? `${GROOM_FULLNAME} ❤️ ${BRIDE_FULLNAME}의 친구 모임 식사에 초대합니다.`
            : `${GROOM_FULLNAME} ❤️ ${BRIDE_FULLNAME}의 결혼식에 초대합니다.`

          const shareDescription = isFriends
            ? `${FRIEND_EVENT.DATE}\n${FRIEND_EVENT.LOCATION}`
            : WEDDING_DATE.format(WEDDING_DATE_FORMAT) + "\n" + LOCATION

          // 카카오톡 공유 전송 (위치 기반 템플릿)
          kakao.Share.sendDefault({
            objectType: "location",
            address: isFriends ? FRIEND_EVENT.LOCATION : SHARE_ADDRESS,
            addressTitle: isFriends ? FRIEND_EVENT.LOCATION : SHARE_ADDRESS_TITLE,
            content: {
              title: shareTitle,
              description: shareDescription,
              imageUrl: shareImageUrl,
              imageWidth: 900,
              imageHeight: 500,
              link: {
                mobileWebUrl: siteUrl,
                webUrl: siteUrl,
              },
            },
            buttons: [
              {
                title: isFriends ? "친구 식사 초대장 보기" : "초대장 보기",
                link: {
                  mobileWebUrl: siteUrl,
                  webUrl: siteUrl,
                },
              },
            ],
          })
        }}
      >
        <img src={ktalkIcon} alt="ktalk-icon" /> {window.location.search.includes("to=friends") ? "친구 초대장 공유하기" : "카카오톡으로 공유하기"}
      </button>
    </LazyDiv>
  )
}
