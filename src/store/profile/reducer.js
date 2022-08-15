import {
  SUBMIT_PROFILE,
  GET_PROFILE,
  VIEW_PROFILE,
  PROFILE_ERROR,
  GET_IMAGES,
  GET_INTEREST_IMAGES,
  VIEW_TRENDING_SKILL,
  VIEW_SUGGESTION_SKILL,
  VIEW_RECOMMANDED_SKILL,
  GET_CANDIDATES
} from "./types";

const initialState = {
  profile: null,
  selectedProfile: null,
  errorState: {},
  loading: true,
  librearyImages: [],
  interestImages: [],
  trendingSkill: null,
  suggestionSkill: null,
  recommandedSkill: null,
  getCandidates: [],
};

export default function profileReducer(state = initialState, action) {
  switch (action.type) {
    case SUBMIT_PROFILE:
      return { ...state, error: "", loading: false };
    case GET_PROFILE:
      return {
        ...state,
        error: "",
        profile: action.payload,
        loading: false,
      };
    case GET_IMAGES:
      return {
        ...state,
        error: "",
        librearyImages: action.payload,
        loading: false,
      };
    case GET_INTEREST_IMAGES:
      return {
        ...state,
        error: "",
        interestImages: action.payload,
        loading: false,
      };
    case VIEW_PROFILE:
      return {
        ...state,
        error: "",
        selectedProfile: action.payload,
        loading: false,
      };
    case PROFILE_ERROR:
      return {
        ...state,
        errorState: action.payload,
        loading: false,
      };
    case VIEW_TRENDING_SKILL:
      return {
        ...state,
        trendingSkill: action.payload,
        loading: false,
      };
    case VIEW_SUGGESTION_SKILL:
      return {
        ...state,
        suggestionSkill: action.payload,
        loading: false,
      };
    case VIEW_RECOMMANDED_SKILL:
      return {
        ...state,
        recommandedSkill: action.payload,
        loading: false,
      };
    case GET_CANDIDATES:
    
      return {
        ...state,
        getCandidates: action.payload,
        loading: false,
      };

    default:
      return state;
  }
}
