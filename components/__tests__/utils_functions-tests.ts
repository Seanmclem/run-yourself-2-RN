import renderer from 'react-test-renderer';
import { getNowTimestamp, msDifferenceToCounter } from '../../utils/functions';

describe(`Utils-Functions`, () => {
    describe(`getNowTimestamp`, () => {
        it(`gets proper value`, () => {
            const nowTime = getNowTimestamp()
            expect(nowTime.toString()).toHaveLength(13)
        });
    })

    describe(`msDifferenceToCounter:`, () => {
        it('has 4 children', () => {
            const tree: any = renderer.create(msDifferenceToCounter(100)).toJSON();
            expect(tree.children.length).toBe(4);
        });
        it('hides milliseconds', () => {
            const tree: any = renderer.create(msDifferenceToCounter(100, true)).toJSON();
            expect(JSON.stringify(tree.children?.[3]?.children)).toBe(JSON.stringify(['']));
        });
        it('shows 10 millesconds', () => {
            const tree: any = renderer.create(msDifferenceToCounter(100)).toJSON();
            expect(JSON.stringify(tree.children?.[3]?.children)).toBe(JSON.stringify([':10']));
        });
    })
})


