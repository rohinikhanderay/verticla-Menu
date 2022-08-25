const initialState = {
    componentName: '',
    title: '',
    appId: '',
    jobId: '',
    blogId: '',
    publicProfile: false
}

const ComponentReducer = (state = initialState, action) => {

    switch (action.type) {
        case 'Job Search':
            return { ...state, componentName: 'Job Search' }

        case 'Home':
            return { ...state, componentName: 'Home' }

        case 'Career Development':
            return { ...state, componentName: 'Career Development' }

        case 'My Applications':
            return { ...state, componentName: 'My Applications' }

        case 'Profile':
            return { ...state, componentName: 'Profile' }

        case 'Blogs':
            return { ...state, componentName: 'Blogs' }

        case 'Application':
            return { ...state, componentName: 'Application', appId: action.appId }

        case 'Privacy':
            return { ...state, componentName: 'Privacy' }

        case 'Terms of Use':
            return { ...state, componentName: 'Terms of Use' }

        case 'New Application':
            return { ...state, componentName: 'New Application', jobId: action.jobId }

        case 'JobDesc':
            return { ...state, componentName: 'JobDesc', jobId: action.jobId }

        case 'Blog Details':
            return { ...state, componentName: 'Blog Details', blogId: action.blogId }

        case 'title':
            return { ...state, title: action.title }

        case 'company_dashboard':
            return { ...state, componentName: 'Company Dashboard' }

        case 'View Jobs':
            return { ...state, componentName: 'View Jobs', jobId: action.jobId }

        case 'preview_public':
            return { ...state, publicProfile: action.publicProfile }

    }

    return state
}

export default ComponentReducer