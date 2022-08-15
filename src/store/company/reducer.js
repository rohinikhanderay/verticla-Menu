import {
    VIEW_COMPANY,
    VALIDATE_COMPANY,
    VALIDATE_COMPANY_ERROR,
    COMPANY_ERROR,
    RECRUITER_ORG_DETAILS,
    ADMIN_COMPANY_LIST,
    ADMIN_JOB_LIST,
    ADMIN_EMPLOYEE_LIST
} from './types';

const initialState = {
    error: '',
    selectedCompany: null,
    validated: false,
    orgDetails: null,
    loading: true,
    adminCompanies:[],
    adminEmployee:[]
};

export default function companyReducer(state = initialState, action) {
    switch (action.type) {
        case VIEW_COMPANY:
            return {
                ...state,
                error: '',
                selectedCompany: action.payload,
                loading: false,
            };
         case ADMIN_COMPANY_LIST:
            return {
                ...state,
                error: '',
                adminCompanies: action.payload,
                loading: false,
            };   
             case ADMIN_JOB_LIST:
            return {
                ...state,
                error: '',
                adminJobs: action.payload,
                loading: false,
            }; 
             case ADMIN_EMPLOYEE_LIST:
            return {
                ...state,
                error: '',
                adminEmployee: action.payload,
                loading: false,
            };    

        case VALIDATE_COMPANY:
            return { ...state, validated: true, loading: false };
        case VALIDATE_COMPANY_ERROR:
            return { ...state, validated: false, loading: false };
        case COMPANY_ERROR:
            return { ...state, error: action.payload, loading: false };
        case RECRUITER_ORG_DETAILS:
            return { ...state, orgDetails: action.payload, loading: false };
        default:
            return state;
    }
}
