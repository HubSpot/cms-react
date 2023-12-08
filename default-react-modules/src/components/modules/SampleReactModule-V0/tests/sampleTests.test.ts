import { describe, expect, it } from 'vitest';
import { addNumbers } from '../InteractiveComponents/index.js';

// An example of what unit tests might look like with modules
describe('SampleReactModule', () => {
  describe('addTest', () => {
    it('will return itself if it only has one argument', () => {
      expect(addNumbers(1)).toEqual(1);
    });

    it('Will add any amount of numbers together', () => {
      expect(addNumbers(1, 2, 3)).toEqual(6);
    });
  });
});
