import React from "react";
import moment from "moment";
import Datetime from "react-datetime";
import { Delegation, MatchPoolMode } from "../../../models/Stage";

function DelegationSettings(props: {settings: Delegation, reducer: any}) {

  const changeAllowTransfers = (value: boolean) => {
    props.reducer({
      id: props.settings.id,
      field: "allow_transfers",
      value: value,
    })
    props.reducer({
      id: props.settings.id,
      field: "matching_pool",
      value: value ? MatchPoolMode.Default : MatchPoolMode.None,
    })
  };

  return (
    <div className="event-section">
      <label>移譲</label>
      <p>Delegation Stageの設定を選択する</p>
      <div className="event-section">
        <label>投票者1人あたりのボイスクレジット</label>
        <p>ボイスクレジットは何単位からスタートすればよいですか？</p>
        <div className="event-section_form">
          <input
            id="num-credits_input"
            className="event-section_form_input"
            type="number"
            min="1"
            step="1"
            value={props.settings.num_credits}
            onChange={(e) => props.reducer({
              id: props.settings.id,
              field: "num_credits",
              value: e.target.value,
            })}
          />
        </div>
      </div>
      <div className="event-section">
        <label>リキッド・デモクラシー（液状民主主義）</label>
        <p>デフォルトでは、代表者は自分の音声クレジットをグループ内の他の人にいくつでも譲渡できるオプションがあります。ボイスクレジットの譲渡を許可しますか？</p>
        <div className="event-section_form">
        <label className="event-section_form_input">
          <input
            id="allow-transfers_input"
            className="checkbox-button"
            type="checkbox"
            checked={props.settings.allow_transfers}
            onChange={() => changeAllowTransfers(!props.settings.allow_transfers)}
          />Allow voice credit transfers
          </label>
        </div>
      </div>
      <div className="event-section">
        <label>ボイスクレジットマッチングファンド</label>
        <p>デフォルトでは、音声クレジットの転送はQF（Quadratic Funding）式にしたがってマッチングされます。マッチングプール内の音声クレジットの量に制限を設けるか、この機能を完全にオフにすることができます。.</p>
        <div id="match-pool-radio" className="event-section_form">
          <label className="event-section_form_input">
            <input
              type="radio"
              className="checkbox-button"
              name="match_pool_mode"
              value={MatchPoolMode.Infinite}
              checked={props.settings.matching_pool === MatchPoolMode.Infinite}
              disabled={!props.settings.allow_transfers}
              onChange={(e) => props.reducer({
                id: props.settings.id,
                field: "matching_pool",
                value: e.target.value,
              })}
            />
            Infinite (no limit)
          </label>
          <label className="event-section_form_input">
            <input
              type="radio"
              className="checkbox-button"
              name="match_pool_mode"
              value={MatchPoolMode.Default}
              checked={props.settings.matching_pool === MatchPoolMode.Default}
              disabled={!props.settings.allow_transfers}
              onChange={(e) => props.reducer({
                id: props.settings.id,
                field: "matching_pool",
                value: e.target.value,
              })}
            />
            Default (voice credits per delegate * number of delegates)
          </label>
          <label className="event-section_form_input">
            <input
              type="radio"
              className="checkbox-button"
              name="match_pool_mode"
              value={MatchPoolMode.None}
              checked={props.settings.matching_pool === MatchPoolMode.None}
              disabled={!props.settings.allow_transfers}
              onChange={(e) => props.reducer({
                id: props.settings.id,
                field: "matching_pool",
                value: e.target.value,
              })}
            />
            None (Turn off QF matching)
          </label>
        </div>
      </div>
      <div className="event-section">
        <label>オープン委任状</label>
        <p>デフォルトでは、代表者は、電子メールアドレスにボイスクレジットを送信することで、新しい人をイベントに招待するオプションがあります。代表者が新しい人を招待できるようにしますか？</p>
        <div className="event-section_form">
          <label className="event-section_form_input">
            <input
              id="allow-invites_input"
              className="checkbox-button"
              type="checkbox"
              checked={props.settings.allow_invites}
              onChange={() => props.reducer({
                id: props.settings.id,
                field: "allow_invites",
                value: !props.settings.allow_invites,
              })}
            />Delegates can send invites
          </label>
        </div>
      </div>
      <div className="event-section">
        <label>Delegation Start Date</label>
        <p>When would you like this stage to begin?</p>
        <div className="event-section_form">
          <Datetime
            className="event-section_datetime"
            value={moment(props.settings.start_date)}
            onChange={(value) => props.reducer({
              id: props.settings.id,
              field: "start_date",
              value: value,
            })}
          />
        </div>
      </div>
      <div className="event-section">
        <label>委任契約終了日</label>
        <p>このステージはいつ終了させたいですか？</p>
        <div className="event-section_form">
          <Datetime
            className="event-section_datetime"
            value={moment(props.settings.end_date)}
            onChange={(value) => props.reducer({
              id: props.settings.id,
              field: "end_date",
              value: value,
            })}
          />
        </div>
      </div>
    </div>
  );
}

export default DelegationSettings;
