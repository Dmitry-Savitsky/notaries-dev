const Router = require(`express`)
const router = new Router

const UserRouter = require(`./UserRouter`);
const ServicesRouter = require(`./ServicesRouter`);
const EmployeesRouter = require(`./EmployeesRouter`);
const AccountingRouter = require(`./AccountingRouter`);


router.use(`/user`, UserRouter)
router.use(`/services`, ServicesRouter)
router.use(`/employees`, EmployeesRouter)
router.use(`/accountings`, AccountingRouter)

module.exports = router 
