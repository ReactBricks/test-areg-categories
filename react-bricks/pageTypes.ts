import { fetchPage, fetchPages, types } from 'react-bricks/frontend'
import config from './config'

const pageTypes: types.IPageType[] = [
  {
    name: 'page',
    pluralName: 'pages',
    defaultLocked: false,
    defaultStatus: types.PageStatus.Published,
    getDefaultContent: () => [],
  },
  {
    name: 'blog',
    pluralName: 'Blog',
    defaultLocked: false,
    defaultStatus: types.PageStatus.Published,
    getDefaultContent: () => [],
    allowedBlockTypes: [
      'title',
      'paragraph',
      'big-image',
      'video',
      'code',
      'tweet',
      'tweet-light',
      'blog-title',
      'newsletter-subscribe',
      'external-data-example',
    ],
    getExternalData: () =>
      fetch('https://catfact.ninja/fact')
        .then((response) => response.json())
        .then((data) => ({
          catFact: data.fact,
        })),
  },
  {
    name: 'layout',
    pluralName: 'layout',
    defaultLocked: false,
    defaultStatus: types.PageStatus.Published,
    getDefaultContent: () => [],
    isEntity: true,
  },
  {
    name: 'bike',
    pluralName: 'Bikes',
    defaultLocked: false,
    defaultStatus: types.PageStatus.Published,
    getDefaultContent: () => [],
    customFields: [
      {
        name: 'bikeId',
        label: 'Bike ID',
        type: types.SideEditPropType.Text,
      },
      {
        name: 'categoryId',
        label: 'Category ID',

        type: types.SideEditPropType.Select,
        selectOptions: {
          display: types.OptionsDisplay.Select,
          getOptions: async () => {
            const bikeCategories = await fetchPages(config.apiKey, {
              type: 'bikeCategory',
            }).then((pages) =>
              pages.map((page) => ({
                value: page.customValues.categoryId,
                label: page.name,
              }))
            )
            return [
              { value: '', label: '-- Select a category --' },
              ...bikeCategories,
            ]
          },
        },
      },
    ],
    getExternalData: (page) =>
      fetch(`https://pokeapi.co/api/v2/pokemon/${page.customValues?.bikeId}`)
        .then((response) => response.json())
        .then((data) => ({
          ...data,
          imageUrl: `https://img.pokemondb.net/artwork/large/${data.name}.jpg`,
        }))
        .catch((error) => {
          console.log(error)
          return {}
        }),
  },
  {
    name: 'bikeCategory',
    pluralName: 'Bike Categories',
    defaultLocked: false,
    defaultStatus: types.PageStatus.Published,
    getDefaultContent: () => [],
    customFields: [
      {
        name: 'categoryId',
        label: 'Category ID',
        type: types.SideEditPropType.Text,
      },
    ],
    getExternalData: (page) =>
      fetchPages(config.apiKey, {
        type: 'bike',
        filterBy: {
          categoryId: page.customValues?.categoryId,
        },
      }),
  },
  { name: 'dealerHero', pluralName: 'dealerHeros', isEntity: true },
]

export default pageTypes
