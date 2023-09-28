import { GetStaticProps } from 'next'
import React from 'react'
import {
  PageViewer,
  cleanPage,
  fetchPage,
  useReactBricksContext,
} from 'react-bricks'
import axios from 'axios'
import config from '../react-bricks/config'

const Dealer = ({ dealerData, dealerHero }) => {
  const { pageTypes, bricks } = useReactBricksContext()
  const dealerHeroOk = dealerHero
    ? cleanPage(dealerHero, pageTypes, bricks)
    : null
  return (
    <div>
      <PageViewer page={dealerHeroOk} />
      <p className="mt-12">This is the dealer data</p>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  let errorNoKeys: boolean = false
  let errorDealerHero: boolean = false

  if (!config.apiKey) {
    errorNoKeys = true
    return { props: { errorNoKeys } }
  }

  const [dealerData, dealerHero] = await Promise.all([
    (await axios.get('https://pokeapi.co/api/v2/pokemon/pikachu')).data,

    fetchPage('dealer-hero', config.apiKey, context.locale).catch(() => {
      errorDealerHero = true
      return {}
    }),
  ])

  return {
    props: {
      dealerData,
      dealerHero,
    },
  }
}

export default Dealer
