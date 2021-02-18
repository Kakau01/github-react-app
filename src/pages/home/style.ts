import { shade } from 'polished';
import styled, { css } from 'styled-components';

//CRIANDO interface para o has error
interface FormProps{
    hasError: boolean;
}

export const Title = styled.h1 `

    font-size: 48px;
    color: #3a3a3a;
    max-width: 650px;
    line-height: 56px;
    margin-top: 80px;

`
export const Form = styled.form<FormProps> `
    margin-top: 40px;
    max-width: 700px;
    display: flex;

    input{
        flex: 1;
        height: 70px;
        padding: 0 24px;
        border: 0;
        border-radius: 5px 0 0 5px;

        //quando gerar essa classe vai fazer uma acao qualquer
        ${(props) => props.hasError && css `
            border: 2px red solid;      
        ` }

        &::placeholder {
            color: #a8a8b3;
        }
    }

    button {
        width: 200px;
        height: 70px;
        background: #00d25a;
        border-radius: 0px 5px 5px 0px;
        color: #fff;
        font-weight: bold;
        transition: 0.5s;

        &:hover {
            transition: 0.5s;
            background: ${shade(0.2, "#00d25a")}
        }
    }
`
export const Repositories = styled.div`
    margin-top: 80px;
    max-width: 700px;

    a{
        background: #fff;
        border-radius: 5px;
        width: 100%;
        padding: 24px;
        display: flex;
        text-decoration: none;
        align-items: center;
        transition: 0.5s;

        &:hover{
            transform: translateX(10px);
        }

        /* Caso adicione outro a */
        & + a {
            margin-top: 18px;
        }

        img {
            width: 65px;
            height: 65px;
            border-radius: 50%;
        }

        div{
            margin-left: 16px;
        }

        strong {
            font-size: 20px;
            color: #3D3D4d;
        }

        p{
            font-size: 18px;
            color: #cbcbd6;
        }
    }

    svg{
        margin-left: auto;
        color: #cbcbd6;
    }

`


export const Error = styled.span`

    display: block;
    color: red;
    margin-top: 10px;
    

`