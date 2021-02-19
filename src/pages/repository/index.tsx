import React, { useEffect, useState } from 'react';
import { FiChevronRight, FiChevronsLeft } from 'react-icons/fi';
import Loader from 'react-loader-spinner';
import { Link, useRouteMatch } from 'react-router-dom';

import Logo from '../../img/logo-github.svg';
import api from '../../services/api';
import { Header, Issue, Loading, RepositoryInfo } from './style';

//parametro da rota repository - URL

interface RepositoryParams {
    //tem que ser igual ao nome da Route - path="/repository/:repository+" 
    repository: string
}

//Propriedades do repositorio em si
interface Repositorie {
    full_name: string,
    description: string,
    forks_count: number,
    stargazers_count: number,
    open_issues_count: number,
    owner: {
        login: string,
        avatar_url: string
    }

}

interface Issues {
    id: number,
    title: string,
    html_url: string,
    user: {
        login: string
    }
}

interface LoadingProps {
    load: boolean
}



//Propriedes referentes as issues

const Repository: React.FC = (props) => {
    const [load, setLoad] = useState(true);

    //Esta ligado com o repositorio
    const [repository, setRepository] = useState<Repositorie | null>(null);

    //esta ligado com o parametro da URL
    const { params } = useRouteMatch<RepositoryParams>();

    const [issues, setIssues] = useState<Issues[]>([]);

    useEffect(() => {

        //chamada na api para pegar infos do repositorio
        api.get(`repos/${params.repository}`).then(
            response => {
                //atualiza o repositorio
                setRepository(response.data);
                setLoad(false);

            }
        )

        api.get(`repos/${params.repository}/issues`).then(
            response => {
                //atualiza a issue
                setIssues(response.data);
                setLoad(false);


            }
        )


        //atualiza toda vez que o parametro da rota for atualizado
    }, [params.repository])

    //corresponde a url do Route

    //abrir em outra aba pq target nao funciona
    function openTab(link: string) {
        window.open(link, "_blank");
    }

    return (



        <>

            <Header>
                <img src={Logo} alt="Logo App" />
                <Link to="/">
                    <FiChevronsLeft size={20} /> Voltar

                </Link>
            </Header>


            {repository && !load ? (

                <RepositoryInfo>
                    <header>
                        <img src={repository.owner.avatar_url} alt={repository.owner.login} />
                        <div>
                            <strong>{repository.full_name}</strong>
                            <p>{repository.description}</p>
                        </div>
                    </header>
                    <ul>
                        <li>
                            <strong>{repository.stargazers_count}</strong>
                            <span>Stars</span>
                        </li>
                        <li>
                            <strong>{repository.forks_count}</strong>
                            <span>Forks</span>
                        </li>
                        <li>
                            <strong>{repository.open_issues_count}</strong>
                            <span>Issues Abertas</span>
                        </li>
                    </ul>
                </RepositoryInfo>

            ) : (<Loading><Loader type="ThreeDots" color="#000" /></Loading>)}


            <Issue>
                {issues.map(
                    issue => (
                        <a
                            key={issue.id}
                            onClick={() => openTab(issue.html_url)}
                        >
                            <div>
                                <strong>{issue.title}</strong>
                                <p>{issue.user.login}</p>

                            </div>
                            <FiChevronRight size={40} />
                        </a>
                    )
                )}

            </Issue>






        </>
    )
}

export default Repository;