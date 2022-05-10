import Mirador from '../../../../node_modules/mirador/dist/es/src/index';
import { miradorImageToolsPlugin } from '../../../../node_modules/mirador-image-tools/es/index';

var getInstance = function() {

  var _miradorInstance = null;

  return {
      initialize: function (domId) {
        if (_miradorInstance == null) {
          _miradorInstance = Mirador.viewer({
            id: domId,
            window: {
              allowClose: false,
              allowFullscreen: true,
              hideWindowTitle: true,
              sideBarOpen: false
            },
            windows: [],
            workspaceControlPanel: {
              enabled: false
            },
            workspace: {
              showZoomControls: true
            }
          }, [miradorImageToolsPlugin]);

        }
      },
      addWindow: function (manifestId) {
        if (_miradorInstance != null) {
          let action = Mirador.actions.addWindow({manifestId: manifestId, imageToolsEnabled: true, imageToolsOpen: false});
          _miradorInstance.store.dispatch(action);
        }
      },
      destroy: function () {
        if (_miradorInstance != null) {
          _miradorInstance.unmount();
          _miradorInstance = null;
        }
      }
    };
}

export { getInstance }