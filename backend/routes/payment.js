const express = require("express")
const app = express()
const stripe = require("stripe")("sk_test_51NG5A8DKLQI0c41jkT8Irv0G9UCPVgsjLciLrWhpsLftpotFWnnGwJwh42NQ794ZMORzJYnQAhEp38KqocBhogk100wuMYtNwe")
//was process.env.STRIPE_SECRET_KEY, but was giving errors
const bodyParser = require("body-parser")
const cors = require("cors")
var router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(cors())

router.post("/", async (req, res) => {
	let { amount, id } = req.body
	try {
		const payment = await stripe.paymentIntents.create({
			amount,
			currency: "USD",
			description: "ecommerce company",
			payment_method: id,
			confirm: true
		})
		console.log("Payment", payment)
		res.json({
			message: "Payment successful",
			success: true
		})
	} catch (error) {
		console.log("Error", error)
		res.json({
			message: "Payment failed",
			success: false
		})
	}
})

// app.listen(process.env.PORT, () => {
// 	console.log("Sever is listening on port 9000")
// })

module.exports = router;
