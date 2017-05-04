/* @flow */
import React from 'react'
import { storiesOf, action } from '@kadira/storybook'

import Icon from '../Icon'

storiesOf('Button', module).add('with text', () => (
  <Icon name="aaa" onClick={action('clicked')} />
))
