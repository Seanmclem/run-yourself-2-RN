import * as React from 'react';
import renderer from 'react-test-renderer';

import { ButtonArea } from '../TimerCounter/ButtonArea';

describe(`ButtonArea tests`, () => {
    it(`renders correctly`, () => {
        const tree = renderer.create(<ButtonArea />).toJSON();

        expect(tree).toMatchSnapshot();
    });
})


