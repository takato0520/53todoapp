import React from 'react'
import styled from 'styled-components'
import Button from './Taskinput/button'

const Header = ({ history }) => {

    return (
        <Ul>
            {/* <Li>mycalender</Li>
            <Li>通知設定</Li> */}
            <Li onClick={e => { history.push('/login') }} >logout</Li >
        </Ul>
    )

}

const Li = styled.button`
    list-style : none;
    padding: 0 30px;
    cursor: pointer;

`

const Ul = styled.ul`
    display: flex;
    justify-content: flex-end;
    background-color: #fff636;
    margin: 0;
`

export default Header;
