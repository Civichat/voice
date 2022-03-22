import React, { useEffect, useState } from "react";
import DelegateCard from "./components/DelegateCard";
import { Delegate } from "../../../../models/Delegate";
import moment from "moment";
import { WebService } from "../../../../services";
import { Transfer } from "../../../../models/Transfer";
import TransferCard from "./components/TransferCard";
import TransferModal from "./components/TransferModal";
import { Delegation, MatchPoolMode } from "../../../../models/Stage";
import { Process } from "../../../../models/Process";

import "./DelegationPage.scss";

function DelegationPage(props: {process: Process, delegation: Delegation, userDelegate: Delegate}) {
  const [transfers, setTransfers] = useState(new Array<Transfer>());
  const [subtotal, setSubtotal] = useState(0);
  const [match, setMatch] = useState(0);
  const [stagedTransfer, setStagedTransfer] = useState<Delegate | undefined>(undefined);
  const [inviteModal, setInviteModal] = useState(false);
  const delegationOngoing = moment() < moment(props.delegation.end_date);

  useEffect(() => {
    if (!delegationOngoing && props.delegation.allow_transfers) {
        WebService.fetchTransfers(props.delegation.id).subscribe((data: any) => {
        if (data.transfers !== undefined) {
          processTransferData(data);
        } else {
          console.error(data.detail)
        }
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isVerified = (delegate: Delegate, index, array) => {
    return delegate.profile.is_verified !== null;
  };

  const processTransferData = (data: any) => {
    const transferData = data.transfers;
    const matchData = data.match;
    setTransfers(transferData);
    setMatch(matchData);
    setSubtotal(calcSubtotal(transferData));
  };

  const closeModal = () => {
    setStagedTransfer(undefined);
    setInviteModal(false);
  };

  const calcSubtotal = (transferData: Transfer[]) => {
    var subtotal = 0;
    transferData.forEach((transfer: Transfer) => {
      if (transfer.user_is_sender) {
        subtotal -= Number(transfer.amount)
      } else {
        subtotal += Number(transfer.amount)
      }
    });
    return subtotal;
  };

  return (
    <div className="delegation-content">
      <TransferModal
        invite={inviteModal}
        recipient={stagedTransfer}
        process={props.process}
        delegation={props.delegation}
        closeModal={closeModal}
        userDelegate={props.userDelegate}
      />
      <h1>投票権の移譲</h1>
      <h2 className="content-header">{props.process.title}</h2>
      <div className="explain-text">
        <p>RxC Voiceの民主的プロセスへようこそ! 私たちはこの決定を民主的に行いたいので、誰が参加するのかを決めるところから始めなければなりません。まず、あなたがここにいる理由から始めましょう。誰かがこの決定についてあなたが発言すべきだと考え、あなたにボイスクレジットを与えました。ボイスクレジットはこの後の選挙での投票に使われます。</p>
        {props.delegation.allow_invites ? (
          <p>下のリストにない方で、発言したほうがいいと思われる方はいらっしゃいますか？自分で招待することができます。</p>
        ) : null}
        {props.delegation.allow_transfers ? (
          <>
          <p>また、すでにいる人を信頼し、その人に選挙でより大きな影響力を持たせたい場合は、ボイスクレジットを与えることができます。{props.delegation.matching_pool !== MatchPoolMode.None ? " この段階が終わると、すべてのクレジットの譲渡がQuadratic Fundingを使ってマッチングされることになります  " : " "}もし、選挙で使うためにすべてのクレジットを保存したいのであれば、それも結構です</p>
          <p>Delegation and Electionに参加するための敷居は25ボイスクレジットであることに留意してください。判定に参加したい場合。 <strong>ボイスクレジットは最低でも25個は確保してください。</strong></p>
          </>
        ) : null}
        <p>他の参加者は下記からご覧いただけます。.</p>
      </div>
      {delegationOngoing ? (
        <>
        <p className="explain-text"><strong>デレゲーションステージは、以下の日程で締め切ります。 {moment(props.delegation.end_date).format('MMMM Do YYYY, h:mm a')}</strong></p>
        {props.delegation.matching_pool === MatchPoolMode.Default ? (
          <h3 className="matching-pool">マッチングプールの規模は、最終的な代表者数の100倍となる予定です。</h3>
        ) : null}
        {props.delegation.allow_invites ? (
          <button
            type="button"
            className="submit-button"
            onClick={() => setInviteModal(true)}
          >
            + Invite Someone Else
          </button>
        ) : null}
        </>
      ) : (
        <>
        <p className="explain-text"><strong>デレゲーションステージは終了しました。最終的な代表者名簿は以下からご覧いただけます。!</strong></p>
        {props.delegation.allow_transfers ? (
          <div className="transfers">
            <h2>あなたの履歴</h2>
            <div className="transfers-header">
              <h3 className="type">種類</h3>
              <h3 className="amount">額</h3>
            </div>
            {transfers.length ? (
              <>
                <ul className="transfer-list">
                  {transfers.map((transfer: Transfer) => (
                    <TransferCard transfer={transfer} key={transfer.id}></TransferCard>
                  ))}
                </ul>
                <div className="transfers-subtotals">
                  <div className="type">
                    <h3>小計</h3>
                    <h3>受領したマッチングファンド</h3>
                  </div>
                  <div className="amount">
                    <h3>{(subtotal < 0) ? "- " : "+ "}{Math.abs(subtotal)} voice credits</h3>
                    <h3>{(match < 0) ? "- " : "+ "}{Math.abs(match)} voice credits</h3>
                  </div>
                </div>
                <div className="transfers-subtotals">
                  <h3 className="total">最終変動額</h3>
                  <h3 className="total">{(subtotal + match < 0) ? "- " : "+ "}{Math.abs(subtotal + match)} voice credits</h3>
                </div>
              </>
            ) : (
              <h3>送受信を行わなかった。</h3>
            )}
          </div>
        ) : null}
        </>
      )}
      {props.process.delegates.filter(isVerified).length ? (
        <>
          <h2>代表者</h2>
          <ul className="delegate-list">
            {props.process.delegates
              .filter(isVerified)
              .sort((a: Delegate, b: Delegate) => {
                return a.profile.user.first_name.localeCompare(b.profile.user.first_name);
              })
              .map((delegate: Delegate) => (
                <DelegateCard
                  key={delegate.id}
                  delegate={delegate}
                  process={props.process}
                  delegation={props.delegation}
                  stageTransfer={setStagedTransfer}
                  userDelegate={props.userDelegate}
                >
                </DelegateCard>
              ))}
            </ul>
          </>
      ) : (
        <h3>代表者が見つかりませんでした.</h3>
      )}
    </div>
  );
}

export default DelegationPage;
