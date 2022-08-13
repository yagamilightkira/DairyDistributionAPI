const { app } = require("../constants/constants")
const { Distributor } = require("../models/distributor")
const { Customer } = require("../models/customer")
const { Order } = require("../models/order")

app.post("/registerDistributor", ( req, res ) => {
  registerDistributor( req.body ).then( resp_dist => {
    res.status(200).send({ "status": 1, "msg": "success", "data": resp_dist })
  }).catch( err_dist => {
    res.status(200).send({ "status": 0, "data": err_dist })
  })
})

const registerDistributor = ( reqBody ) => {
  return new Promise( ( resolve, reject ) => {
    if ( "distributorName" in reqBody && "distributorMaxLimit" in reqBody ) {
      let distributorObj = new Distributor({
        "distributorName": reqBody.distributorName,
        "distributorMaxLimit": reqBody.distributorMaxLimit
      })

      distributorObj.save().then(docs => {
        console.info("distributor added to DB")
        resolve("distributor added to DB")
      }).catch(e =>{
         console.log('Error in adding distributor')
         reject('Error in adding distributor')
      })

    } else {
      console.log("Invalid req to register distributor");
      reject("Invalid req to register distributor");
    }
  })
}

app.post("/registerCustomer", ( req, res ) => {
  registerCustomer( req.body ).then( resp_cust => {
    res.status(200).send({ "status": 1, "msg": "success", "data": resp_cust })
  }).catch( err_cust => {
    res.status(200).send({ "status": 0, "data": err_cust })
  })
})

const registerCustomer = ( reqBody ) => {
  return new Promise( ( resolve, reject ) => {
    if ( "customerName" in reqBody  ) {
      let customerObj = new Customer({
        "customerName": reqBody.customerName
      })

      customerObj.save().then(docs => {
        console.info("customer added to DB")
        resolve("customer added to DB")
      }).catch(e =>{
         console.log('Error in adding customer')
         reject('Error in adding customer')
      })

    } else {
      console.log("Invalid req to register customer");
      reject("Invalid req to register customer");
    }
  })
}

app.post("/add", ( req, res ) => {
  addOrder( req.body ).then( resp_order => {
    res.status(200).send({ "status": 1, "msg": "success", "data": resp_order })
  }).catch( err_order => {
    res.status(200).send({ "status": 0, "data": err_order })
  })
})

const addOrder = ( reqBody ) => {
  return new Promise( (resolve, reject) => {
    if ( "distributorRecId" in reqBody && "customerRecId" in reqBody && "milkQuantity" in reqBody ) {
      let milkQuantity = Number( reqBody.milkQuantity )
      let orderObj = new Order({
        "distributorRecId": reqBody.distributorRecId,
        "customerRecId": reqBody.customerRecId,
        "milkQuantity": milkQuantity
      })

      orderObj.save().then( orderDoc => {
        console.log("Order Added.")
        resolve("Order Added.")
      }).catch( orderErr => {
        console.log("Error in adding order")
        reject("Error in adding order")
      })

    } else {
      console.log("Invalid req to add order")
      reject("Invalid req to add order")
    }
  })
}

app.post("/update/:id/:quantity", ( req, res ) => {
  updateOrder( req.params ).then( resp_upd => {
    res.status(200).send({ "status": 1, "msg": "success", "data": resp_upd })
  }).catch( err_upd => {
    res.status(200).send({ "status": 0, "data": err_upd })
  })
})

const updateOrder = ( reqBody ) => {
  return new Promise( ( resolve, reject ) => {
    if ( reqBody.id ) {

      Order.findByIdAndUpdate( reqBody.id, { milkQuantity: reqBody.quantity}, ( err, doc ) => {
        if ( err ) {
          console.log("Err in updating order")
          reject("Err in updating order")
        } else {
          console.log("Order updated")
          resolve("Order updated")
        }
      })

    } else {
      console.log("Err in params")
      reject("Err in params")
    }
  })
}

app.post("/updateStatus/:id/:newstatus", ( req, res ) => {
  updateOrderStatus( req.params ).then( resp_upd_status => {
    res.status(200).send({ "status": 1, "msg": "success", "data": resp_upd_status })
  }).catch( err_upd_status => {
    res.status(200).send({ "status": 0, "data": err_upd_status })
  })
})

const updateOrderStatus = ( reqBody ) => {
  return new Promise( ( resolve, reject ) => {
    if ( reqBody.id ) {
      let orderStatusList = [ "placed", "packed", "dispatched", "delivered" ]
      if (  orderStatusList.includes(reqBody.newstatus) ) {
        Order.findByIdAndUpdate( reqBody.id, { orderStatus: reqBody.newstatus}, ( err, doc ) => {
          if ( err ) {
            console.log("Err in updating order status")
            reject("Err in updating order status")
          } else {
            console.log("Order status updated")
            resolve("Order status updated")
          }
        })
      } else {
        console.log("Not a valid order status")
        reject("Not a valid order status")
      }
    } else {
      console.log("Err in params")
      reject("Err in params")
    }
  })
}

app.post("/delete/:id", ( req, res ) => {
  deleteOrder( req.params ).then( resp_delete => {
    res.status(200).send({ "status": 1, "msg": "success", "data": resp_delete })
  }).catch( err_delete => {
    res.status(200).send({ "status": 0, "data": err_delete })
  })
})

const deleteOrder = ( reqBody ) => {
  return new Promise( ( resolve, reject ) => {
    if ( reqBody.id ) {

      Order.findByIdAndDelete( reqBody.id, ( err, doc ) => {
        if ( err ) {
          console.log("Err in deleting order")
          reject("Err in deleting order")
        } else {
          console.log("Order deleted")
          resolve("Order deleted")
        }
      })

    } else {
      console.log("Err in params")
      reject("Err in params")
    }
  })
}

app.get("/checkCapacity/:date/:distributor", ( req, res ) => {
  checkCapacity( req.params ).then( resp_capacity => {
    res.status(200).send({ "status": 1, "msg": "success", "data": resp_capacity })
  }).catch( err_capacity => {
    res.status(200).send({ "status": 0, "data": err_capacity })
  })
})

const checkCapacity = ( reqBody ) => {
  return new Promise( ( resolve, reject ) => {
    if ( reqBody.date ) {
      let reqDate = new Date( reqBody.date )
      Distributor.findById( reqBody.distributor, ( err, distributorInfo ) => {
        if ( err ) {
          console.log("Err in finding distributor")
          reject("Err in finding distributor")
        } else if ( distributorInfo ) {
          let nextDate = reqDate.toString()
          nextDate = new Date( nextDate)
          nextDate.setDate(nextDate.getDate()+1)
          Order.find( {"createdAt":{ $gte: reqDate, $lt: nextDate} }, ( err, docs ) => {
            if ( err ) {
              console.log("Err in getting order details for the date")
              reject("Err in getting order details for the date")
            } else if ( docs ) {
              let totalOrdered = 0
              docs.map( orderObj => {
                totalOrdered += orderObj.milkQuantity
              })
              let remainingMilk =  distributorInfo.distributorMaxLimit - totalOrdered
              resolve(remainingMilk)
            }
          })
        } else {
          console.log("Max limit is undefined as there is no distributor")
          reject("Max limit is undefined as there is no distributor")
        }
      })
    } else {
      console.log("Please provide the date")
      reject("Please provide the date")
    }
  })
}


module.exports = {
  orderManagement: app,
}
