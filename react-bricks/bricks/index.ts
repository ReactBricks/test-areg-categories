import { types } from 'react-bricks/frontend'

import HeroUnit from './custom/MyHeroUnit'
import reactBricksUITheme from './react-bricks-ui'
import Pokemon from './custom/Pokemon'
import BikeCategory from './custom/BikeCategory'

const bricks: types.Theme[] = [
  reactBricksUITheme, // React Bricks UI
  {
    themeName: 'Default',
    categories: [
      {
        categoryName: 'Hero sections',
        bricks: [HeroUnit], // Custom Bricks
      },
      { categoryName: 'Demo', bricks: [Pokemon, BikeCategory] },
    ],
  },
]

export default bricks
