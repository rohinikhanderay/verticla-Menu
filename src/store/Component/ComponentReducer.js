const initialState = {
    componentName: ''
}

const ComponentReducer = (state = initialState, action) => {
    
    switch (action.type) {
        case 'Job Search':
        return {...state, componentName: 'Job Search'}

        case 'Home':
            return {...state, componentName: 'Home'}

    }

    return state
}

export default ComponentReducer