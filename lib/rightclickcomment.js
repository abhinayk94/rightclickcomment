'use babel';

import RightclickcommentView from './rightclickcomment-view';
import { CompositeDisposable } from 'atom';

export default {

  rightclickcommentView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.rightclickcommentView = new RightclickcommentView(state.rightclickcommentViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.rightclickcommentView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'rightclickcomment:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.rightclickcommentView.destroy();
  },

  serialize() {
    return {
      rightclickcommentViewState: this.rightclickcommentView.serialize()
    };
  },

  toggle() {
    let editor
      if (editor = atom.workspace.getActiveTextEditor()) {
        //this would be used to comment on every selection
        // for (let selection of editor.selections)
        // {
        //     selection.toggleLineComments()
        // }
        editor.getLastSelection().toggleLineComments()
  }

}
}
