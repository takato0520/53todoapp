import { useEffect, useState } from 'react'
import firebase from './config/firebase'
import 'firebase/firestore'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'

const TaskDetail = ({ history }) => {
    const { id } = useParams()
    const [text, setText] = useState() //textareaの内容
    const [isChanged, setIsChanged] = useState(false) //textに変更があったかどうか判定する値

    //前保存したテキストをtextareaに返す処理　*Roomを開いた時にロードした方が良いと思う
    useEffect(() => {
        firebase.firestore().collection('tasks').doc(id).get()
            .then(text => { setText(text.data()) })
    }, [])


    //テキストをFirebaseに保存する関数　*docの値を変数にする
    const saveTextData = (e) => {
        e.preventDefault()
        firebase.firestore().collection('tasks').doc(id).update({
            detail: text
        })
        setIsChanged(false)
    }

    //テキストの削除をする関数
    const deleteText = (e) => {
        e.preventDefault()
        setText("")
        setIsChanged(true)
    }

    //Roomコンポーネントへ移動する関数
    //textareaの内容に変更があった時内容を保存するか確認する
    const moveToRoom = (e) => {
        e.preventDefault()
        if (isChanged) {
            if (window.confirm('内容に変更があります。保存しますか?')) {
                saveTextData(e)
            }
        }
        history.push("/")
    }

    return (
        <>
            <h1>タスク名:{text?.name}</h1>
            <div>期限:{text?.deadline}</div>
            <div>かかる時間:{text?.requiredTime}</div>
            <h2>タスクの詳細</h2>
            <Textarea
                value={text?.detail}
                onChange={
                    e => {
                        setText(e.target.value)
                        setIsChanged(true)
                    }
                }
            />
            <ButtonWrap>
                <Button onClick={saveTextData}>保存</Button>
                <Button onClick={deleteText}>削除</Button>
                <Button onClick={moveToRoom}>閉じる</Button>
            </ButtonWrap>
        </>
    )
}

const Textarea = styled.textarea`
width:500px;
height:100px;
`

const Button = styled.button`
color:#000;
background-color:yellow;
width:100px;
cursor:pointer;
`


const ButtonWrap = styled.div`

`


export default TaskDetail
