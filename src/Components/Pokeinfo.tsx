import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react'
import { ProgressBar } from 'react-bootstrap'
import InfoModal from './InfoModal'

const Pokeinfo = ({ data }: any): JSX.Element => {
	const [show, setShow] = React.useState<boolean>(false)
	const handleClose = () => setShow(false)
	const handleShow = () => setShow(true)
	const typeColors = new Map<string, string>([
		['normal', '#A8A77A'],
		['fire', '#EE8130'],
		['water', '#6390F0'],
		['electric', '#F7D02C'],
		['grass', '#7AC74C'],
		['ice', '#96D9D6'],
		['fighting', '#C22E28'],
		['poison', '#A33EA1'],
		['ground', '#E2BF65'],
		['flying', '#A98FF3'],
		['psychic', '#F95587'],
		['bug', '#A6B91A'],
		['rock', '#B6A136'],
		['ghost', '#735797'],
		['dragon', '#6F35FC'],
		['dark', '#705746'],
		['steel', '#B7B7CE'],
		['fairy', '#D685AD'],
		['unknown', '#FFFFFF'],
	])

	const getColor = (type: string): string => {
		return typeColors.get(type) || typeColors.get('unknown')!
	}

	const getProgressBarVariant = (stat: number): string => {
		if (stat <= 20) return 'danger'
		if (stat <= 40) return 'warning'
		if (stat <= 60) return 'info'
		if (stat <= 80) return 'primary'

		return 'success'
	}

	const formatName = (name: string): string => {
		name = name.replace(/-/g, ' ')

		return name.replace(/\b\w/g, (txt: string) => {
			return txt.toUpperCase()
		})
	}

	return (
		<>
			{data.length === 0 ? (
				<>
					<h5>Click on a pokemon to see more info</h5>
				</>
			) : (
				<>
					<h1 style={{
						marginLeft: '2.5vw',
					}} className='pokemon-name'>
						{data.name.toString()} - #{data.id}
					</h1>
					<img src={data.sprites.front_default} alt='pokemon' />
					<section className='grid grid-rows-2 mb-16'>
						<div className='types grid grid-flow-col'>
							{data.types.map((item: any) => {
								return (
									<>
										<div style={{
											backgroundColor: getColor(item.type.name)
										}} className='group text-sm'>
											<p style={{ fontSize: '9pt' }} className="text-lg font-medium">{item.type.name}</p>
										</div>
									</>
								)
							})}
						</div>
						<div className='abilities grid grid-flow-col'>
							{data.abilities.map((item: any): JSX.Element => {
								return (
									<>
										<div style={{
											backgroundColor: '#F7D02C'
										}} className='group font-semibold px-2 flex align-middle text-center'>
											<p style={{ fontSize: '9pt' }} className="text-lg font-medium">{item.ability.name}</p>
										</div>
									</>
								)
							})}
						</div>
						<div>
							<button
								style={{
									width: '65%',
									marginTop: -10,
									marginLeft: '.25vw',
								}}
								className='btn btn-primary px-4 py-2 rounded-md'
								onClick={(): void => {
									handleShow()
								}}
							>
								Show more info
							</button>
						</div>
						<div className="max-h-40 mb-20">
							{data.stats.map((item: any): JSX.Element => <ProgressBar style={{
								width: '66%',
							}} className='my-2 ml-96' variant={
								getProgressBarVariant(item.base_stat)
							} now={item.base_stat} label={formatName(item.stat.name)} />)}
						</div>
					</section>


					<InfoModal
						show={show}
						data={data}
						handleClose={handleClose}
					/>
				</>
			)}
		</>
	)
}

export default Pokeinfo
