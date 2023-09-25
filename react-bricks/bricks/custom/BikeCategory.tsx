import React from 'react'
import { types } from 'react-bricks/frontend'
import Section from '../react-bricks-ui/shared/components/Section'
import Container from '../react-bricks-ui/shared/components/Container'

interface BikeCategoryProps {
  pages: any
}

const BikeCategory: types.Brick<BikeCategoryProps> = ({ pages }) => {
  if (pages.length === 0) return null
  console.log(pages)
  return (
    <Section>
      <Container>
        {pages.map((page) => (
          <p key={page?.name} className="text-center">
            # {page?.name}
            <img
              className="w-32 h-32 my-8 ml-auto mr-auto"
              src={`https://img.pokemondb.net/artwork/large/${page.customValues?.bikeId}.jpg`}
            />
          </p>
        ))}
      </Container>
    </Section>
  )
}

BikeCategory.schema = {
  name: 'BikeCategory',
  label: 'Bike Category',
  mapExternalDataToProps: (externalData, brickProps) => ({
    pages: Object.values(externalData),
  }),

  // Sidebar Edit controls for props
  sideEditProps: [],
}

export default BikeCategory
