const config = require("../../config/database");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.development.database,
  config.development.username,
  config.development.password,
  {
    host: config.development.host,
    dialect: config.development.dialect,
    operatorsAliases: false,

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

db.user = require("./user.model.js")(sequelize, Sequelize);
db.role = require("./role.model.js")(sequelize, Sequelize);
db.refreshToken = require("./refreshToken.model.js")(sequelize, Sequelize);
db.background = require("./background.model.js")(sequelize, Sequelize);
db.digitalEnvelope = require("./digitalEnvelope.model.js")(
  sequelize,
  Sequelize
);
db.faq = require("./faq.model.js")(sequelize, Sequelize);
db.faqList = require("./faqList.model.js")(sequelize, Sequelize);
db.fitur = require("./fitur.model.js")(sequelize, Sequelize);
db.fiturList = require("./fiturList.model.js")(sequelize, Sequelize);
db.invitation = require("./invitation.model.js")(sequelize, Sequelize);
db.invitationType = require("./invitationType.model.js")(sequelize, Sequelize);
db.keunggulan = require("./keunggulan.model.js")(sequelize, Sequelize);
db.keunggulanList = require("./keunggulanList.model.js")(sequelize, Sequelize);
db.loveStory = require("./loveStory.model.js")(sequelize, Sequelize);
db.mainLanding = require("./mainLanding.model.js")(sequelize, Sequelize);
db.mainLandingList = require("./mainLandingList.model.js")(
  sequelize,
  Sequelize
);
db.message = require("./message.model.js")(sequelize, Sequelize);
db.mySocialMedia = require("./mySocialMedia.model.js")(sequelize, Sequelize);
db.orderStep = require("./orderStep.model.js")(sequelize, Sequelize);
db.orderStepList = require("./orderStepList.model.js")(sequelize, Sequelize);
db.photoGallery = require("./photoGallery.model.js")(sequelize, Sequelize);
db.price = require("./price.model.js")(sequelize, Sequelize);
db.priceList = require("./priceList.model.js")(sequelize, Sequelize);
db.priceListUrl = require("./priceListUrl.model.js")(sequelize, Sequelize);
db.prokes = require("./prokes.model.js")(sequelize, Sequelize);
db.prokesList = require("./prokesList.model.js")(sequelize, Sequelize);
db.reservasiKehadiran = require("./reservasiKehadiran.model.js")(
  sequelize,
  Sequelize
);
db.socialMedia = require("./socialMedia.model.js")(sequelize, Sequelize);
db.testimonial = require("./testimonial.model.js")(sequelize, Sequelize);
db.theme = require("./myTheme.model.js")(sequelize, Sequelize);
db.themeList = require("./myThemeList.model.js")(sequelize, Sequelize);
db.youtube = require("./youtube.model.js")(sequelize, Sequelize);

db.invitation.hasMany(db.invitationType, {
  foreignKey: "invitationId",
  constraints: false,
});

db.invitationType.belongsTo(db.invitation, {
  foreignKey: "invitationId",
  targetKey: "id",
  constraints: false,
});
db.invitation.hasMany(db.youtube, {
  foreignKey: "invitationId",
  constraints: false,
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
db.invitation.hasMany(db.reservasiKehadiran, {
  foreignKey: "invitationId",
  constraints: false,
});

db.reservasiKehadiran.belongsTo(db.invitation, {
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
db.theme.hasMany(db.themeList, {
  foreignKey: "themeId",
  constraints: false,
});

db.themeList.belongsTo(db.theme, {
  foreignKey: "themeId",
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

db.keunggulan.hasMany(db.keunggulanList, {
  foreignKey: "keunggulanId",
  constraints: false,
});

db.keunggulanList.belongsTo(db.keunggulan, {
  foreignKey: "keunggulanId",
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

db.refreshToken.belongsTo(db.user, {
  foreignKey: "userId",
  targetKey: "id",
});
db.user.hasOne(db.refreshToken, {
  foreignKey: "userId",
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

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;
