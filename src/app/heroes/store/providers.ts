import { HeroesListActions } from './list/actions';
import { HeroesDetailActions } from './detail/actions';
import { HeroRepository } from './repository';

export const HeroesProviders = [
  HeroesListActions,
  HeroesDetailActions,
  HeroRepository,
];
