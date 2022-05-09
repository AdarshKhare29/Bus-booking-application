

const userReducer = (state,action)=>{
    let {type} = action
    let {userDet}  = action

    switch(type){
        case 'LOGIN' :
            return userDet
        case 'LOGOUT':
            return userDet 
        case 'SIGNUP':
            return userDet
        case 'LOGOUT':
            return userDet
        default:
            return state 
    }   
}

export default userReducer;