
//FsTaskInput(firestore Task Input)の処理のコードです//
import Taskinput from './Taskinput/taskinput'
import { useEffect, useState  } from 'react'
import firebase from '../config/firebase'
import 'firebase/firestore'


const FsTaskInput = (Taskinput) => {

  // taskのデータの取得処理　

  useEffect(() => {
    firebase.firestore().collection('tasks').get()
        .then([
            task => { setTask(task.data().task) }, 
            time => { setTime(time.data().time) }, 
            dead => { setDead(dead.data().dead) },
            id => { setId(id.data().id) },
            isCompleted => {setIsCompleted(isCompleted.data().isCompleted)},
            detail => { setDtail(id.date().detail) },
        ])
    }, [])

    // handleSubmitを押したとき、firestoreにタスクデータが保存される処理

    const addTaskData = (e) => {
        e.preventDefault()
        firebase.firestore().collection('tasks').add({
            task: task,
            time: time,
            dead: dead,
            id: id,
            isCompleted: isCompleted,
            detail: detail

        })
    }

    //タスク保存の関数

    const saveTaskData = (e) => {
        e.preventDefault()
        firebase.firestore().collection('tasks').doc(id).update({
            task: task,
            time: time,
            dead: dead,
            id: id,
            isCompleted: isCompleted,
            detail: detail
        })
    }
    
    //handleRemoveTaskを押したとき、firestoreのタスクデータが削除される処理

    const deleteTaskData = (e) =>{
        firebase.firestore.collection('tasks').doc(id).delete();
    }

    return (
        <div>
            <Taskinput
                addTaskData={addTaskData}
                saveTaskData={saveTaskData} 
                deleteTaskData={deleteTaskData}
            />
        </div>
     
    )
}

export default FsTaskInput;
