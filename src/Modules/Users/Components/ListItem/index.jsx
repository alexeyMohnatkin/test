// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.css';

import type { TUser } from '../../reducer';

type TProps = {
	user: TUser,
	deleteUser: (id: string) => void,
};

const UsersListItem = ({ user, deleteUser }: TProps) => {
	return (
		<tr>
			<td><Link to={`/users/${user._id}`}>{user.name}</Link></td>
			<td>{user.email}</td>
			<td><span className={styles.remove} onClick={() => deleteUser(user._id)}>&times;</span></td>
		</tr>
	);
};


export default UsersListItem;
