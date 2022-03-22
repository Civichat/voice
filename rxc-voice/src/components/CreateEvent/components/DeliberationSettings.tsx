import React from "react";
import moment from "moment";
import Datetime from "react-datetime";
import { Conversation } from "../../../models/Stage";

function DeliberationSettings(props: {settings: Conversation, reducer: any}) {

  return (
    <div className="event-section">
      <label>審議</label>
      <p>熟議ステージの設定を選ぶ</p>
      <div className="event-section">
        <label>熟議ステージの名前</label>
        <p>熟議ステージの名前を決めましょう</p>
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
        <label>熟議を始める日</label>
        <p>このステージをいつ開始しますか？</p>
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
        <label>熟議の終了日</label>
        <p>いつ熟議を終了させますか？</p>
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

export default DeliberationSettings;
