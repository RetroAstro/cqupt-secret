const { combineReducers } = require('../../lib/redux')

const {
   RECEIVE_SINGLE_POSTS,
   RECEIVE_SOLE_POST,
   ADD_SINGLE_POSTS,
   LIKE_ACTION,
   COLLECT_ACTION
} = require('../constants/index')

const loadSinglePosts = (state, { data }) => {
   let middle = data
      .map(item => ({ [item.id]: item })).reduce((prev, next) => ({ ...prev, ...next }), {})
      
   return {
      ...state,
      ...middle
   }
}

const addSolePost = (state, { data: { post } }) => {
   let result = {
      ...state,
      [post.id]: {
         ...state[post.id],
         commitCount: post.commitCount
      }
   }

   return result
}

const updateLikeStatus = (state, { id, isAgree }) => {
   let result = {
      ...state,
      [id]: {
         ...state[id],
         isAgree: !isAgree,
         agreeCount: isAgree ? state[id].agreeCount - 1 : state[id].agreeCount + 1
      }
   }

   return result
}

const updateCollectStatus = (state, { id, isCollection }) => {
   let result = {
      ...state,
      [id]: {
         ...state[id],
         isCollection: !isCollection,
         collectionCount: isCollection ? state[id].collectionCount - 1 : state[id].collectionCount + 1
      }
   }

   return result
}

const postsById = (state = {}, action) => {
   switch (action.type) {
      case RECEIVE_SINGLE_POSTS:
      case ADD_SINGLE_POSTS:
         return loadSinglePosts(state, action)
      case RECEIVE_SOLE_POST: 
         return addSolePost(state, action)
      case LIKE_ACTION:
         return updateLikeStatus(state, action)
      case COLLECT_ACTION: 
         return updateCollectStatus(state, action)
      default:
         return state
   }
}

module.exports = combineReducers({ byId: postsById })