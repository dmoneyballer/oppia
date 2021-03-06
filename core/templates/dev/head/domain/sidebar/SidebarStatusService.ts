// Copyright 2015 The Oppia Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @fileoverview Service for maintaining the open/closed status of the
 * hamburger-menu sidebar.
 */

require('services/contextual/WindowDimensionsService.ts');

oppia.factory('SidebarStatusService', [
  'WindowDimensionsService', function(WindowDimensionsService) {
    var pendingSidebarClick = false;
    var sidebarIsShown = false;

    var _openSidebar = function() {
      if (WindowDimensionsService.isWindowNarrow() && !sidebarIsShown) {
        sidebarIsShown = true;
        pendingSidebarClick = true;
      }
    };

    var _closeSidebar = function() {
      if (sidebarIsShown) {
        sidebarIsShown = false;
        pendingSidebarClick = false;
      }
    };

    return {
      isSidebarShown: function() {
        return sidebarIsShown;
      },
      openSidebar: function() {
        _openSidebar();
      },
      closeSidebar: function() {
        _closeSidebar();
      },
      toggleSidebar: function() {
        if (!sidebarIsShown) {
          _openSidebar();
        } else {
          _closeSidebar();
        }
      },
      onDocumentClick: function() {
        if (!pendingSidebarClick) {
          sidebarIsShown = false;
        } else {
          pendingSidebarClick = false;
        }
      }
    };
  }
]);
