import React from "react";
import moment from "moment";
import Datetime from "react-datetime";
import { Election } from "../../../models/Stage";

function ElectionSettings(props: {settings: Election, reducer: any}) {

  return (
    <div className="event-section">
      <label>投票・</label>
      <p>Election Stageの設定を選択する</p>
      <div className="event-section">
        <label>投票ステージのタイトル</label>
        <p>このステージの名前を追加してください.</p>
        <div className="event-section_form">
          <input
            type="text"
            id="stage_title"
            className="event-section_form_input"
            value={props.settings.title}
            onChange={(e) => props.reducer({
              id: props.settings.id,
              field: "title",
              value: e.target.value,
            })}
          />
        </div>
      </div>
      <div className="event-section">
        <label>投票開始日</label>
        <p>いつ投票を開始しますか？</p>
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
        <label>投票終了日</label>
        <p>いつ投票を締め切りますか？</p>
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

export default ElectionSettings;
