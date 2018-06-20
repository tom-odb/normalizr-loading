import { combineSelectors } from '../../store/utils/selector';

import {
  heroesDetail,
  heroesDetailLoading,
  heroesDetailError,
  heroesDetailMeta,
} from './detail/selectors';
import {
  heroesList,
  heroesListLoading,
  heroesListError,
  heroesListMeta,
  heroesListPagination,
} from './list/selectors';

export const heroesSelector = combineSelectors({
  detail: {
    result: heroesDetail,
    loading: heroesDetailLoading,
    error: heroesDetailError,
    meta: heroesDetailMeta,
  },
  list: {
    result: heroesList,
    loading: heroesListLoading,
    error: heroesListError,
    meta: heroesListMeta,
    pagination: heroesListPagination,
  },
}, { entry: 'heroes' });
