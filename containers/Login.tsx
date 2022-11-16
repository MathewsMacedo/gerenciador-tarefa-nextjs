/* eslint-disable @next/next/no-img-element */
import type {NextPage} from 'next';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { executeRequest } from '../services/api';

type LoginProps = {
    setAccessToken(s:string) : void
}

export const Login : NextPage<LoginProps> = ({setAccessToken}) =>{

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [singup, setSingUp] = useState(false);

    useEffect(() => {
        setEmail('')
        setName('')
        setPassword('')
        setError('')
    },[singup])

    const doLogin = async() => {
        try{
            if(!email || !password){
                return setError('Favor preencher os campos.');
            }

            setLoading(true);

            const body = {
                login: email,
                password
            };

            const result = await executeRequest('login', 'POST', body);
            if(result && result.data){
               localStorage.setItem('accessToken', result.data.token);
               localStorage.setItem('name', result.data.name);
               localStorage.setItem('email', result.data.email);
               setAccessToken(result.data.token);
            }
        }catch(e : any){
            console.log('Ocorreu erro ao efetuar login:', e);
            if(e?.response?.data?.error){
                toast('Ocorreu erro ao efetuar login', {type: 'error'})
                setError(e?.response?.data?.error);
            }else{
                toast('Ocorreu erro ao efetuar login', {type: 'error'})
                setError('Ocorreu erro ao efetuar login, tente novamente.');
            }
        }

        setLoading(false);
    }


    const doSingUp = async() => {
        try{
            if(!email || !password || !name){
                return setError('Favor preencher os campos.');
            }

            setLoading(true);

            const body = {
                name,
                email,
                password
            };

            const result = await executeRequest('user', 'POST', body);
            if(result && result.data){
               setSingUp(false)
               toast("Cadastro feito com sucesso", {type: "success"})
            }
        }catch(e : any){
            console.log('Ocorreu erro ao efetuar cadastro:', e);
            if(e?.response?.data?.error){
                toast('Ocorreu erro ao efetuar cadastro', {type: 'error'})
                setError(e?.response?.data?.error);
            }else{
                toast('Ocorreu erro ao efetuar cadastro, tente novamente.', {type: 'error'})
                setError('Ocorreu erro ao efetuar cadastro, tente novamente.');
            }
        }

        setLoading(false);
    }



    return (
        <div className='container-login'>
            <img src='/logo.svg' alt='Logo Fiap' className='logo'/>
            <div className="form">
                {error && <p>{error}</p>}
                {
                    singup && (
                        <div>
                        <img src='/person.svg' alt='Nome'/> 
                        <input type="text" placeholder="Nome" 
                            value={name} onChange={e => setName(e.target.value)}/>
                        </div>
                    )
                }
                <div>
                    <img src='/mail.svg' alt='Login'/> 
                    <input type="text" placeholder={singup ? "Email" : "Login"}
                        value={email} onChange={e => setEmail(e.target.value)}/>
                </div>
                <div>
                    <img src='/lock.svg' alt='Senha'/> 
                    <input type="password" placeholder="Senha" 
                        value={password} onChange={e => setPassword(e.target.value)}/>
                </div>
                <button type='button' onClick={singup ? doSingUp : doLogin} disabled={loading}>{loading ? '...Carregando' : singup ? 'Cadastre-se' : 'Login'}</button>
                {
                    !singup ?  
                    (<div className='container-link'>
                        <label>Ainda não possui cadastro?  </label><a onClick={() => setSingUp(!singup)} > Cadastre-se</a>
                    </div>) :
                    (<div className='container-link'>
                        <label>Já possui cadastro?  </label><a onClick={() => setSingUp(!singup)} > Login</a>
                    </div>)
                }
            </div>
        </div>
    );
}