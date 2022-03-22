import React, { useState } from "react";
import { fromString } from "uuidv4";
import moment from "moment";
import { useParams } from "react-router-dom";
import { PolisPageRouteParams } from "../../../models/PolisPageRouteParams";

import "./CookieBanner.scss";

function CookieBanner(props:any) {
  const { conversationId } = useParams<PolisPageRouteParams>();
  const [showCookieBanner, setShowCookieBanner] = useState(!props.thisCookie);
  const [showPolicy, setShowPolicy] = useState(true);

  const allowCookies = () => {
   (async () => {
       props.setCookie(conversationId, fromString(moment().toDate() + conversationId), {
         path: "/",
         expires: moment().add(1, "days").toDate(),
         sameSite: "lax",
       });
       setShowCookieBanner(showCookieBanner => false);
       props.setCanVote((canVote: boolean) => true);
     }
   )();
  };

  return (
    <div className={`cookie-banner ${!showCookieBanner ? "closed" : ""}`}>
        {showPolicy ? (
          <span className="policy-long">
            ようこそ あなたの同意を得て、私たちはクッキーを使用したいと思います。
            あなたが有権者であることを確認します。ご承諾いただければ
            あなたのブラウザに、あなたが以前ここに来たことがあることを示す乱数が記録されます。
            これにより、二重投票を防ぐことができます。私たちは、あなたに関するいかなる情報も保存しません。
            あなたやあなたのデバイス お断りした場合は、投票ができなくなります。
            コメント投稿は可能です。） 会話に参加していただき、ありがとうございます
          </span>
        ) : (
          <span className="policy-short">
            投票する場合は、Cookieを有効にしてください。
          </span>
        )}
        {showPolicy ? (
          <button
            type="button"
            className="show-less"
            onClick={() => setShowPolicy(showPolicy => false)}
          >
          Show less
          </button>
        ) : (
          <button
            type="button"
            className="show-more"
            onClick={() => setShowPolicy(showPolicy => true)}
          >
          Show more
          </button>
        )}
      <div className="options">
        <button
          type="button"
          className="decline-button"
          onClick={() => setShowCookieBanner(showCookieBanner => false)}
        >
        Decline
        </button>
        <button
          type="button"
          className="accept-button"
          onClick={() => allowCookies()}
        >
        Accept
        </button>
      </div>
    </div>
  );
}

export default CookieBanner;
