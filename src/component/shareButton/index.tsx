import {
  BRIDE_FULLNAME,
  GROOM_FULLNAME,
  LOCATION,
  SHARE_ADDRESS,
  SHARE_ADDRESS_TITLE,
  WEDDING_DATE,
  WEDDING_DATE_FORMAT,
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
          const siteUrl = origin + cleanBaseUrl + "/"
          
          // 카카오톡 공유 전용 이미지 경로
          // (public 폴더에 새로 만든 kakao_thumb.png 또는 preview_image.png 지정)
          const shareImageUrl = origin + cleanBaseUrl + "/preview_image.png"

          // 카카오톡 공유 전송 (위치 기반 템플릿)
          kakao.Share.sendDefault({
            objectType: "location",
            address: SHARE_ADDRESS,
            addressTitle: SHARE_ADDRESS_TITLE,
            content: {
              title: `${GROOM_FULLNAME} ❤️ ${BRIDE_FULLNAME}의 결혼식에 초대합니다.`,
              description:
                WEDDING_DATE.format(WEDDING_DATE_FORMAT) + "\n" + LOCATION,
              imageUrl: shareImageUrl,
              // 👇 이 두 값이 없으면 카카오톡이 2:1 가로형으로 강제 확대 크롭합니다!
              // 800 x 800 (정사각형) 또는 800 x 400 (가로형) 등 실제 준비한 이미지 비율에 맞춰 지정하세요.
              imageWidth: 800,
              imageHeight: 800,
              link: {
                mobileWebUrl: siteUrl,
                webUrl: siteUrl,
              },
            },
            buttons: [
              {
                title: "초대장 보기",
                link: {
                  mobileWebUrl: siteUrl,
                  webUrl: siteUrl,
                },
              },
            ],
          })
        }}
      >
        <img src={ktalkIcon} alt="ktalk-icon" /> 카카오톡으로 공유하기
      </button>
    </LazyDiv>
  )
}