import React, { FormEvent, HTMLProps, useState } from 'react';
import { FiChevronRight } from 'react-icons/fi';

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

const Home: React.FC<Repositorys> = () => {
    const [repoValue, setRepoValue] = useState('');
    const [repositories, setRepositories] = useState<Repositorys[]>([]);

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
                    <a key={index} href={`repo/${repoValue}`}>
                        <img src={rep.owner.avatar_url} alt={rep.owner.login} />

                        <div>
                            <strong>{rep.full_name }</strong>
                            <p>{rep.description}</p>
                        </div>


                        <FiChevronRight size={40} />
                    </a>

                ))}

            </Repositories>


        </>
    )
}

export default Home;