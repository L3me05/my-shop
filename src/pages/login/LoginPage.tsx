import {type FormEvent, useEffect} from "react";
import {useLogin} from "./hooks/useLogin.ts";
import {selectAuthError, selectAuthIsLogged, useAuth} from "../../services/auth";
import {ServerError} from "../../shared";
import {useNavigate} from "react-router-dom";

export function LoginPage() {
    const login = useAuth(state => state.login);
    const error = useAuth(selectAuthError);
    const isLogged = useAuth(selectAuthIsLogged);
    const navigate= useNavigate();

    function doLogin(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        console.log(formData);
        login(formData.username, formData.password);
    }

    const {
        formData, changeHandler, isValid
    } = useLogin();

    useEffect(() => {
        if(isLogged) {
            navigate('/cms');
        }
    }, [isLogged]);

    return (
        <div className="max-w-sm mx-auto ">
            <h1 className="title">Login</h1>

            {error && <ServerError message="Errore nel login, riprova"/>}

            <form onSubmit={doLogin} className="flex flex-col gap-3">
                <input
                    type="text"
                    placeholder="username"
                    name="username"
                    onChange={changeHandler}
                />
                <input
                    type="password"
                    placeholder="password"
                    name="password"
                    onChange={changeHandler}
                />
                <button
                    className="btn primary"
                    disabled={!isValid}
                >
                    SIGN IN
                </button>
            </form>
        </div>
    )
}