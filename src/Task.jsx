import styled from 'styled-components';
import { withRouter } from 'react-router-dom'
const Task = ({ history }) => {
    const moveToTaskDetail = (e) => {
        history.push("/TaskDetail");
    }

    return (
     <TaskWrap>
         <h2>タスク</h2>
         <Item>タスクにかかる時間</Item>
         <Item>タスクの期日</Item>
         <Item>あと○日</Item>
         <Button onClick={moveToTaskDetail}>詳細</Button>
         <Item>変更</Item>
         <Item>削除</Item>
     </TaskWrap>
    )
}

const TaskWrap = styled.div`
display: flex;
width: 100%;
background-color: #C0C0C0;
`
const Item = styled.div`
margin-left: 20px;
margin-top: 30px;
`
const Button = styled.button`
height: 30px;
margin-top: 30px;
margin-left: 20px;
`

export default withRouter(Task)