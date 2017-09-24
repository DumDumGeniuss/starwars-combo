import React from "react";
import PropTypes from 'prop-types';
import logoImage from './logo.png';
import './MainLayout.css';

class MainLayout extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}
	componentDidMount() {
	}
	componentWillUnmount() {
	}
	render() {
		return (
			<div className={'MainLayout-mainZone'}>
				<navbar className={'MainLayout-navbar'}>
					<figure className={'MainLayout-logoZone'}>
						<img className={'MainLayout-logo'} src={logoImage} alt={'logo'}/>
					</figure>
				</navbar>
				{this.props.children}
			</div>
		);
	}
}

MainLayout.propTypes = {
	show: PropTypes.bool,
};

export default MainLayout;
