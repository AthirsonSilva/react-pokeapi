import React from 'react'
import Card from './Card'
import Pokeinfo from './Pokeinfo'

const Main = (): JSX.Element => {
	const [pokedata, setPokedata] = React.useState<any[]>([])
	const [loading, setLoading] = React.useState<boolean>(true)
	const [url, setUrl] = React.useState<string>(
		'https://pokeapi.co/api/v2/pokemon/'
	)
	const [nextUrl, setNextUrl] = React.useState<string>('')
	const [previousUrl, setPreviousUrl] = React.useState<string>('')
	const [pokeDex, setPokeDex] = React.useState<any[]>([])

	const fetchPokemons = async (): Promise<void> => {
		fetch(url)
			.then((res) => res.json())
			.then((data) => {
				setNextUrl(data.next)
				setPreviousUrl(data.previous)
				getPokemon(data.results)
				setLoading(false)
			})
	}

	const getPokemon = async (data: any): Promise<void> => {
		data.map(async (item: any): Promise<void> => {
			const result = await fetch(item.url)
			const pokemon = await result.json()

			setPokedata((pokedata: any): any[] => {
				pokedata = [...pokedata, pokemon]
				pokedata.sort((a: any, b: any) => a.id - b.id)

				// remove duplicates
				const unique = pokedata.filter(
					(item: any, index: number): boolean => {
						return (
							pokedata.findIndex(
								(item2: any): boolean => item2.id === item.id
							) === index
						)
					}
				)

				return unique
			})
		})
	}

	React.useEffect((): void => {
		fetchPokemons()
	}, [url])

	return (
		<>
			<div className='container'>
				<div className='left-content'>
					<Card
						pokemon={pokedata}
						loading={loading}
						infoPokemon={(pokemon) => setPokeDex(pokemon)}
					/>
					<div className='btn-group'>
						<button>Previous</button>
						<button>Next</button>
					</div>
				</div>
				<div className='right-content'>
					<Pokeinfo data={pokeDex} />
				</div>
			</div>
		</>
	)
}

export default Main
