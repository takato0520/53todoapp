import classes from './taskinput.module.css'
import React, { useEffect, useState } from 'react';
import Button from './button'
import styled from 'styled-components';
import firebase from '../config/firebase'
import 'firebase/firestore'
import { withRouter } from 'react-router-dom'
import { nanoid } from 'nanoid';

const getKey = () => Math.random().toString(32).substring(2);

function Taskinput({ history, getTasks }) {

    const [todos, setTodos] = useState()
    const [taskName, setTaskName] = useState('')
    const [requiredTime, setRequiredTime] = useState('1h')
    const [deadline, setDeadline] = useState('')

    useEffect(() => {
        if (getTasks) setTodos(getTasks.filter(task => task.isCompleted === false))
    }
        , [getTasks])

    //ボタンの処理
    //詳細ボタンを押した時に詳細画面に遷移する処理
    const moveToTaskDetail = (id) => {
        history.push(`/taskDetail/${id}`);
    }

    //taskにかかる時間を選択するのに必要な定数
    const requiredTime_Options = [
        { value: "1", label: "1h", id: "1", },
        { value: "2", label: "2h", id: "2", },
        { value: "3", label: "3h", id: "3", },
        { value: "4", label: "4h", id: "4", },
        { value: "5", label: "5h", id: "5", },
        { value: "6", label: "6h", id: "6", }
    ]




    /*    console.log(today) */
    let classAdd = true

    //plusbuttonを押した時にtaskを追加し、優先順に並び替える処理
    const addNewTask = (event) => {
        event.preventDefault()

        //timeの数字部分だけを取り出して単位をmsに変換する
        const requiredTime_sliced_msec = requiredTime.slice(0, 1) * 3600000

        //締め切りの日にち管理する
        let today = new Date()
        let now_msec = today.getTime()
        let deadline_msec = Date.parse(new Date(deadline))

        //taskの優先順位を決める指標　締切までの時間-taskにかかる時間
        let differdate = deadline_msec - now_msec - requiredTime_sliced_msec

        const id = nanoid()

        classAdd = true

        const tmpTodo = [...todos, { taskName, requiredTime, deadline, arr: differdate, isCompleted: false }]

        firebase.firestore().collection('tasks').doc(id).set({
            taskName: taskName,
            deadline: deadline,
            requiredTime: requiredTime,
            isCompleted: false,
            id: id,

        })
        tmpTodo.sort(function (a, b) {
            console.log(a.arr)
            if (a.arr < b.arr) {
                return -1;
            }
            if (a.arr > b.arr) {
                return 1
            }
            return 0;
        })

        setTodos(tmpTodo)
        setTaskName('')
        setDeadline('')
    }

    //削除ボタンを押した時にtaskを削除する関数
    const handleRemoveTask = (id) => {
        console.log(id)
        firebase.firestore().collection('tasks').doc(id).update({
            isCompleted: true
        })
        // const newTodos = [...todos]
        // newTodos.splice(index, 1)
        // setTodo(newTodos)

    }




    console.log(Date.parse(new Date(deadline)))

    return (
        <>
            <div className={classes.todolist}>
                <div>
                    Add Task : <input value={taskName} placeholder="Add New Task"
                        onChange={e => { setTaskName(e.target.value) }} />
                </div>

                <div>
                    <p>想定される時間</p>
                    <select onChange={e => setRequiredTime(e.target.value)}>
                        {requiredTime_Options.map(requiredTime => {
                            return (
                                <option key={requiredTime.value}>{requiredTime.id}h</option>
                            )
                        })}
                    </select>


                </div>
                <div>
                    <input type="date"
                        onChange={e => setDeadline(e.target.value)} />
                    <div>{deadline}</div>
                </div>
                <div>
                    <Button clicked={addNewTask} />
                </div>
            </div>
            <ul>
                <TaskWrap>
                    {
                        todos?.map((todo) => (
                            <div className={classes.tasklist}>
                                <Item key={getKey()}>{todo.taskName} </Item>
                                <Item key={getKey()}>{todo.requiredTime}</Item>
                                <Item key={getKey()}>{todo.deadline}</Item>
                                <Buttontask onClick={e => moveToTaskDetail(todo.id)}>詳細</Buttontask>
                                <input
                                    className={classAdd ? classes.play : classes.none}
                                    type="button"
                                    onClick={() => handleRemoveTask(todo.id)}
                                    value="削除" />
                            </div>
                        ))
                    }
                </TaskWrap>
            </ul>

        </>
    );
}





const TaskWrap = styled.div`

width: 100%;
background-color: #C0C0C0;
`
const Item = styled.div`
margin-left: 20px;
margin-top: 30px;
`
const Buttontask = styled.button`

margin-top: 30px;
margin-left: 20px;
`

export default withRouter(Taskinput)
