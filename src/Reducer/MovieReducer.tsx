import { useReducer } from 'react';

const movieReducer = (state, action) => {
    const { type, payload } = action;

    switch(type) {
        case "ADD_TO_FAVORITE": 
            console.log("ADD_TO_FAVORITE", payload)
        
        return {
            ...state,
            favorites: payload.favorites,
        }
        
    }
}

export { movieReducer };