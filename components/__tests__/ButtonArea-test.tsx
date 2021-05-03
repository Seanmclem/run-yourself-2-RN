import * as React from 'react';
import renderer from 'react-test-renderer';

import { ButtonArea, ButtonAreaProps } from '../TimerCounter/ButtonArea';

describe(`ButtonArea tests`, () => {
    it(`renders correctly`, () => {
        const buttonAreaProps: ButtonAreaProps = {
            startTimer: () => null,
            nextLap: () => null,
            stopTimer: () => null,
        }
        const tree = renderer.create(<ButtonArea {...buttonAreaProps} />).toJSON();

        expect(tree).toMatchSnapshot();
    });
})


