import { EquipmentActressFilter, NameActressFilter } from '@peach/types';
import { Resolvers } from '../../../generated/resolver-types';

export const actressFiltersResolvers: Resolvers = {
  Query: {
    actressFilters: (_parent, { query }) => {
      if (query === '') return [];

      const nameFilter: NameActressFilter = {
        __typename: 'NameActressFilter',
        name: query,
      };

      const dickFilter: EquipmentActressFilter = {
        __typename: 'EquipmentActressFilter',
        type: 'Dick',
      };

      const pussyFilter: EquipmentActressFilter = {
        __typename: 'EquipmentActressFilter',
        type: 'Pussy',
      };

      return [
        nameFilter,
        ...('dick'.startsWith(query.toLowerCase()) ? [dickFilter] : []),
        ...('pussy'.startsWith(query.toLowerCase()) ? [pussyFilter] : []),
      ];
    },
  },
};
