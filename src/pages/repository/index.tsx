import React from 'react';

import Logo from '../../img/logo-github.svg';
import { Repositorys } from '../home';
import { Container, ContainerLeft, ContainerRight } from './style';

const Repository: React.FC<Repositorys> = (props) => {

     
    return (
        <>
            <img src={Logo} alt="Logo Home" />
            <Container>
                <ContainerLeft>
                    <img src="https://avatars.githubusercontent.com/u/28357580?s=460&u=cabbbdcd5c2c4325584aa07b16f1b5b453fbea9d&v=4" alt="Foto Perfil" />
                </ContainerLeft>
                <ContainerRight>
                    <h1>Title Repo</h1>

                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestias necessitatibus, doloribus asperiores inventore consequatur ducimus nobis dolore magnam rerum minima ipsam esse sit et repudiandae autem impedit cum minus assumenda.</p>
                </ContainerRight>



            </Container>

        </>
    )
}

export default Repository;