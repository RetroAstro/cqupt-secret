const { RECEIVE_SOLE_POST } = require('../../constants/index')

const loadPostComments = (state, { data: { post: { id }, comments } }) => ({
  ...state,
  [id]: comments.map(item => item.commentId)
})

const postComments = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_SOLE_POST:
      return loadPostComments(state, action)
    default:
      return state
  }
}

module.exports = postComments
