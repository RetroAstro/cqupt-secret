const {
   RECEIVE_SOLE_POST
} = require('../../constants/index')

const createCommentId = ({ author: { id }, timestamp }) => (id + timestamp)

const loadPostComments = (state, { data: { post: { id }, comments } }) => {
   return {
      ...state,
      [id]: comments.map(item => createCommentId(item))
   }
}

const postComments = (state = {}, action) => {
   switch (action.type) {
      case RECEIVE_SOLE_POST:
         return loadPostComments(state, action)
      default:
         return state
   }
}

module.exports = postComments