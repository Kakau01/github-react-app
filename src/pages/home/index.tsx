import React, { FormEvent, HTMLProps, useEffect, useState } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import Logo from '../../img/logo-github.svg';
import api from '../../services/api';
import { Form, Repositories, Title } from './style';

export interface Repositorys {
    full_name: string,
    description: string,
    owner: {
        login: string,
        avatar_url: string
    }
}




const Home: React.FC = () => {
    const [repoValue, setRepoValue] = useState('');
    //Para manter os valores no LocalStorage
    const [repositories, setRepositories] = useState<Repositorys[]>(() => {
        //pega o valor da chave 
        const storageRepositories = localStorage.getItem("@githubexplorer");
        
        // Se a chave existir fica gravado no storage se nao retorna array vazia
        if(storageRepositories) {
            
            return JSON.parse(storageRepositories);
        }else {
            return []
        }
    });


    useEffect(() => {
        localStorage.setItem("@githubexplorer", JSON.stringify(repositories));
    }, [repositories]);


    async function handleAddRepository(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        try {
            const response = await api.get(`repos/${repoValue}`)
            const repository = response.data;
            setRepositories([...repositories, repository]);
            setRepoValue("");
            console.log(repoValue)
        }
        catch (e) {
            return alert('erro')
        }



        console.log(repositories);

    }


    return (
        <>
            <img src={Logo} alt="Logo Home" />
            <Title>Encontre repositorios no Github</Title>
            <Form onSubmit={handleAddRepository}>
                <input
                    required
                    type="text"
                    name="inpt-search"
                    placeholder="Find GitHub repositories"
                    value={repoValue}
                    onChange={e => setRepoValue(e.target.value)
                    }
                />
                <button type="submit">Search</button>
            </Form>

            <Repositories>
                {repositories.map((rep, index) => (
                    //Vai para a pagina repository/nomedorepositorio
                    <Link key={index} to={`repository/${rep.full_name}`}>
                        <img src={rep.owner.avatar_url} alt={rep.owner.login} />

                        <div>
                            <strong>{rep.full_name }</strong>
                            <p>{rep.description}</p>
                        </div>


                        <FiChevronRight size={40} />
                    </Link>

                ))}

            </Repositories>


        </>
    )
}

export default Home;