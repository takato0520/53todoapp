import React, { useState, useEffect } from 'react'
import { BrowserRouter as Switch, Route, withRouter } from "react-router-dom"
import Login from './Login'
import SignUp from './SignUp'
import TaskDetail from './TaskDetail'
import TaskHistory from './TaskHistory'
import Header from './Header'
import Taskinput from './Taskinput/taskinput'
// import  {useEffect, useState} from 'react'
import firebase from './config/firebase'
import 'firebase/firestore'

function App() {

  const [getTasks, setGetTasks] = useState()

  //読み込み時にfirestoreからtasksを呼び出す処理
  useEffect(() => {
    firebase.firestore().collection('tasks')
      .onSnapshot((snapshot) => {
        const getTasks = snapshot.docs.map(doc => {
          return doc.data()
        })
        console.log(getTasks)
        setGetTasks(getTasks)
      });
  }, [])

  return (
    <>
      <Header />
      <withRouter>
        <Switch>
          <Route exact path='/room' >
            <Taskinput getTasks={getTasks} />
          </Route>
          <Route exact path='/login' component={Login} />
          <Route exact path='/signup' component={SignUp} />
          <Route exact path='/taskDetail/:id'>
            < TaskDetail getTasks={getTasks} />
          </Route>
          <Route exact path='/taskHistory' >
            <TaskHistory getTasks={getTasks} />
          </Route>
        </Switch>
      </withRouter>
    </>
  )
}

export default App;
