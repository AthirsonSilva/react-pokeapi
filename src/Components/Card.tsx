import React from 'react'

const Card = ({
	pokemon,
	loading,
	infoPokemon
}: {
	pokemon: any[]
	loading: boolean
	infoPokemon: (pokemon: any) => void
}): JSX.Element => {
	const animatedImageBaseURL = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/'

	const getAnimatedImage = (id: number): string => {
		// return `https://www.pokencyclopedia.info/sprites/3ds/ani_6/3ani__0${id}__xy.gif`
		return `${animatedImageBaseURL}${id}.gif`
	}

	return (
		<>
			{loading ? (
				<h1>Loading...</h1>
			) : (
				pokemon.map((item: any): JSX.Element => {
					return (
						<>
							<div
								className='card'
								key={item.id}
								onClick={(): void => infoPokemon(item)}
							>
								<h3>{item.species.name}</h3>
								<img
									className=''
									src={getAnimatedImage(item.id)}
									width={60}
									alt='pokemon'
								/>
							</div>
						</>
					)
				})
			)}
		</>
	)
}

export default Card
