import React from 'react'
import { Text, types } from 'react-bricks/frontend'
import Section from '../react-bricks-ui/shared/components/Section'
import Container from '../react-bricks-ui/shared/components/Container'

interface PokemonProps {
  id: number
  name: string
  height: number
  weight: number
  imageUrl: string
}

const Pokemon: types.Brick<PokemonProps> = ({
  id,
  name,
  height,
  weight,
  imageUrl,
}) => {
  if (!id) return null
  return (
    <Section>
      <Container>
        <img src={imageUrl} className="mx-auto w-36 mb-4" />
        <Text
          propName="name"
          placeholder="Type a name..."
          renderBlock={({ children }) => (
            <h1 className="text-5xl font-extrabold text-center mb-6">
              {children}
            </h1>
          )}
        />

        <p className="text-center">
          #{id} - Height {height / 10} m - Weight {weight / 10} Kg
        </p>
      </Container>
    </Section>
  )
}

Pokemon.schema = {
  name: 'pokemon',
  label: 'Pokemon',
  mapExternalDataToProps: (externalData, brickProps) => ({
    id: externalData.id,
    name: externalData.name,
    height: externalData.height,
    weight: externalData.weight,
    imageUrl: externalData.imageUrl,
  }),

  // Sidebar Edit controls for props
  sideEditProps: [],
}

export default Pokemon
