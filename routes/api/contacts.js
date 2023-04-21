const express = require('express');
const joi = require("joi");

const contacts = require("../../models/contacts")
const HttpError = require("../../helpers");

const router = express.Router();

const addSchema = joi.object({
  name: joi.string().min(3).max(18).required(),
  email: joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }).required(),
  phone: joi.string().min(10).max(15).required(),
})

const updateSchema = joi.object({
  name: joi.string().min(3).max(18),
  email: joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  phone: joi.string().min(10).max(15),
});

router.get('/', async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
  res.json(result)
  } 
  catch (error) {
    next(error)
  }
})

router.get('/:contactId', async (req, res, next) => {
 try {
  const {contactId} = req.params;
  const result = await contacts.getContactById(contactId);

  if (!result) {
   throw HttpError(404, "Not found")
  }

  res.json(result)

 } 
 catch (error) {
  next(error)
 }
})

router.post('/', async (req, res, next) => {
  try {
    const {error} = addSchema.validate(req.body);

    if (error) {
      throw HttpError(400, error.message)
    }

    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
  } 
  catch (error) {
    next(error)
  }
})


router.put('/:contactId', async (req, res, next) => {
  try {
    const {error} = updateSchema.validate(req.body);

    if (error) {
      throw HttpError(400, error.message)
    }

    const {contactId} = req.params;
    const result = await contacts.updateContact(contactId, req.body);
    if(!result) {
      throw HttpError(404, "Not found");
    }
  
    res.json(result);
  } 
  catch (error) {
    next(error)
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const {contactId} = req.params;
    const result = await contacts.removeContact(contactId)
    if(!result) {
      throw HttpError(404, "Not found");
    }
    res.json({
      message: "Delete success"
    })
  } 
  catch (error) {
    next(error)
  }
})


module.exports = router
