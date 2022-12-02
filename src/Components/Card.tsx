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
								<h2>{item.id}</h2>
								<img
									src={item.sprites.front_default}
									alt='pokemon'
								/>
								<h3>{item.species.name}</h3>
							</div>
						</>
					)
				})
			)}
		</>
	)
}

export default Card
