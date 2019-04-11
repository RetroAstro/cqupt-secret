<view class="container">
   <view class="header">
      <view class="circle-box flex-start">
         <view class="icon-box">
            <image class="icon" mode="scaleToFill" src="../../../images/icon.png"></image>
         </view>
         <view class="content flex-col-between">
            <view class="title">重邮小公告</view>
            <view class="member">4567个圈友</view>
         </view>
      </view>
      <view class="sticky">
         <image class="message" mode="scaleToFill" src="../../../images/message.png"></image>
         <view class="upon-box flex-center">
            <view class="upon flex-start">
               <view class="title">置顶</view>
               <view class="content ellipsis">这里由创建者编辑、创建</view>
            </view>
         </view>
      </view>
   </view>
   <view class="main">
      <view class="post-box">
         <view class="top-bar"></view>
         <post item="{{postItem}}"></post>
         <post item="{{postItem}}"></post>
      </view>
   </view>
   <view class="join-box {{mark === 'join' ? 'active' : ''}}" bindtap="onTap">
      <image class="join" mode="scaleToFill" src="../../../images/join.png"></image>
   </view>
   <view class="publish-box {{mark === 'publish' ? 'active' : ''}}">
      <image class="publish" mode="scaleToFill" src="../../../images/publish.png"></image>
   </view>
</view>