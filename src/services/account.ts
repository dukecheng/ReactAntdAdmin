import request from "./request";

// 登录
export function login(data: any) {
    return request.post('/api/account/login', data);
}
// 退出
export function logout(token: string) {
    return request.post('/api/account/logout', { 'token': token });
}