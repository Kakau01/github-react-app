import styled from 'styled-components';



export const Container = styled.div`
    display: flex;
    margin-top: 90px;   
    justify-content:center;
`

export const ContainerLeft = styled.div`
    width: 50%;
    display: flex;
    justify-content: center;
    img{

        border-radius: 50%;
        width: 250px;
        height: 250px;
        

}
`
export const ContainerRight = styled.div`
    width: 50%;
    display: flex;
    flex-direction:column;
    align-items:center;
    
    h1{
        margin-bottom: 20px;
    }
    
`