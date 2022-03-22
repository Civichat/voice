import React, { useContext, useEffect } from "react";
import { ActionContext } from "../../hooks";
import { BgColor } from "../../models/BgColor";
import collab_img from "../../assets/collab.png";
import group_img from "../../assets/group.png";
import convo_img from "../../assets/speech-bubbles.png";
import handshake_img from "../../assets/handshake.png";

import "./About.scss";

function About() {
  const { setColor } = useContext(ActionContext);

  useEffect(() => {
    setColor(BgColor.Yellow);

   // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="about">
    <div id="about-info">
      <section className="panel">
        <div className="subpanel_image">
          <img src={collab_img} alt="collaboration" />
        </div>
        <div id="first-panel" className="subpanel_text">
          <h2>RxC Voiceをご紹介します。</h2>
          <p>
            <strong>Voice</strong> は、グループが進化し、民主的な意思決定を行うためのモジュール方式です。
          </p>
          <ul className="bullets">
            <li>グループを作る.</li>
            <li>共通の問題を探る。</li>
            <li>行動可能な侵害を特定する。</li>
          </ul>
        </div>
      </section>
      <section className="panel">
        <div className="subpanel_image">
          <img src={group_img} alt="form a group" />
        </div>
        <div className="subpanel_text">
          <h2>グループを作る</h2>
          <p>
            Voiceはグループを支援します
            <strong>サーフェイスリーダーシップ</strong> 参加者が信頼できる人を示すように促すことで
          </p>
          <ul className="bullets">
            <li><strong>みんなの声は平等</strong>参加者は同数の音声クレジットでスタートします。</li>
            <li>オプションとして、参加者は自分の音声クレジットの一部を他の人に委譲することができますので <strong>信頼と専門的な知識が計上されている。</strong></li>
            <li>広く信頼される人物には、以下の方法で音声クレジットボーナスが付与されます。 <a
              href="http://wtfisqf.com"
              target="_blank"
              rel="noopener nofollow noreferrer"
              className="inline-link"
            >Quadratic Funding</a>.</li>
            <li><strong>グループは有機的に成長する</strong> 参加者が新しい連絡先に音声クレジットを転送するとき。</li>
            <li>委任した後でも, <strong>だれでも直接参加できる</strong>.</li>
          </ul>
        </div>
      </section>
      <section className="panel">
        <div className="subpanel_image">
          <img src={convo_img} alt="conversation" />
        </div>
        <div className="subpanel_text">
          <h2>共通の課題を探る</h2>
          <p>
            Voiceで簡単に <strong>共通の課題を探ることができ、</strong>, コンセンサスが得られている分野を特定し、その上に構築する。
          </p>
          <ul className="bullets">
            <li><strong>みんなの声が届く</strong> Pol.is を使った会話で.</li>
            <li>ユーザーは、自分が関連すると思う考え、感情、意見、価値観、事実、または原則を共有することができます。.</li>
            <li>返信やスレッドがないため <strong>異論は異論で論破せよ</strong>.</li>
            <li>ユーザーは、自分が納得できないコメントに対して、繰り返し発言することで <strong>意見がまとまる</strong>.</li>
            <li>Pol.isは、どのコメントがコンセンサスを形成し、どのコメントが賛否を分けたかについて、意味のあるデータを出力します。</li>
          </ul>
        </div>
      </section>
      <section className="panel">
        <div className="subpanel_image">
          <img src={handshake_img} alt="handshake" />
        </div>
        <div className="subpanel_text">
          <h2>行動可能な侵害を特定する。.</h2>
          <p>
            Voiceはグループを支援します
            <strong>選択を決め、</strong> <strong>集団行動につながる妥協点</strong>を見出す。
          </p>
          <ul className="bullets">
            <li><strong>投票用紙の作成は分散化されている</strong>. Pol.is会話でユーザーが投稿した内容から、グループ内で実行可能な選択肢の投票が構築されます。</li>
            <li>任命されたキュレーターは、提案の一貫性を保証する。ユーザーは、キュレーションに不服がある場合、投票を拒否することができます。</li>
            <li>を用いて、共有の意思決定に至る。 <a
              href="https://quadraticvote.radicalxchange.org/"
              target="_blank"
              rel="noopener nofollow noreferrer"
              className="inline-link"
            >Quadratic Voting</a> (QV).</li>
            <li>QVでは、ユーザーが自分の好みの大きさを表現できる、つまり<strong>無気力は判断を誤らせる</strong>.</li>
            <li>強い選好に増加コストを課すことで, <strong>QVは連立と妥協を奨励する</strong>.</li>
          </ul>
        </div>
      </section>
      <section id="last-panel">
        <div>
          <h2>集団的意思決定は公共財である</h2>
          <p>
          RxC Voiceは、オープンソース <a
              href="https://github.com/RadicalxChange/rxc-voice"
              target="_blank"
              rel="noopener nofollow noreferrer"
              className="inline-link"
            >プロジェクトです</a> RadicalxChangeによって作られている<a
              href="https://radicalxchange.org/"
              target="_blank"
              rel="noopener nofollow noreferrer"
              className="inline-link"
            >RadicalxChange Foundation</a>, a 501(c)(3) nonprofit organization.
          </p>
          <p>
            <a
              href="https://pol.is/"
              target="_blank"
              rel="noopener nofollow noreferrer"
              className="inline-link"
            >Pol.is</a> is an open-source <a
              href="https://github.com/pol-is/"
              target="_blank"
              rel="noopener nofollow noreferrer"
              className="inline-link"
            >project</a> maintained by <a
              href="https://compdemocracy.org/"
              target="_blank"
              rel="noopener nofollow noreferrer"
              className="inline-link"
            >The Computational Democracy Project</a>, a 501(c)(3) nonprofit organization.
          </p>
        </div>
      </section>
    </div>
      
    </div>
  );
}

export default About;
