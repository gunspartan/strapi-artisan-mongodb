const { parseMultipartData, sanitizeEntity } = require("strapi-utils");
("use strict");
/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  /**
   * Create a record.
   *
   * @return {Object}
   */
  async create(ctx) {
    let entity;
    if (ctx.is("multipart")) {
      const { data, files } = parseMultipartData(ctx);
      entity = await strapi.services.inquiries.create(data, { files });
    } else {
      entity = await strapi.services.inquiries.create(ctx.request.body);
    }
    entity = sanitizeEntity(entity, { model: strapi.models.inquiries });
    await strapi.plugins["email"].services.email.send({
      to: "gunhwang99@gmail.com",
      from: "gunhwang99@gmail.com",
      replyTo: "gunhwang99@gmail.com",
      subject: `Inquiry ID: #${entity.id}`,
      text: `
      Inquiry ID: #${entity.id}
      Name: ${entity.userName}
      Emai: ${entity.userEmail}
      Project Description: ${entity.projectDesc}
      Budget: ${entity.budget}
      Timeline: ${entity.timeline}
      Services Required: ${entity.serviceType}
      `,
    });
    ctx.send("Email Sent");
    return entity;
  },
};
