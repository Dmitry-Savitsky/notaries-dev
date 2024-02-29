const sequelize = require(`../db`)
const ApiError = require(`../error/ApiError`)
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { Clients, Users } = require('../models/models')

const generateJwt = (idUser, idClient, role) => {
  return jwt.sign(
    {
      idusr: idUser,
      idclnt: idClient,
      role: role
    },
    process.env.SECRET_KEY,
    {
      expiresIn: '12h'
    }
  );
}

const hashPassword = async (password) => {
  const saltRounds = 5; // Salt rounds for bcrypt hashing
  return await bcrypt.hash(password, saltRounds);
}

class UserController {
  async registration(req, res, next) {
    try {
      const { ClientName, ClientBirth, ClientAddress, ClientPhone, Role, Email, Password } = req.body;

      // Check if the password is provided
      if (!Password) {
        return res.status(400).json({ message: "Password is required" });
      }

      // Hash the password using hashPassword function
      const hashedPassword = await hashPassword(Password);

      // Create client
      const client = await Clients.create({
        ClientName,
        ClientBirth,
        ClientAddress,
        ClientPhone
      });

      // Create user associated with the client, storing the hashed password
      const user = await Users.create({
        Role,
        Email,
        Password: hashedPassword, // Store hashed password
        idClient: client.idClient // Assigning the idClient foreign key
      });

      const token = generateJwt(user.idUsers, user.idClient, user.Role);

      res.status(200).json({ token });
    } catch (error) {
      console.error("Registration Error:", error);
      res.status(500).json({ message: "MISTAKE!" });
    }
  }


  async login(req, res, next) {
    try {
      const { Email, Password } = req.body;

      // Find the user by email
      const user = await Users.findOne({ where: { Email } });

      // If user not found
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Check if the provided password matches the stored password
      const isPasswordValid = await bcrypt.compare(Password, user.Password);

      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid password" });
      }

      // If both email and password are correct, generate a JWT token
      const token = generateJwt(user.idUsers, user.idClient, user.Role);

      // Return token as response
      res.status(200).json({ token });
    } catch (error) {
      console.error("Login Error:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }


  async check(req, res, next) {
    const token = generateJwt(req.user.id, req.user.role)
    return res.json({ token })
  }
}

module.exports = new UserController()