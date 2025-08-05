import { pb } from '../../pocketbase'
export async function login(username: string, password: string) {
    return pb.collection('users').authWithPassword(username, password);
}

export async function logout() {
    pb.authStore.clear();
}

export function getToken() {
    return pb.authStore.token;
}
export function isLogged() {
    return pb.authStore.isValid;
}