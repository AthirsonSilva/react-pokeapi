import React from 'react'
import Card from './Card'
import Pokeinfo from './Pokeinfo'

const Main = (): JSX.Element => {
	return (
		<>
			<div className='container'>
				<div className='left-content'>
					<Card />
					<div className='btn-group'>
						<button>Previous</button>
						<button>Next</button>
					</div>
				</div>
				<div className='right-content'>
					<Pokeinfo />
				</div>
			</div>
		</>
	)
}

export default Main
