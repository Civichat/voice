import React, { useState } from "react";
import { Link } from "react-router-dom";
import Switch from "react-switch";
import moment from 'moment';
import "./ElectionCreator.scss";
// import blackSquareIcon from '../../assets/black-square.png';
import Ballot from "./components/Ballot";
import VoterList from "./components/VoterList";
import { Proposal } from "../../models/Proposal";
import { Voter } from "../../models/Voter";
import { WebService } from "../../services";
import { fromString } from 'uuidv4';
// import { useAlert } from "react-alert";

function ElectionCreator() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ballot, setBallot] = useState(new Array<Proposal>());
  const [voters, setVoters] = useState(new Array<Voter>());
  // const [voteToken, setVoteToken] = useState({blackSquareIcon});
  const [numTokens, setNumTokens] = useState(99);
  const [negativeVotes, setNegativeVotes] = useState(true);
  const [startTime, setStartTime] = useState(
    moment().format('YYYY-MM-DDTHH:MM'));
  const [endTime, setEndTime] = useState(
    moment().add(1, "days").format('YYYY-MM-DDTHH:MM'));

  const createElection = () => {
    if (formComplete()) {
      WebService.postElection({
        title: title,
        description: description,
        start_date: startTime,
        end_date: endTime,
        negative_votes: negativeVotes,
        matching_fund: 0,
        vote_token: '../../assets/black-square.png',
        num_tokens: numTokens,
      }).subscribe(async (data) => {
                      if (data.ok) {
                        console.log("election submitted!");
                        const response = await data.json();
                        const election_id = response.id;
                        const postDataProposals = new Array<any>();
                        ballot.forEach(proposal => postDataProposals.push({
                          title: proposal.title,
                          description: proposal.description,
                          link: proposal.link,
                          election: election_id,
                        }));
                        console.log(postDataProposals);
                        WebService.postProposals(
                          postDataProposals,
                          election_id).subscribe(async (data) => {
                                        if (data.ok) {
                                          console.log("proposals submitted!");
                                        } else {
                                          const error = await data.json();
                                          Object.keys(error).forEach((key) => {
                                            console.log(error[key]);
                                          });
                                        }
                                      });
                        const postDataVoters = new Array<any>();
                        voters.forEach(voter => postDataVoters.push({
                          password: fromString(voter.email + election_id),
                          email: voter.email,
                          election: election_id,
                        }));
                        console.log(postDataVoters);
                        WebService.postUsers(
                          postDataVoters,
                          election_id).subscribe(async (data) => {
                                        if (data.ok) {
                                          console.log("users submitted!");
                                        } else {
                                          const error = await data.json();
                                          Object.keys(error).forEach((key) => {
                                            console.log(error[key]);
                                          });
                                        }
                                      });
                      } else {
                        const error = await data.json();
                        Object.keys(error).forEach((key) => {
                          console.log(error[key].join());
                        });
                      }
                    });
    } else {
      console.log("Please fill all the fields");
    }
  };

  const formComplete = () => {
    return title && ballot.length && voters.length
  };

  const onChangeBallot = (newBallot: Proposal[]) => {
    setBallot(ballot => newBallot);
  }

  const onChangeVoters = (newVoters: Voter[]) => {
    setVoters(voters => newVoters);
  }

  return (
    <div className="election-creator">
      <Link
        to='/'
        className="back-button"
      >
      Back to Home
      </Link>
      <div className="page-header">
        <h2>Create a New Election</h2>
        <p>Customize the election settings and populate the ballot.
        QVtool will automatically send invitations to the voters via
        email addresses you provide.</p>
      </div>
      <div className="election-form">

          <label>
            Election Title
            <input
              type="text"
              placeholder="Enter Election Title"
              className="basic-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>

          <label>
            Description
            <input
              type="text"
              placeholder="Enter Description (Optional)"
              className="basic-input"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>

          <label>
            Ballot
            <Ballot onChange={onChangeBallot}/>
          </label>

          <label>
            Voters
            <VoterList onChange={onChangeVoters}/>
          </label>

          <label>
            Vote Tokens per Voter
            <input
              type="number"
              min="1"
              max="999"
              step="1"
              value={numTokens}
              onChange={(e) => setNumTokens(Number(e.target.value))}
            />
          </label>

          <div className="switch-wrapper">
            <label>
              Allow Negative Votes
            </label>
            <Switch
              className="neg-switch"
              checked={negativeVotes}
              onChange={() => setNegativeVotes(!negativeVotes)}
              uncheckedIcon={false}
              checkedIcon={false}
              height={20}
              width={48}
              handleDiameter={30}
              boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
              offHandleColor="#ffffff"
              onHandleColor="#ffffff"
              onColor="#000000"
              offColor="#999999"
            />
          </div>

          <label>
            Start Time
            <input
              type="datetime-local"
              className="datetime-input"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
          </label>

          <label>
            End Time
            <input
              type="datetime-local"
              className="datetime-input"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            />
          </label>
      </div>
      <div className="button-wrapper">
        <button
          type="button"
          className="submit-button"
          onClick={() => createElection()}
          >
          submit
        </button>
      </div>
    </div>
  );
}

export default ElectionCreator;
