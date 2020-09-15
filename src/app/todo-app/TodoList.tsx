import * as React from 'react';
import {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {Container, FormControl, Input, InputLabel} from "@material-ui/core";
import Todo from "./Todo";
import firebase from 'firebase';
import db from '../../firebase';

const useStyles = makeStyles((theme) => ({
	root: {
		'& > *': {
			margin: theme.spacing(1),
			width: '25ch',
		},
	},
}));

function TodoList() {
	const classes = useStyles();

	const [todos, setTodos] = useState([]);
	const [input, setInput] = useState('');

	// when the app loads, we need to listen to the database and fetch
	// new todos as they get added/removed
	useEffect(() => {
		// fires when TodoList loads
		db.collection('todos').orderBy('timestamp', 'desc')
			.onSnapshot(snapshot => {
			// @ts-ignore
			setTodos(snapshot.docs.map(doc => ({id: doc.id, todo: doc.data().todo})))
		})
	}, [])

	// this will fire off when we click the button
	const addTodo = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		event.preventDefault();

		const newTodo = db.collection('todos').add({
			todo: input,
			timestamp: firebase.firestore.FieldValue.serverTimestamp()
		})
		console.log(newTodo);

		// @ts-ignore
		setTodos([...todos, input]);
		setInput('');
	}

	return (
		<Container maxWidth="sm">
			<div>
				<form className={classes.root} noValidate autoComplete="off">
					<FormControl>
						<InputLabel>Write a todo</InputLabel>
						<Input
							value={input}
							onChange={event => setInput(event.target.value)}
							required
						/>
					</FormControl>

					<Button
						type="submit"
						variant="contained"
						color="primary"
						onClick={addTodo}
						disabled={!input}>
						Add Todo
					</Button>

				</form>

				<ul>
					{todos.map((todo, index) => (
						<Todo key={index} todo={todo} />
					))}
				</ul>
			</div>
		</Container>
	);
}

export default TodoList;