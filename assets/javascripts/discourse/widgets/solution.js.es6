import { createWidget } from 'discourse/widgets/widget';
import { h } from 'virtual-dom';
import { avatarImg } from 'discourse/widgets/post';
import { cook } from 'discourse/lib/text';
import RawHtml from 'discourse/widgets/raw-html';
import showModal from 'discourse/lib/show-modal';
import Composer from 'discourse/models/composer';
import { getOwner } from 'discourse-common/lib/get-owner';
import NotificationsButton from 'discourse/components/notifications-button';
import { ajax } from 'discourse/lib/ajax';




export default createWidget('developing-solution', {
  tagName: 'div.developing-solution.widget-container',
  buildKey: (attrs) => 'developing-solution',

  defaultState(attrs) {
    return {
      topic: attrs.topic,
      bookmarked: attrs.topic ? attrs.topic.bookmarked : null
    }
  },

  canInviteToForum() {
    return Discourse.User.currentProp('can_invite_to_forum');
  },

  toggleBookmark() {
    this.state.bookmarked = !this.state.bookmarked
    const topicController = this.register.lookup('controller:topic')
    topicController.send('toggleBookmark')
  },

  sendShowLogin() {
    const appRoute = this.register.lookup('route:application');
    appRoute.send('showLogin');
  },

  sendShowCreateAccount() {
    const appRoute = this.register.lookup('route:application');
    appRoute.send('showCreateAccount');
  },

  showInvite() {
    const topicRoute = this.register.lookup('route:topic');
    topicRoute.send('showLogin');
  },

  createTopic() {
    const cController = this.register.lookup('controller:composer');
    const dtController = this.register.lookup('controller:discovery/topics');
    cController.open({
      categoryId: dtController.get('category.id'),
      action: Composer.CREATE_TOPIC,
      draftKey: dtController.get('model.draft_key'),
      draftSequence: dtController.get('model.draft_sequence')
    });
  },

  html(attrs, state) {
    const { currentUser } = this;
    const topic = state.topic;
    let contents = [];
    var view1 = 0, view2 = 0, view3 = 0, view4 = 0, view5 = 0;
    const cate = attrs.category;
    const path = getOwner(this).lookup('controller:application').get('currentPath');

    contents.push("به پادپرس خوش آمدید");
    return h('div.widget-inner', contents);
  }

});
