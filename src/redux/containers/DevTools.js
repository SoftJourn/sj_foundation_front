import React from 'react';
import { createDevTools } from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';

/**
 * Dev toolbar for redux state (press 'ctr-h' to open in browser)
 */
export default createDevTools(
  <DockMonitor
    toggleVisibilityKey="ctrl-h"
    defaultIsVisible={false}
    changePositionKey="ctrl-w"
  >
    <LogMonitor />
  </DockMonitor>
);
