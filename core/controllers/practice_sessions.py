# Copyright 2018 The Oppia Authors. All Rights Reserved.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#      http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS-IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

"""Controllers for the practice sessions page."""

from constants import constants
from core.controllers import acl_decorators
from core.controllers import base
from core.domain import topic_services
import feconf


class PracticeSessionsPage(base.BaseHandler):
    """Renders the practice sessions page."""

    @acl_decorators.can_access_topic_viewer_page
    def get(self, topic_name):
        """Handles GET requests."""

        if not constants.ENABLE_NEW_STRUCTURE_PLAYERS:
            raise self.PageNotFoundException

        topic = topic_services.get_topic_by_name(topic_name)

        if topic is None:
            raise self.PageNotFoundException(
                Exception('The topic with the given name doesn\'t exist.'))

        self.render_template('dist/practice_session.html')


class PracticeSessionsPageDataHandler(base.BaseHandler):
    """Fetches relevant data for the practice sessions page."""

    GET_HANDLER_ERROR_RETURN_TYPE = feconf.HANDLER_TYPE_JSON

    @acl_decorators.can_access_topic_viewer_page
    def get(self, topic_name):

        if not constants.ENABLE_NEW_STRUCTURE_PLAYERS:
            raise self.PageNotFoundException

        topic = topic_services.get_topic_by_name(topic_name)
        skills_of_topic = topic.get_all_skill_ids()

        if topic is None:
            raise self.PageNotFoundException(
                Exception('The topic with the given name doesn\'t exist.'))
        topic_name = topic.name

        self.values.update({
            'topic_name': topic.name,
            'skill_list': skills_of_topic
        })
        self.render_json(self.values)
