const config = require("../../config/database");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.development.database,
  config.development.username,
  config.development.password,
  {
    host: config.development.host,
    dialect: config.development.dialect,
    operatorsAliases: 0,

    pool: {
      max: config.development.pool.max,
      min: config.development.pool.min,
      acquire: config.development.pool.acquire,
      idle: config.development.pool.idle,
    },
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user.js")(sequelize, Sequelize);
db.role = require("./role.js")(sequelize, Sequelize);
db.refreshToken = require("./refreshToken.js")(sequelize, Sequelize);
db.background = require("./background.js")(sequelize, Sequelize);
db.digitalEnvelope = require("./digitalenvelope.js")(sequelize, Sequelize);
db.faq = require("./faq.js")(sequelize, Sequelize);
db.faqList = require("./faqlist.js")(sequelize, Sequelize);
db.fitur = require("./fitur.js")(sequelize, Sequelize);
db.fiturList = require("./fiturlist.js")(sequelize, Sequelize);
db.invitation = require("./invitation.js")(sequelize, Sequelize);
db.invitationType = require("./invitationtype.js")(sequelize, Sequelize);
db.logActivity = require("./logactivity.js")(sequelize, Sequelize);
db.superiority = require("./superiority.js")(sequelize, Sequelize);
db.superiorityList = require("./superioritylist.js")(sequelize, Sequelize);
db.loveStory = require("./loveStory.js")(sequelize, Sequelize);
db.mainLanding = require("./mainlanding.js")(sequelize, Sequelize);
db.mainLandingList = require("./mainlandinglist.js")(sequelize, Sequelize);
db.message = require("./message.js")(sequelize, Sequelize);
db.mySocialMedia = require("./mysocialmedia.js")(sequelize, Sequelize);
db.orderStep = require("./orderstep.js")(sequelize, Sequelize);
db.orderStepList = require("./ordersteplist.js")(sequelize, Sequelize);
db.photoGallery = require("./photogallery.js")(sequelize, Sequelize);
db.price = require("./price.js")(sequelize, Sequelize);
db.priceList = require("./pricelist.js")(sequelize, Sequelize);
db.priceListUrl = require("./pricelisturl.js")(sequelize, Sequelize);
db.prokes = require("./prokes.js")(sequelize, Sequelize);
db.prokesList = require("./prokeslist.js")(sequelize, Sequelize);
db.presence = require("./presence.js")(sequelize, Sequelize);
db.socialMedia = require("./socialMedia.js")(sequelize, Sequelize);
db.testimonial = require("./testimonial.js")(sequelize, Sequelize);
db.theme = require("./theme.js")(sequelize, Sequelize);
db.myTheme = require("./myTheme.js")(sequelize, Sequelize);
db.myThemeList = require("./myThemelist.js")(sequelize, Sequelize);
db.music = require("./music.js")(sequelize, Sequelize);
db.youtube = require("./youtube.js")(sequelize, Sequelize);
db.coupon = require("./coupon.js")(sequelize, Sequelize);
db.invoice = require("./invoice.js")(sequelize, Sequelize);
db.payment = require("./payment.js")(sequelize, Sequelize);
db.status = require("./status.js")(sequelize, Sequelize);
db.transaction = require("./transaction.js")(sequelize, Sequelize);

db.status.belongsTo(db.invitation, {
  foreignKey: "invitationId",
  targetKey: "id",
});
db.invitation.hasOne(db.status, {
  foreignKey: "invitationId",
  targetKey: "id",
});
db.transaction.belongsTo(db.invitation, {
  foreignKey: "invitationId",
  targetKey: "id",
});
db.invitation.hasOne(db.transaction, {
  foreignKey: "invitationId",
  targetKey: "id",
});
db.payment.belongsTo(db.transaction, {
  foreignKey: "transactionId",
  targetKey: "id",
});
db.transaction.hasOne(db.payment, {
  foreignKey: "transactionId",
  targetKey: "id",
});
db.coupon.belongsTo(db.transaction, {
  foreignKey: "transactionId",
  targetKey: "id",
});
db.transaction.hasOne(db.coupon, {
  foreignKey: "transactionId",
  targetKey: "id",
});
db.transaction.belongsTo(db.invoice, {
  foreignKey: "invoiceId",
  targetKey: "id",
});
db.invoice.hasOne(db.transaction, {
  foreignKey: "invoiceId",
  targetKey: "id",
});

db.invitation.hasMany(db.youtube, {
  foreignKey: "invitationId",
  constraints: false,
});

db.priceList.belongsTo(db.invitation, {
  foreignKey: "invitationId",
  targetKey: "id",
});
db.invitation.hasOne(db.priceList, {
  foreignKey: "invitationId",
  targetKey: "id",
});

db.youtube.belongsTo(db.invitation, {
  foreignKey: "invitationId",
  targetKey: "id",
  constraints: false,
});
db.invitation.hasMany(db.socialMedia, {
  foreignKey: "invitationId",
  constraints: false,
});

db.socialMedia.belongsTo(db.invitation, {
  foreignKey: "invitationId",
  targetKey: "id",
  constraints: false,
});
db.invitation.hasMany(db.presence, {
  foreignKey: "invitationId",
  constraints: false,
});

db.presence.belongsTo(db.invitation, {
  foreignKey: "invitationId",
  targetKey: "id",
  constraints: false,
});
db.invitation.hasMany(db.photoGallery, {
  foreignKey: "invitationId",
  constraints: false,
});

db.photoGallery.belongsTo(db.invitation, {
  foreignKey: "invitationId",
  targetKey: "id",
  constraints: false,
});
db.invitation.hasMany(db.loveStory, {
  foreignKey: "invitationId",
  constraints: false,
});

db.loveStory.belongsTo(db.invitation, {
  foreignKey: "invitationId",
  targetKey: "id",
  constraints: false,
});
db.invitation.hasMany(db.digitalEnvelope, {
  foreignKey: "invitationId",
  constraints: false,
});

db.digitalEnvelope.belongsTo(db.invitation, {
  foreignKey: "invitationId",
  targetKey: "id",
  constraints: false,
});
db.invitation.hasMany(db.background, {
  foreignKey: "invitationId",
  constraints: false,
});

db.background.belongsTo(db.invitation, {
  foreignKey: "invitationId",
  targetKey: "id",
  constraints: false,
});
db.invitation.hasMany(db.background, {
  foreignKey: "invitationId",
  constraints: false,
});

db.background.belongsTo(db.invitation, {
  foreignKey: "invitationId",
  targetKey: "id",
  constraints: false,
});
db.myTheme.hasMany(db.myThemeList, {
  foreignKey: "myThemeId",
  constraints: false,
});

db.myThemeList.belongsTo(db.myTheme, {
  foreignKey: "myThemeId",
  targetKey: "id",
  constraints: false,
});

db.prokes.hasMany(db.prokesList, {
  foreignKey: "prokesId",
  constraints: false,
});

db.prokesList.belongsTo(db.prokes, {
  foreignKey: "prokesId",
  targetKey: "id",
  constraints: false,
});

db.price.hasMany(db.priceList, {
  foreignKey: "priceId",
  constraints: false,
});

db.priceList.belongsTo(db.price, {
  foreignKey: "priceId",
  targetKey: "id",
  constraints: false,
});
db.priceList.hasMany(db.priceListUrl, {
  foreignKey: "priceListId",
  constraints: false,
});

db.priceList.belongsTo(db.priceList, {
  foreignKey: "priceListId",
  targetKey: "id",
  constraints: false,
});

db.orderStep.hasMany(db.orderStepList, {
  foreignKey: "orderStepId",
  constraints: false,
});

db.orderStepList.belongsTo(db.orderStep, {
  foreignKey: "orderStepId",
  targetKey: "id",
  constraints: false,
});

db.mainLanding.hasMany(db.mainLandingList, {
  foreignKey: "mainLandingId",
  constraints: false,
});

db.mainLandingList.belongsTo(db.mainLanding, {
  foreignKey: "mainLandingId",
  targetKey: "id",
  constraints: false,
});

db.superiority.hasMany(db.superiorityList, {
  foreignKey: "superiorityId",
  constraints: false,
});

db.superiorityList.belongsTo(db.superiority, {
  foreignKey: "superiorityId",
  targetKey: "id",
  constraints: false,
});
db.fitur.hasMany(db.fiturList, {
  foreignKey: "fiturId",
  constraints: false,
});

db.fiturList.belongsTo(db.fitur, {
  foreignKey: "fiturId",
  targetKey: "id",
  constraints: false,
});

db.faq.hasMany(db.faqList, {
  foreignKey: "faqId",
  constraints: false,
});
db.faqList.belongsTo(db.faq, {
  foreignKey: "faqId",
  targetKey: "id",
  constraints: false,
});

db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId",
});

