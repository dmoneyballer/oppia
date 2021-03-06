// Copyright 2018 The Oppia Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the 'License');
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an 'AS-IS' BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// Every editor directive should implement an alwaysEditable option. There
// may be additional customization options for the editor that should be passed
// in via initArgs.

oppia.directive('listOfTabsEditor', [
  'UrlInterpolationService', 'OBJECT_EDITOR_URL_PREFIX',
  function(UrlInterpolationService, OBJECT_EDITOR_URL_PREFIX) {
    return {
      restrict: 'E',
      scope: {},
      bindToController: {
        value: '='
      },
      templateUrl: UrlInterpolationService.getExtensionResourceUrl(
        '/objects/templates/list_editor_directive.html'),
      controllerAs: '$ctrl',
      controller: [function() {
        var ctrl = this;
        ctrl.SCHEMA = {
          type: 'list',
          items: {
            type: 'dict',
            properties: [{
              name: 'title',
              description: 'Tab title',
              schema: {
                type: 'unicode',
                validators: [{
                  id: 'is_nonempty'
                }]
              }
            }, {
              name: 'content',
              description: 'Tab content',
              schema: {
                type: 'html',
                ui_config: {
                  hide_complex_extensions: true
                }
              }
            }]
          },
          ui_config: {
            add_element_text: 'Add new tab'
          }
        };

        if (!ctrl.value) {
          ctrl.value = [];
        }
      }]
    };
  }]);
