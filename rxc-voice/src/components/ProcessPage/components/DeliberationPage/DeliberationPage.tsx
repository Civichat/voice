import React, { useEffect } from "react";
import { Process } from "../../../../models/Process";
import { getUserData } from "../../../../utils";
import { Conversation } from "../../../../models/Stage";
import { Delegate } from "../../../../models/Delegate";
import moment from "moment";
import { WebService } from "../../../../services";

import "./DeliberationPage.scss";

function DeliberationPage(props: {process: Process, conversation: Conversation, userDelegate: Delegate}) {
  const POLIS_SITE_ID = 'polis_site_id_cG2opQF5hsqj9jGCsr';

  useEffect(() => {
    if (!props.conversation.polis_id) {
      window.addEventListener("message", (event) => {
        if (event.origin === "https://pol.is" && event.data.name === 'init' && event.data.status === 'ok') {
          WebService.modifyConversation({
            polis_id: event.data.conversation.conversation_id,
          }, props.conversation.id).subscribe(async (data) => {
          });
        }
      }, false);
    }

    // load pol.is embed script
    console.log("loading script...")
    const script = document.createElement('script');
    script.src = 'https://pol.is/embed.js';
    script.async = true;
    document.body.appendChild(script);
    console.log("script loaded.");

    // clean up pol.is embed script and iframes
    return () => {
      console.log("cleaning up script...");
      document.body.removeChild(script);
      const polisDiv = document.getElementById("polis-iframe");
      if (!!polisDiv) {
        console.log("unmounting iframe... ");
        while (polisDiv.firstChild) {
          polisDiv.removeChild(polisDiv.firstChild);
        }
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="polis-page">
      <div className="body">
      <h1>熟議</h1>
      <h2 className="content-header">{props.process.title}</h2>
      <div className="explain-text">
        <p>Join 選挙で投票するための提案をまとめて起草してみませんか？提案書を提出し、自分の考えを共有し、他の代表者の提出物に対する賛成・反対を表明してください。</p>
        <p>これは、最終的な選挙で投票者が検討する項目の投票用紙に影響を与えるチャンスです。</p>
      </div>
      {(moment() < moment(props.conversation.end_date)) ? (
        (moment() > moment(props.conversation.start_date)) ? (
            props.userDelegate ? (
              <>
              <p className="explain-text"><strong>The Deliberation Stage closes on {moment(props.conversation.end_date).format('MMMM Do YYYY, h:mm a')}</strong></p>
              {(props.userDelegate.credit_balance >= 25) ? (
                <>
                <div
                  id="polis-iframe"
                  className='polis'
                  data-page_id={props.conversation.uuid}
                  data-site_id={POLIS_SITE_ID}
                  data-topic={props.conversation.title}
                  data-ucv={moment(props.conversation.start_date) < moment()}
                  data-ucw={moment(props.conversation.start_date) < moment()}
                  data-ucsd='false'
                  data-xid={getUserData()?.token}
                  data-auth_needed_to_vote='false'
                  data-auth_needed_to_write='false'
                  data-auth_opt_fb='false'
                  data-auth_opt_tw='false'
                >
                </div>
                {props.conversation.show_report ? (
                  <iframe
                    title="conversation-results"
                    className="results-iframe"
                    src={"https://pol.is/report/" + props.conversation.report_id}
                  >
                  </iframe>
                ) : null}
                </>
              ) : (
                <p className="insufficient-credits">申し訳ございません。審議または選挙に参加するための十分なボイスクレジットがありません。参加資格は25ボイスクレジットです。.</p>
              )}
              </>
            ) : (
              <div className="body">
                <h3>申し訳ありませんが、何か問題が発生しました。ホームに戻り、お探しのものを見つけてください。.</h3>
              </div>
            )
        ) : (
          <p className="explain-text"><strong>審議ステージの開始日{moment(props.conversation.start_date).format('MMMM Do YYYY, h:mm a')}</strong></p>
        )
      ) : (
        <div className="body">
          <p className="explain-text"><strong>審議ステージが終了しました {props.conversation.report_id ? "You can see the results of the conversation below!" : ""}</strong></p>
            {props.conversation.report_id ? (
              <iframe
                title="conversation-results"
                className="results-iframe"
                src={"https://pol.is/report/" + props.conversation.report_id}
              >
              </iframe>
            ) : null}
        </div>
      )}
      </div>
    </div>
  );
}

export default DeliberationPage;
