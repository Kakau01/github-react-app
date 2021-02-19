import React, { FormEvent, HTMLProps, useEffect, useState } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import Loader from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import Logo from '../../img/logo-github.svg';
import api from '../../services/api';
import { Error, Form, Loading, Repositories, Title } from './style';




export interface Repositorys {
    full_name: string,
    description: string,
    owner: {
        login: string,
        avatar_url: string
    }
}

interface LoadingProps {
    load: boolean
}




const Home: React.FC = () => {
    const [load, setLoad] = useState<LoadingProps | boolean>(Boolean);

    const [repoValue, setRepoValue] = useState('');
    //Para manter os valores no LocalStorage
    const [repositories, setRepositories] = useState<Repositorys[]>(() => {
        //pega o valor da chave 
        const storageRepositories = localStorage.getItem("@githubexplorer");

        // Se a chave existir fica gravado no storage se nao retorna array vazia
        if (storageRepositories) {

            return JSON.parse(storageRepositories);
        } else {
            return []
        }
    });

    //caso o repositorio enviado nao exista
    const [inputError, setInputError] = useState('');

    useEffect(() => {
        localStorage.setItem("@githubexplorer", JSON.stringify(repositories));
    }, [repositories]);


    async function handleAddRepository(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        setLoad(true);

        if (!repoValue) {
            setLoad(false);
            setInputError('Type a repository valid name...');
            return;
        }

        try {
            const response = await api.get(`repos/${repoValue}`)
            const repository = response.data;
            setRepositories([...repositories, repository]);
            setRepoValue("");
            setInputError('');
            setLoad(false);
            console.log(repoValue)
        }
        catch (e) {
            setLoad(false);

            return toast.error("Repositório não encontrado");
        }
        setLoad(false);






        console.log(repositories);

    }


    return (
        <>
            <img src={Logo} alt="Logo Home" />
            <Title>GitHub repositories!</Title>
            <Form hasError={!!inputError} onSubmit={handleAddRepository}>
                <input
                    // required
                    onClick={e => setInputError('')}
                    type="text"
                    name="inpt-search"
                    placeholder="Type your repository"
                    value={repoValue}
                    onChange={e => setRepoValue(e.target.value)

                    }
                />

                <button type="submit">Search</button>

            </Form>
            {inputError &&

                <Error>{inputError}</Error>

            }


            {!load ? (
                <Repositories>
                    {repositories.map((rep, index) => (
                        //Vai para a pagina repository/nomedorepositorio
                        <Link key={index} to={`repository/${rep.full_name}`}>
                            <img src={rep.owner.avatar_url} alt={rep.owner.login} />

                            <div>
                                <strong>{rep.full_name}</strong>
                                <p>{rep.description}</p>
                            </div>


                            <FiChevronRight size={40} />
                        </Link>

                    ))}

                </Repositories>

            ) : (<Loading><Loader type="ThreeDots" color="#000" /></Loading>)}

        </>
    )
}

export default Home;