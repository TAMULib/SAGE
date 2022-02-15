import Mirador from '../../../../node_modules/mirador/dist/es/src/index';
import { miradorImageToolsPlugin } from '../../../../node_modules/mirador-image-tools/es/index';

var getMirador = function (domId, manifestId) {
        Mirador.viewer({
            id: domId,
            window: {
              allowClose: false,
              allowFullscreen: true,
              hideWindowTitle: true,
              sideBarOpen: false
            },
            windows: [{
              manifestId: manifestId,
              imageToolsEnabled: true,
              imageToolsOpen: false
            }],
            workspaceControlPanel: {
              enabled: false
            },
            workspace: {
              showZoomControls: true
            }
          },
          [...miradorImageToolsPlugin]);
};

export { getMirador }
