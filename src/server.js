import express from 'express'
import bodyParser from 'body-parser'
import Login from './components/user/login'
import Customer from './components/customer'
import Vendor from './components/vendor'
import Job from './components/job'

let logger = global.logger
let siteProps = global.siteProps
const app = express()
let start = () => {
  app
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({
      extended: false
    }))
    .post('/login/:usertype', async (req, res) => {
      try {
        let login = req.body.login
        let password = req.body.password
        let userType = req.params.usertype
        let userLogin = new Login(login, password, userType)
        let result = await userLogin.matchCredentials()
        res.json(result)
      } catch (error) {
        logger.error('error: ', error.message)
        res.json({ error: error.message })
      }
    })
    .post('/signup/:usertype', async (req, res) => {
      let newUser = {
        firstname: req.body.firstname,
        surname: req.body.surname,
        dateOfBirth: req.body.dateOfBirth,
        login: req.body.login,
        password: req.body.password,
        telephone: req.body.telephone,
        email: req.body.email
      }
      if (req.params.usertype === 'vendor') {
        newUser.address = req.body.address
        newUser.idNumber = req.body.idNumber
        newUser.skills = req.body.skills
        try {
          let vendor = new Vendor(newUser)
          let resultInsert = await vendor.createNewVendor()
          res.json({ result: resultInsert })
        } catch (error) {
          logger.error('error: ', error.message)
          res.json({ error: error.message })
        }
      } else {
        try {
          let customer = new Customer(newUser)
          let resultInsert = await customer.createNewCustomer()
          res.json({ result: resultInsert })
        } catch (error) {
          logger.error('error: ', error.message)
          res.json({ error: error.message })
        }
      }
    })
    .post('/create-job', async (req, res) => {
      try {
        let jobData = {
          customerId: req.body.customerId,
          vendorSkillId: req.body.vendorSkillId,
          vendorId: req.body.vendorId,
          address: req.body.address
        }
        let job = new Job(jobData)
        let result = await job.createNewJob()
        res.json(result)
      } catch (error) {
        logger.error('error: ', error.message)
        res.json({ error: error.message })
      }
    })
    .listen(siteProps.port, (error) => {
      if (error) {
        logger.error('Error while starting the application', error.message)
        return
      }
      logger.info('The Application is running on port', siteProps.port)
    })
}

start()
