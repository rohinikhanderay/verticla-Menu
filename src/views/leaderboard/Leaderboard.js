import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import Navbar from "../../components/layouts/navbar";
import Footer from "../../components/layouts/Footer";
import * as leaderboardActions from "../../store/leaderboard";
import LeaderboardItem from "./LeaderboardItem";

const Leaderboard = ({
  getProfiles,
}) => {
  const [profileLimit, setProfileLimit] = useState(10);
  const [profiles, setProfiles] = useState("");
  const [leaderboardItems, setLeaderboardItems] = useState("");
  
  useEffect(() => {
    const loadProfiles = async () => {
      await getProfiles(setProfiles, updateLeaderboardItems, profileLimit)
    }
    if (leaderboardItems.length == 0) {
      loadProfiles()
    }

  }, [profiles]);

  let history = useHistory();

  if (!localStorage.getItem('token')) {
    history.push('/')
  }

  const updateProfiles = async () => {
    await getProfiles(setProfiles, updateLeaderboardItems, profileLimit)
  }
  
  const updateLeaderboardItems = () => {
    let tempLeaderboardItems = []
    if (profiles) {
      for (let i = 0; i < profiles.length; i++) {
        let rank = i + 1
        let points = profiles[i].points ? profiles[i].points : 0
        let level = Math.floor(profiles[i].points / 3) + 1
        let school = profiles[i].school ? profiles[i].school : "N/A"
        let name = profiles[i].name ? profiles[i].name : profiles[i].username
        let club = profiles[i].club ? profiles[i].club : "N/A"
        let profileUrl = profiles[i].nuleepProfileID ? "/profiles/" + profiles[i].nuleepProfileID : "/leaderboard";
        tempLeaderboardItems.push(
          <LeaderboardItem rank={rank} level={level} school={school} participant={name} club={club} points={points} profileUrl={profileUrl} />
        )
      }
      setLeaderboardItems(tempLeaderboardItems)
    }
    let tempLimit = profileLimit + 5
    setProfileLimit(tempLimit)
  }
 
  return (
    <>
      <Navbar />
      <div class="mx-4 px-4 sm:px-6 lg:px-8">
        <div class="sm:flex sm:items-center">
          <div class="sm:flex-auto">
            <h1 class="mt-2 text-xl font-semibold text-gray-900">Nuleep Leaderboard</h1>
          </div>
        </div>
      </div>
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
      
      <Footer />
    </>
  );
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, leaderboardActions)(Leaderboard);