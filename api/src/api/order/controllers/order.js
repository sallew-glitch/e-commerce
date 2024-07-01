"use strict";
// @ts-ignore
const stripe = require("stripe")(process.env.STRIPE_KEY);

/**
 * order controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::order.order", ({ strapi }) => ({
  async create(ctx) {
    console.log("test");

    const productsWrapper = ctx.request.body;

    const products = productsWrapper.products;

    console.log(products);

    console.log("products ", products);

    const lineItems = await Promise.all(
      products.map(async (product) => {
        const item = await strapi
          .service("api::product.product")
          .findOne(product.id);

        console.log("item ", item);

        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: item.title,
            },
            unit_amount: Math.round(item.price * 100),
          },
          quantity: product.quantity,
        };
      })
    );

    try {
      console.log("test 2");
      const session = await stripe.checkout.sessions.create({
        line_items: lineItems,
        mode: "payment",
        success_url: `${process.env.CLIENT_URL}?success=true`,
        cancel_url: `${process.env.CLIENT_URL}?sucess=false`,
        payment_method_types: ["card"],
      });

      console.log("session made");

      await strapi.service("api::order.order").create({
        data: {
          products,
          stripeId: session.id,
        },
      });

      console.log("service done");

      return { stripeSession: session };
    } catch (err) {
      ctx.response.status = 500;
      return err;
    }
  },
}));
