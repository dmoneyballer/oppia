// Copyright 2018 The Oppia Authors. All Rights Reserved.
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

require('services/ImprovementsService.ts');

describe('ImprovementsService', function() {
  beforeEach(angular.mock.module('oppia'));
  beforeEach(angular.mock.inject(function($injector) {
    this.ImprovementsService = $injector.get('ImprovementsService');
  }));

  describe('.isStateForcedToResolveOutstandingUnaddressedAnswers', function() {
    it('returns true for states with TextInput interactions', function() {
      var mockState = {interaction: {id: 'TextInput'}};

      expect(
        this.ImprovementsService
          .isStateForcedToResolveOutstandingUnaddressedAnswers(mockState)
      ).toBe(true);
    });

    it('returns false for states with FractionInput interactions', function() {
      var mockState = {interaction: {id: 'FractionInput'}};

      expect(
        this.ImprovementsService
          .isStateForcedToResolveOutstandingUnaddressedAnswers(mockState)
      ).toBe(false);
    });
  });
});
