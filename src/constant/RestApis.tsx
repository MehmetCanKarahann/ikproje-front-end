
const devUrl = 'http://localhost:9090/v1/dev';

const server = devUrl;

const apis = {
    authService: server + '/user',
    userService: server + '/user',
    adminService: server + '/admin'
}

export default apis;