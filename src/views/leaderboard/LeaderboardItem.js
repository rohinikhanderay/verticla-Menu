import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import star from "../../assets/images/leaderboardStar.svg";

const LeaderboardItem = (props) => {
 
  return (
        
    <tr>
      <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        <div class="text-gray-900 text-center">#{props.rank}</div>
      </td>
      <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
        <div class="flex items-center">
          <div class="h-10 w-10 flex-shrink-0">
            <img class="h-10 w-10 rounded-full" src="https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg" alt=""/>
          </div>
          <div class="ml-4 text-center">
            <div class="font-medium text-gray-900"> <Link to={props.profileUrl}> {props.participant} </Link></div>
            {/* <div class="text-gray-500">lindsay.walton@example.com</div> */}
          </div>
        </div>
      </td>
      <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        <div class="text-gray-900 text-left">{props.school}</div>
        <div class="text-gray-500 text-left">{props.student}</div>
      </td>
      <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        <span class="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800 text-left">{props.club}</span>
      </td>
      <td class="whitespace-nowrap px-3 py-4 text-sm text-center text-gray-500 text-center">{props.points}</td>
  </tr>


  );
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps)(LeaderboardItem);

