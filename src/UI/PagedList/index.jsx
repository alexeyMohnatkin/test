// @flow

import React, { PureComponent } from 'react';
import classNames from 'classnames';
import range from 'lodash/range';
import styles from './styles.css';

class PagedList extends PureComponent {

	renderPager = () => {
		const { pageCount, currentPage } = this.props;
		const pages = range(1, pageCount+1);

		return pages.map((num: number) => {
			const pageClass = classNames(styles.page, {
				active: num === currentPage
			});

			return <a href="#" className={pageClass} key={num} onClick={(event: Event) => this.loadPage(event, num)}>{num}</a>;
		});
	}

	loadPage = (event: Event, num: number) => {
		event.preventDefault();
		console.log(num);
		if (num === this.props.currentPage) {
			return;
		}
		this.props.loadPage(num);
	}

	render() {
		const { pageCount } = this.props;

		return (
			<tbody>
				{this.props.list.map(this.props.renderItem)}
				<tr>
					<td colSpan="3">
						{pageCount > 1 && <h4 className={styles.title}>Страницы</h4>}
						{pageCount > 1 && this.renderPager()}
					</td>
				</tr>
			</tbody>
		);
	}
}

export default PagedList;
