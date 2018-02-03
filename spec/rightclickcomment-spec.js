'use babel';

import Rightclickcomment from '../lib/rightclickcomment';

// Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
//
// To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
// or `fdescribe`). Remove the `f` to unfocus the block.

describe('Rightclickcomment', () => {
  let workspaceElement, activationPromise;

  beforeEach(() => {
    workspaceElement = atom.views.getView(atom.workspace);
    activationPromise = atom.packages.activatePackage('rightclickcomment');
  });

  describe('when the rightclickcomment:toggle event is triggered', () => {
    it('hides and shows the modal panel', () => {
      // Before the activation event the view is not on the DOM, and no panel
      // has been created
      expect(workspaceElement.querySelector('.rightclickcomment')).not.toExist();

      // This is an activation event, triggering it will cause the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'rightclickcomment:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        expect(workspaceElement.querySelector('.rightclickcomment')).toExist();

        let rightclickcommentElement = workspaceElement.querySelector('.rightclickcomment');
        expect(rightclickcommentElement).toExist();

        let rightclickcommentPanel = atom.workspace.panelForItem(rightclickcommentElement);
        expect(rightclickcommentPanel.isVisible()).toBe(true);
        atom.commands.dispatch(workspaceElement, 'rightclickcomment:toggle');
        expect(rightclickcommentPanel.isVisible()).toBe(false);
      });
    });

    it('hides and shows the view', () => {
      // This test shows you an integration test testing at the view level.

      // Attaching the workspaceElement to the DOM is required to allow the
      // `toBeVisible()` matchers to work. Anything testing visibility or focus
      // requires that the workspaceElement is on the DOM. Tests that attach the
      // workspaceElement to the DOM are generally slower than those off DOM.
      jasmine.attachToDOM(workspaceElement);

      expect(workspaceElement.querySelector('.rightclickcomment')).not.toExist();

      // This is an activation event, triggering it causes the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'rightclickcomment:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        // Now we can test for view visibility
        let rightclickcommentElement = workspaceElement.querySelector('.rightclickcomment');
        expect(rightclickcommentElement).toBeVisible();
        atom.commands.dispatch(workspaceElement, 'rightclickcomment:toggle');
        expect(rightclickcommentElement).not.toBeVisible();
      });
    });
  });
});