db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId",
});

db.invitation.belongsToMany(db.invitationType, {
  through: "invitation_invitationtype",
  foreignKey: "invitationId",
  otherKey: "invitationTypeId",
});

db.invitationType.belongsToMany(db.invitation, {
  through: "invitation_invitationtype",
  foreignKey: "invitationTypeId",
  otherKey: "invitationId",
});

db.refreshToken.belongsTo(db.user, {
  foreignKey: "userId",
  targetKey: "id",
});
db.user.hasOne(db.refreshToken, {
  foreignKey: "userId",
  targetKey: "id",
});

db.theme.belongsTo(db.invitation, {
  foreignKey: "invitationId",
  targetKey: "id",
});
db.invitation.hasOne(db.theme, {
  foreignKey: "invitationId",
  targetKey: "id",
});

db.theme.belongsTo(db.music, {
  foreignKey: "musicId",
  targetKey: "id",
});
db.music.hasOne(db.theme, {
  foreignKey: "musicId",
  targetKey: "id",
});

db.user.hasMany(db.invitation, {
  foreignKey: "userId",
  targetKey: "id",
});
db.invitation.belongsTo(db.user, {
  foreignKey: "userId",
  targetKey: "id",
});
db.user.hasMany(db.logActivity, {
  foreignKey: "userId",
  targetKey: "id",
});
db.logActivity.belongsTo(db.user, {
  foreignKey: "userId",
  targetKey: "id",
});

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;
