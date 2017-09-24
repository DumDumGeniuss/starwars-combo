import React from "react";
import StarWarsZone from '../../zones/StarWarsZone/StarWarsZone.js';
import ArrowUp from 'react-icons/lib/fa/arrow-up';
import ArrowDown from 'react-icons/lib/fa/arrow-down';
import './HomePage.css';
import lyrics from './lyrics';

class HomePage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			currentLockZone: 0
		};
		this.totalZone = 1;
	}
	componentDidMount() {
		const queryParams = new URLSearchParams(this.props.location.search);
		if (queryParams.get('zone')) {
			this.setState ({
				currentLockZone: parseInt(queryParams.get('zone'), 10)
			});
		}
	}
	componentWillUnmount() {
	}
	changeZone(isDown) {
		let nextZone;

		if (isDown) {
			nextZone = this.state.currentLockZone + 1
			if (nextZone >= this.totalZone) {
				nextZone = 0;
			}
		} else {
			nextZone = this.state.currentLockZone - 1
			if (nextZone < 0) {
				nextZone = this.totalZone - 1;
			}
		}
		this.setState({
			currentLockZone: nextZone
		});
	}

	render() {
		return (
			<div ref={'mainZone'} className={'HomePage-mainZone'}>
				<div className={'HomePage-zoneControl'}>
					<ArrowUp onClick={this.changeZone.bind(this, false)} className={'HomePage-arrow'}/>
					<ArrowDown onClick={this.changeZone.bind(this, true)} className={'HomePage-arrow'}/>
				</div>
				{
					lyrics.map((lyric, index) => (
            <StarWarsZone
              ref={'firstZone'}
              width={100}
              widthUnit={'%'}
              height={100}
              heightUnit={'vh'}
              backgroundColor={'black'}
              position={'absolute'}
              top={this.state.currentLockZone === index ? index : 100}
              topUnit={'%'}
              playVideo={this.state.currentLockZone === 0}
              lyrics={lyric}
            />
          ))
				}
			</div>
		);
	}
}

HomePage.propTypes = {};

export default HomePage;
