import env = require('../config/env');
const { ENV } = env;
import type { CharacterDTO, CharacterListDTO } from '../dtos/character.dto';

interface RawCharacter {
  id: number
  name: string
  status: string
  species: string
  image: string
}

interface RawResponse {
  info: {
    count: number
    pages: number
    next: string | null
    prev: string | null
  }
  results: RawCharacter[]
}

const toDTO = (raw: RawCharacter): CharacterDTO => ({
  id: raw.id,
  name: raw.name,
  status: raw.status as CharacterDTO['status'],
  species: raw.species,
  image: raw.image,
})

const getCharacters = async (params: {
  name?: string | undefined
  status?: string | undefined
  species?: string | undefined
  page?: string | undefined
}): Promise<CharacterListDTO> => {
  const query = new URLSearchParams()
  if (params.name)    query.append('name', params.name)
  if (params.status)  query.append('status', params.status)
  if (params.species) query.append('species', params.species)
  if (params.page)    query.append('page', params.page)

  const url = `${ENV.RICK_API_URL}/character?${query.toString()}`
  const response = await fetch(url)

  if (!response.ok) {
    if (response.status === 404) {
      return { info: { count: 0, pages: 0, next: null, prev: null }, results: [] }
    }
    throw new Error(`Error from Rick and Morty API: ${response.status}`)
  }

  const data: RawResponse = await response.json()

  return {
    info: data.info,
    results: data.results.map(toDTO),
  }
}

export = { getCharacters };
