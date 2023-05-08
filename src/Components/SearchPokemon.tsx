import React from 'react'

const SearchPokemon = ({ pokeData, setPokeData }:
	{
		pokeData: any[],
		setPokeData: (pokeData: any[]) => void
	}): JSX.Element => {
	const [search, setSearch] = React.useState<string>('')
	const [previousState, setPreviousState] = React.useState<any[]>(pokeData)

	const searchPokemon = (search: string): void => {
		setSearch(search)

		if (search === '') {
			setPokeData(previousState)
		} else {
			const filteredPokemon = previousState.filter((item: any): boolean => {
				return item.species.name.includes(search)
			})

			setPokeData(filteredPokemon)

			if (filteredPokemon.length === 0) {
				setPokeData(previousState)
			}
		}
	}

	return (
		<div className='search flex justify-center items-center'>
			<input onChange={(e) => searchPokemon(e.target.value)} type='text' placeholder='Search Pokemon' />
		</div>
	)
}

export default SearchPokemon