const initialState = {
    componentName: '',
    title: ''
}

const ComponentReducer = (state = initialState, action) => {
    
    switch (action.type) {
        case 'Job Search':
        return {...state, componentName: 'Job Search'}

        case 'Home':
            return {...state, componentName: 'Home'}

        case 'Career Development':
            return {...state, componentName: 'Career Development'}
            
        case 'My Applications':
            return {...state, componentName: 'My Applications'}

        case 'Profile':
            return {...state, componentName: 'Profile'}
        
        case 'Blogs':
            return {...state, componentName: 'Blogs'}

        case 'title':
            return {...state, title: action.title}

    }

    return state
}

export default ComponentReducer