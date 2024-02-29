const Router = require(`express`)
const router = new Router // создаем обьект роутера из экспресса

const clientRouter = require(`./clientRouter`);
const companyRouter = require(`./companyRouter`);
const executorRouter = require(`./executorRouter`);
const orderRouter = require(`./orderRouter`);
const reviewRouter = require(`./reviewRouter`);
const clientAddressRouter = require(`./clientAddressRouter`);

//const registrationDataRouter = require(`./RegistrationDataRouter`);

const userRouter = require(`./UserRouter`);
const ServicesRouter = require(`./ServicesRouter`);

//RegistrationData
//registrationDataRouter
//clientAddressRouter

router.use(`/client`, clientRouter)
router.use(`/company`, companyRouter)
router.use(`/executor`, executorRouter)
router.use(`/order`, orderRouter)
router.use(`/review`, reviewRouter)
router.use(`/clientaddress`, clientAddressRouter)

// router.use(`/registrationdata`, registrationDataRouter)

router.use(`/user`, userRouter)
router.use(`/services`, ServicesRouter)

module.exports = router 
