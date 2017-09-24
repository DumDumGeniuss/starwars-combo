import React from 'react';
import PropTypes from 'prop-types';
import Pause from 'react-icons/lib/fa/pause';
import Play from 'react-icons/lib/fa/play';
import './StarWarsZone.css';
import starAudio from './starwars.mp3';
import starLog from './starwars.png';

class StarWarsZone extends React.Component {
	constructor() {
		super()
		this.state = {
			starWarScrollMarginTop: 0,
			starWarViewRotate: 0,
			movieStatus: false,
			starWarLogoZ: 0,
			starWarLogoFadeOut: false
		};
		this.switchScroll = this.switchScroll.bind(this);
		this.switchMoveStarWarLogoZ = this.switchMoveStarWarLogoZ.bind(this);
		this.switchAnimation = this.switchAnimation.bind(this);
		this.switchStarWarsAudio = this.switchStarWarsAudio.bind(this);
	}
	componentDidMount() {
		this.startWarsAudio = document.getElementById('star-wars-audio');

		this.starWarScrollHeight = this.refs.starWarScroll.getBoundingClientRect().height;
		this.starWarViewHeight = this.refs.startWarView.getBoundingClientRect().height;

		this.initialStarWarsScroll();
	}
	componentWillUnmount() {
		this.switchScroll(false);
	}
	componentWillReceiveProps(nextProps) {
		const newPlayVideo = nextProps.playVideo;
		const oldPlayVideo = this.props.playVideo;
		if (newPlayVideo !== oldPlayVideo) {
			if (newPlayVideo) {
				// this.switchAnimation(true);
			} else {
				this.switchAnimation(false);
			}
		}
	}
	switchAnimation(play) {
		if (play) {
			if (this.scrollInterval !== undefined) {
				this.switchScroll(true);
			}
			this.switchMoveStarWarLogoZ(true);
			this.switchStarWarsAudio(true);
			this.setState({
				movieStatus: true
			});
		} else {
			this.switchScroll(false);
			this.switchMoveStarWarLogoZ(false);
			this.switchStarWarsAudio(false);
			this.setState({
				movieStatus: false
			});
		}
	}
	switchStarWarsAudio(play, reset) {
		if (reset) {
			this.startWarsAudio.currentTime = 0;
			return;
		}
		if (play) {
			this.startWarsAudio.play();
		} else {
			this.startWarsAudio.pause();
		}
	}
	initialStarWarLogoZ() {
		this.setState({
			starWarLogoZ: 0,
			starWarLogoFadeOut: false
		});
	}
	switchMoveStarWarLogoZ(play) {
		const self = this;
		if (play) {
			this.moveLogoZ = setInterval(() => {
				const currentZ = self.state.starWarLogoZ;
				self.setState({
					starWarLogoZ: currentZ - 5
				});
				if (self.scrollInterval === undefined && currentZ < - 500) {
					self.switchScroll(true);
				}
				if (currentZ < -3500) {
					self.setState({
						starWarLogoFadeOut: true
					});
				}
			}, 15);
		} else {
			clearInterval(this.moveLogoZ);
		}
	}
	initialStarWarsScroll() {
		this.setState({
			starWarScrollMarginTop: this.starWarViewHeight*1,
			starWarViewRotate: 60
		});
	}
	switchScroll(play) {
		const self = this;
		if (play) {
			this.scrollInterval = setInterval(() => {
				self.setState({
					starWarScrollMarginTop: self.state.starWarScrollMarginTop - 1,
					movieStatus: true
				});
				if(self.state.starWarScrollMarginTop < -self.starWarScrollHeight ) {
					self.switchAnimation(false);
					self.initialStarWarsScroll();
					self.initialStarWarLogoZ();
					self.switchStarWarsAudio(null, true);
				}
			}, 15);
		} else {
			clearInterval(this.scrollInterval);
		}
	}
	render() {
		const zoneSize = {
			width: this.props.width + this.props.widthUnit,
			height: this.props.height + this.props.heightUnit,
			backgroundColor: this.props.backgroundColor,
			position: this.props.position,
			top: this.props.top + this.props.topUnit,
		};
		const starWarLogoClass = this.state.starWarLogoFadeOut ? 'starWarLogo starWarLogoFadeOut' : 'starWarLogo';

		return (
			<div style={zoneSize} className={'mainArea'}>
				<audio ref={'star-wars-audio'} id="star-wars-audio" className={'starWarsAudio'} loop>
				  <source src={starAudio} type="audio/mpeg"/>
				</audio>
				<div 
					className={'functionIcon pauseIcon'}
					style={ {display: this.state.movieStatus?'initial':'none'} }
					onClick={this.switchAnimation.bind(this, false)}
				>
					<Pause />
				</div>
				<div
					className={'functionIcon pauseIcon'}
					style={ {display: !this.state.movieStatus?'initial':'none'} }
					onClick={this.switchAnimation.bind(this, true)}
				>
					<Play />
				</div>
				<figure style={ {transform: 'translateZ(' + this.state.starWarLogoZ + 'px)'} } className={starWarLogoClass}>
					<img src={starLog} alt={'DumDumGenius Logo'}/>
				</figure>
				<div
					ref={'startWarView'}
					style={ {transform: 'rotateX(' + this.state.starWarViewRotate + 'deg)'} }
					className={'starWarView'}
				>
					<div ref={'starWarScroll'} style={{marginTop: this.state.starWarScrollMarginTop + 'px'}}>
						<b>
							<p className={'paragraph'}  dangerouslySetInnerHTML={{__html: this.props.lyrics }} />
						</b>
					</div>
				</div>
			</div>
		);
	}
}

StarWarsZone.propTypes = {
	width: PropTypes.number,
	widthUnit: PropTypes.string,
	height: PropTypes.number,
	heightUnit: PropTypes.string,
	backgroundColor: PropTypes.string,
	position: PropTypes.string,
	top: PropTypes.number,
	topUnit: PropTypes.string,
	playVideo: PropTypes.bool,
	lyrics: PropTypes.string,
};

export default StarWarsZone;
