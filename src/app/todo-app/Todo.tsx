import * as React from 'react';
import './assets/css/Todo.css'
import {Button, Input, List, ListItem, ListItemText, Modal} from "@material-ui/core";
import DeleteForever from '@material-ui/icons/DeleteForever';
import db from "../../firebase";
import {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	paper: {
		position: 'absolute',
		width: 400,
		backgroundColor: theme.palette.background.paper,
		border: '2px solid #000',
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
	},
}));

function Todo(props: any) {

	const classes = useStyles();
	const [open, setOpen] = useState(false);
	const [input, setInput] = useState('');

	const updateTodo = () => {
		const updatedTodo = db.collection('todos').doc(props.todo.id).set({
			todo: input
		}, {merge: true})
		console.log(updatedTodo);
		setOpen(false);
	}

	const handleClose = () => {
		setOpen(false);
	}

	return (
		<>
			<Modal open={open} onClose={() => setOpen(false)}>
				<div className={classes.paper}>
					<h1>Open</h1>
					<Input placeholder={props.todo.todo}
						value={input}
						onChange={event => setInput(event.target.value)}
					/>
					<Button onClick={updateTodo}>
						Update
					</Button>
					<Button onClick={handleClose}>Close</Button>
				</div>
			</Modal>
			<List className="todo__list">
				<ListItem>
					<ListItemText primary={props.todo.todo} />
				</ListItem>
				<Button onClick={() => setOpen(true)}>
					Edit
				</Button>
				<Button onClick={() => db.collection('todos')
					.doc(props.todo.id).delete()}>
					<DeleteForever />
				</Button>
			</List>
		</>
	);
}

export default Todo;