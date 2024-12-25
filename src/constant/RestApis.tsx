
const devUrl = 'http://localhost:9090/v1/dev';

const server = devUrl;

const apis = {
    authService: server + '/auth',
    companyManagementService: server + '/companymanager',
    employeeService: server + '/employee',
    leaveService: server + '/leave',
    adminService: server + '/admin'
}

export default apis;