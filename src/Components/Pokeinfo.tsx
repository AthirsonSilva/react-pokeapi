import React from 'react'

const Pokeinfo = ({
	pokemon,
	loading
}: {
	pokemon: any[]
	loading: boolean
}): JSX.Element => {
	return (
		<>
			{loading ? (
				<h1>Loading...</h1>
			) : (
				pokemon.map((item: any): JSX.Element => {
					return (
						<>
							<h1>{item.species.name}</h1>
							<img
								src={item.sprites.front_default}
								alt={item.species.name}
							/>
							<div className='abilities'>
								<div className='group'>
									<h2>Blaze</h2>
								</div>
								<div className='group'>
									<h2>Solar Power</h2>
								</div>
							</div>
							<div className='base-stat'>
								<h3>HP: 30</h3>
								<h3>Attack: 52</h3>
								<h3>Defense: 43</h3>
								<h3>Special attack: 60</h3>
								<h3>Special defense: 50</h3>
								<h3>Speed: 65</h3>
							</div>
						</>
					)
				})
			)}
		</>
	)
}

export default Pokeinfo
