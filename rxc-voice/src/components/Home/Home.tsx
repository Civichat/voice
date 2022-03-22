import React, { useContext, useEffect } from "react";
import { ActionContext, StateContext } from "../../hooks";
import { BgColor } from "../../models/BgColor";
import { Process } from "../../models/Process";
import ProcessCard from "./components/ProcessCard";

import "./Home.scss";

function Home() {
  const { setColor, fetchProcesses } = useContext(ActionContext);
  const { processes, activeProcesses, pastProcesses } = useContext(StateContext);

  useEffect(() => {
    setColor(BgColor.Yellow);

    if (processes === undefined) {
      fetchProcesses();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="home">
      <h1 className="title">Voiceへようこそ</h1>
      <p>RadicalxChange'の集団的意思決定の他、目のプラットフォーム<br></br>
      参加や結果を見るには、以下の決定事項をクリックしてください</p>
      <div className="create-button">
        <a href="/create-event">+ イベントを追加する</a>
      </div>
      {activeProcesses?.length || pastProcesses?.length ? (
        <div className="content">
          {activeProcesses?.length ? (
            <ul className="process-list">
              {activeProcesses.map((process: Process) => (
                <ProcessCard process={process} key={process.id} active={true} />
              ))}
            </ul>
          ) : null}
          {pastProcesses?.length ? (
            <ul className="process-list">
              {pastProcesses.map((process: Process) => (
                <ProcessCard key={process.id} process={process} active={false} />
              ))}
            </ul>
          ) : null}
        </div>
        ) : (
          <p className="no-events">When you participate in an event, it will appear here!</p>
        )}
    </div>
  );
}

export default Home;
