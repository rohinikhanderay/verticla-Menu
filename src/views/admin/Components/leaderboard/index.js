import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Pagination from 'react-js-pagination'
import Layout from '../Layout'
import { NavLink } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import defaultImage from '../../../../assets/images/de_images.png'
import * as leaderboardActions from "../../../../store/leaderboard";
import AdminLeaderboardItem from "./AdminLeaderboardItem";

const AdminLeaderboard = ({getProfiles, }) => {
  const [profileLimit, setProfileLimit] = useState(10);
  const [profiles, setProfiles] = useState("");
  const [leaderboardItems, setLeaderboardItems] = useState("");
  const [editLeaderboard, setEditLeaderboard] = useState(false);
  
  useEffect(() => {
    const loadProfiles = async () => {
      await getProfiles(setProfiles, updateLeaderboardItems, profileLimit)
    }
    if (leaderboardItems.length == 0) {
      loadProfiles()
    }
    console.log("loading...",leaderboardItems.length)

  }, [profiles]);

  let history = useHistory();

  // if (!localStorage.getItem('token')) {
  //   history.push('/')
  // }

  const updateProfiles = async () => {
    await getProfiles(setProfiles, updateLeaderboardItems, profileLimit)
  }
  
  const updateLeaderboardItems = () => {
    let tempLeaderboardItems = []
    if (profiles) {
      for (let i = 0; i < profiles.length; i++) {
        let nuleepID = profiles[i].nuleepID ? profiles[i].nuleepID : -1
        let points = profiles[i].points ? profiles[i].points : 0
        let school = profiles[i].school ? profiles[i].school : "N/A"
        let discordID = profiles[i].name ? profiles[i].name : profiles[i].username
        let club = profiles[i].club ? profiles[i].club : "N/A"
        tempLeaderboardItems.push(
          <AdminLeaderboardItem rank={i + 1} nuleepID= {nuleepID} school={school} discordID={discordID} club={club} points={points}  />
        )
      }
      setLeaderboardItems(tempLeaderboardItems)
    }
    let tempLimit = profileLimit + 5
    setProfileLimit(tempLimit)
  }

  const edit_leaderboard = () => {
      setEditLeaderboard(true)
  }

  const save_leaderboard = () => {
    setEditLeaderboard(false)
  }
 
  return (
    <Layout>
      <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
        <div className="container mx-auto px-6 py-8">
          <div className="flex justify-between items-center	">
            <h3 className="text-gray-700 text-3xl font-medium">Leaderboard</h3>
            <div>
              <button
                className="cursor-pointer inline-flex justify-center items-center px-4 py-2 ml-3 font-medium text-white bg-teal-600 border border-transparent rounded-md shadow-sm text-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                onClick={editLeaderboard}
              >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
                Edit
              </button>
              <NavLink
                to={`/admin/leaderboard`}
                className="cursor-pointer inline-flex justify-center  items-center  px-4 py-2 ml-3 font-medium text-white bg-teal-600 border border-transparent rounded-md shadow-sm text-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
              >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
                Save
              </NavLink>
            </div>
          </div>
          <div className="mt-8"></div>

         
          <div class="mt-4 flex flex-col">
          <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div class="mx-12 overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table class="min-w-full divide-y divide-gray-300">
                  <thead class="bg-gray-50">
                    <tr>
                      <th scope="col" class="py-3.5 pl-4 pr-3 text-center text-sm font-semibold text-gray-900 sm:pl-6">Rank</th>
                      <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Participant</th>
                      <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Campus</th>
                      <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Club</th>
                      <th scope="col" class="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">Points</th>
                      <th scope="col" class="px-3 py-3.5 text-center text-sm font-semibold text-gray-900"></th>
                    </tr>
                  </thead>

                  <tbody class="divide-y divide-gray-200 bg-white">
                    {leaderboardItems}
                  </tbody>

                  </table>
              </div>
            </div>

          <div className="flex m-auto mx-24 cursor-pointer border-solid content-center" onClick={updateProfiles}>
              <p>See more</p>
          </div>     
        </div>
      </div>
          
        </div>
      </main>
    </Layout>
  )
}
const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, leaderboardActions)(AdminLeaderboard);