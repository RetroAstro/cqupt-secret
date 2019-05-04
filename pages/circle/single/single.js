const { actions, subscribe } = require('../../../store/index')
const { postItems } = require('../../../mock/index')

Page({
   props: {
      pageNum: 1
   },
   data: {
      mark: '',
      info: {},
      showSkeleton: true,
      loading: false,
      loadingText: '加载中 ...',
      feedList: [postItems]
   },
   onLoad({ params }) {
      qq.hideTabBar()

      this.connectStore()
      this.renderCircleInfo(JSON.parse(params))
   },
   onUnload() {
      qq.showTabBar()
      
      this.unsubscribe()
   },
   onPullDownRefresh() {
      this.props.pageNum = 1

      actions.fetchSinglePosts(this.data.info.id)
   },
   onReachBottom() {
      if (!this.data.loading) this.setData({ loading: true }, () => this.addSinglePosts())
   },
   onTap() {
      this.setData({ mark: 'join' }, () => actions.joinCircle(this.data.info.id))
   },
   onNavigate({ detail: { data } }) {
      qq.navigateTo({ url: `/pages/circle/detail/detail?tag=${data}` })
   },
   connectStore() {
      let self = this
      this.unsubscribe = subscribe(getState => self.handleState(getState()))
   },
   renderCircleInfo(info) {
      this.setData({ info }, () => actions.fetchSinglePosts(this.data.info.id))
   },
   addSinglePosts() {
      this.props.pageNum++
      actions.fetchSinglePosts(this.data.info.id, this.props.pageNum)
   },
   handleState({ circles, posts, circlePosts }) {
      this.updateCircleInfo(circles)
      this.updatePosts(posts, circlePosts)
   },
   updateCircleInfo(circles) {
      circles.map(item => item.id == this.data.info.id ? this.setData({ info: { ...item }, showSkeleton: false }) : null)
   },
   updatePosts(posts, circlePosts) {
      let cursor = this.props.pageNum - 1
      let postIds = circlePosts[this.data.info.id][cursor]

      if (this.noMorePosts(postIds)) {
         this.setData({ loadingText: '没有更多啦 ~' })
      } else {
         qq.stopPullDownRefresh()

         this.setData({
            loading: false,
            [`feedList[${cursor}]`]: postIds.map(id => posts.byId[id])
         })
      }
   },
   noMorePosts(postIds) {
      return !postIds.length && this.props.pageNum > 1
   }
})