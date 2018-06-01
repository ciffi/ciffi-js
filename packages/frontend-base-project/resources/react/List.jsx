import React from 'react';
import {render} from 'react-dom';

export default (function () {
	
	class Title extends React.Component {
		render() {
			return (
				<h1>Config for {this.props.text}</h1>
			);
		}
	}
	
	class Toggler extends React.Component {
		
		render() {
			
			let _text = !this.props.isActive ? this.props.activeText : this.props.defaultText;
			
			return (
				<button type={`button`} onClick={this.props.onClick}>{_text}</button>
			);
		}
	}
	
	class Item extends React.Component {
		render() {
			return (
				<li>
					<strong>{this.props.name}</strong>: {this.props.value}
				</li>
			);
		}
	}
	
	class List extends React.Component {
		render() {
			
			let _list = [];
			
			Object.entries(this.props.items).map(item => {
				if (typeof item[0] !== 'object' && typeof item[1] !== 'object') {
					_list.push(<Item key={item[0]} name={item[0]} value={item[1]}/>);
				} else {
					Object.entries(item[1]).map(childItem => {
						if (typeof childItem[0] !== 'object' && typeof childItem[1] !== 'object') {
							_list.push(<Item key={childItem[0]} name={`${item[0]} - ${childItem[0]}`}
							                 value={childItem[1]}/>);
						}
					});
				}
			});
			
			let _opacity = this.props.isVisible ? 1 : 0;
			
			return (
				<ul style={{opacity: _opacity}}>
					{_list}
				</ul>
			);
		}
	}
	
	class ListWidget extends React.Component {
		
		constructor() {
			super();
			
			this.state = {
				isVisible: true
			};
		}
		
		toggleWidget(e) {
			e.preventDefault();
			this.setState({
				isVisible: !this.state.isVisible
			});
			return false;
		}
		
		render() {
			return (
				<div>
					<Title text={this.props.items.projectName}/>
					<hr/>
					<List items={this.props.items}
					      isVisible={this.state.isVisible}/>
					<Toggler defaultText={`Hide`}
					         activeText={`Show`}
					         isActive={this.state.isVisible}
					         onClick={this.toggleWidget.bind(this)}/>
				</div>
			);
		}
	}
	
	return class Widget {
		
		constructor(mountPoint, items) {
			
			let _mountPoint = document.querySelector(mountPoint);
			
			try {
				render(<ListWidget items={items}/>, _mountPoint);
			} catch (err) {
				console.log(`can't find mount point DOM element -- "${mountPoint}"`);
			}
		}
		
	};
	
})();