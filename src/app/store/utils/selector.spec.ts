import * as normalizr from 'normalizr';

import * as selectors from './selector';

describe('Store utils - Selector', () => {
  describe('parseToString', () => {
    it('should return the provided value if it is a string', () => {
      const foo = 'foo';

      expect(selectors.parseToString(foo)).toEqual(foo);
    });

    it('should parse the provided value to a string', () => {
      expect(selectors.parseToString('foo')).toEqual('foo');
      expect(selectors.parseToString(123)).toEqual('123');
      expect(selectors.parseToString([])).toEqual('[]');
      expect(selectors.parseToString(null)).toEqual('null');
      expect(selectors.parseToString(undefined)).toEqual('undefined');
    });
  });


  describe('createPropSelector', () => {
    it('should return the prop to select if progress is false', () => {
      expect(selectors.createPropSelector('foo')).toEqual('foo');
    });

    it('should return a progress path selector for the provided prop if progress is true', () => {
      expect(selectors.createPropSelector('foo', { progress: true })).toEqual(['foo', 'result']);
    });
  });

  describe('createPathSelector', () => {
    it('should return a path selector if the provided value is an array and progress is false', () => {
      expect(selectors.createPathSelector(['foo', 'bar'])).toEqual(['foo', 'bar']);
    });

    it('should attempt to map provided value (as a string) to a path if the provided value is not an array and progress is false', () => {
      expect(selectors.createPathSelector('foo.bar')).toEqual(['foo', 'bar']);
      expect(selectors.createPathSelector({ id: 1 })).toEqual(['{"id": 1}']);
      expect(selectors.createPathSelector(55.2)).toEqual(['55', '2']);
    });

    it('should return a progress path selector for the provided path if progress is true', () => {
      expect(selectors.createPathSelector('foo.bar', { progress: true })).toEqual(['foo', 'bar', 'result']);
    });
  });

  describe('createDenormalizedEntitySelector', () => {
    let mockSchema;
    let mockState;

    beforeEach(() => {
      mockSchema = new normalizr.schema.Entity('foo');
      mockState = {
        foo: ['test'],
        entities: {
          foo: {
            test: 'denormalized_test',
          },
        },
      };
    });

    it('should return a selector function', () => {
      expect(typeof selectors.createDenormalizedEntitySelector({
        schema: mockSchema,
      } as any)).toEqual('function');
    });

    it('should return a noopselector if no schema was provided', () => {
      expect(selectors.createDenormalizedEntitySelector({} as any)).toEqual(selectors.noopSelector);
    });

    it('should return a denormalized prop selector if prop was set', () => {
      const selector = selectors.createDenormalizedEntitySelector({
        prop: 'foo',
        schema: mockSchema,
      });

      expect(selector(mockState)).toEqual(['denormalized_test']);
    });

    it('should return a denormalized path selector if path was set', () => {
      const selector = selectors.createDenormalizedEntitySelector({
        path: 'foo.bar',
        schema: mockSchema,
      });

      expect(selector({
        foo: {
          bar: ['test']
        },
        entities: {
          foo: {
            test: 'denormalized_test',
          },
        },
      })).toEqual(['denormalized_test']);
    });

    it('should return a single denormalized item', () => {
      const selector = selectors.createDenormalizedEntitySelector({
        prop: 'foo',
        schema: mockSchema,
      });

      expect(selector({
        foo: 'test',
        entities: {
          foo: {
            test: 'denormalized_test',
          },
        },
      })).toEqual('denormalized_test');
    });

    it('should return the last memoized state if the state hasn\'t changed', () => {
      const selector = selectors.createDenormalizedEntitySelector({
        prop: 'foo',
        schema: mockSchema,
      });

      const lastState = selector(mockState);

      expect(selector(mockState)).toBe(lastState);
    });

    it('should return null when the lastState was empty', () => {
      const selector = selectors.createDenormalizedEntitySelector({
        prop: 'foo',
        schema: mockSchema,
      });

      const lastState = selector({
        foo: undefined,
        entities: {
          foo: {
            test: 'denormalized_test',
          },
        },
      });

      expect(lastState).toBeNull();

      expect(selector({
        foo: null,
        entities: {
          foo: {
            test: 'denormalized_test',
          },
        },
      })).toBeNull();
    });

    it('should return null if the item was not found in the entities', () => {
      const selector = selectors.createDenormalizedEntitySelector({
        prop: 'foo',
        schema: mockSchema,
      });

      expect(selector({
        foo: 'test',
        entities: {
          foo: {},
        },
      })).toBeNull();
    });
  });

  describe('noopSelector', () => {
    it('should return a selector that returns the provided state', () => {
      const mockState = { foo: 'bar' };

      expect(selectors.noopSelector(mockState)).toBe(mockState);
    });
  });

  describe('createSelector', () => {
    it('should return a denormalized selector if entity is provided', () => {
      const mockSchema = new normalizr.schema.Entity('foo');

      expect(typeof selectors.createSelector({
        entity: {
          schema: mockSchema,
        }
      })).toEqual('function');
    });

    it('should return a path selector if path is provided', () => {
      expect(selectors.createSelector({
        path: 'foo.bar',
      })).toEqual(['foo', 'bar']);
    });

    it('should return a prop selector if prop is provided', () => {
      expect(selectors.createSelector({
        prop: 'foo',
      })).toEqual('foo');
    });

    it('should return a selectors.noopselector if no valid config is provided', () => {
      expect((selectors.createSelector as any)()).toBe(selectors.noopSelector);
    });
  });

  describe('createEntrySelector', () => {
    it('should return the provided value if no case matches', () => {
      const mockData = false;

      expect(selectors.createEntrySelector(mockData, 'bar')).toBe(mockData);
    });

    it('should return a path selector for the provided prop and entry point', () => {
      expect(selectors.createEntrySelector('foo', 'bar')).toEqual(['bar', 'foo']);
    });

    it('should return a path selector for the provided path and entry point', () => {
      expect(selectors.createEntrySelector('foo.test', 'bar')).toEqual(['bar', 'foo', 'test']);
    });

    it('should return a wrapped denormalized selector for the provided selector and entry point', () => {
      const mockSelector = jasmine.createSpy().and.returnValue(['denormalized_test']);
      const mockState = {
        bar: {
          foo: ['test'],
        },
        entities: {
          foo: {
            test: 'denormalized_test',
          },
        },
      };

      const selector = selectors.createEntrySelector(mockSelector, 'bar');

      expect(selector(mockState)).toEqual(['denormalized_test']);
      expect(mockSelector).toHaveBeenCalledWith({
        foo: ['test'],
        entities: jasmine.any(Object),
      });
    });
  });

  describe('combineSelectors', () => {
    it('should return the selectors if no entry point was provided', () => {
      const s = {
        foo: 'bar',
      };

      expect(selectors.combineSelectors(s)).toBe(s);
    });

    it('should recursively create entry selectors for the provided selectors', () => {
      const createSpy = spyOn(selectors, 'createEntrySelector').and.callThrough(); // can't mock these to test recursive aspect
      const combineSpy = spyOn(selectors, 'combineSelectors').and.callThrough();

      selectors.combineSelectors({
        one: 'one',
        two: ['one', 'two'],
        three: (state) => state.three,
        four: {
          five: 'five',
          six: ['five', 'six'],
        },
      }, { entry: 'foo' });

      expect(createSpy).toHaveBeenCalledTimes(6);
      expect(combineSpy).toHaveBeenCalledTimes(2);
    });
  });
});
