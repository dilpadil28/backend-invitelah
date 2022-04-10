const db = require("../db/models");
const Invitation = db.invitation;
const Op = db.Sequelize.Op;
const fs = require("fs");
// Create and Save a new Invitation
exports.create = (req, res) => {
  // Save Invitation in the database
  let invitation = {
    slug: req.body.slug,
    namaPria: req.body.namaPria,
    namaPendekPria: req.body.namaPendekPria,
    namaOrangTuaPria: req.body.namaOrangTuaPria,
    namaWanita: req.body.namaWanita,
    namaPendekWanita: req.body.namaPendekWanita,
    namaOrangTuaWanita: req.body.namaOrangTuaWanita,
    avatar: req.file === undefined ? "" : req.file.filename,
    alamatKado: req.body.alamatKado,
    tanggalNikah: req.body.tanggalNikah,
    jamNikah: req.body.jamNikah,
    alamatNikah: req.body.alamatNikah,
    mapsNikah: req.body.mapsNikah,
    tanggalResepsi: req.body.tanggalResepsi,
    jamResepsi: req.body.jamResepsi,
    alamatResepsi: req.body.alamatResepsi,
    mapsResepsi: req.body.mapsResepsi,
    bissmillah: req.body.bissmillah,
    salamPembuka: req.body.salamPembuka,
    salamPembukaDeskripsi: req.body.salamPembukaDeskripsi,
    salamPenutup: req.body.salamPenutup,
    salamPenutupDeskripsi: req.body.salamPenutupDeskripsi,
    doa: req.body.doa,
    turutMengundang: req.body.turutMengundang,
    privateLink: (Math.random() + 1).toString(36).substring(7),
  };
  Invitation.create(invitation)
    .then((data) => {
      data.setInvitationTypes([1]).then(() => {
        res.status(201).json({
          message: "success",
          data: data,
        });
      })
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Invitation.",
      });
    });
};

// Retrieve all Invitations from the database.
exports.findAll = (req, res) => {
  const slug = req.query.slug;
  var condition = slug ? { slug: { [Op.like]: `%${slug}%` } } : null;

  Invitation.findAll({
    where: condition,
    order: [["id", "DESC"]],
    attributes: { exclude: ["createdAt", "updatedAt"] },
  })
    .then((data) => {
      res.status(200).json({
        message: "success",
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving invitation.",
      });
    });
};

// Find a single Invitation with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Invitation.findOne({
    where: { id: id },
    attributes: { exclude: ["createdAt", "updatedAt"] },
  })
    .then((data) => {
      if (data) {
        res.status(200).send({
          message: "success",
          data: data,
        });
      } else {
        res.status(404).send({
          message: `Cannot find Invitation with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Invitation with id=" + id,
      });
    });
};
exports.findBySlug = (req, res) => {
  const slug = req.params.slug;

  Invitation.findOne({
    where: { slug: slug },
    include: [
      {
        model: db.background,
        // where: { published: true },
        attributes: { exclude: ["createdAt", "updatedAt"] },
      },
      {
        model: db.digitalEnvelope,
        // where: { published: true },
        attributes: { exclude: ["createdAt", "updatedAt"] },
      },
      {
        model: db.loveStory,
        // where: { published: true },
        attributes: { exclude: ["createdAt", "updatedAt"] },
      },
      {
        model: db.message,
        attributes: { exclude: ["createdAt", "updatedAt"] },
      },
      {
        model: db.photoGallery,
        // where: { published: true },
        attributes: { exclude: ["createdAt", "updatedAt"] },
      },
      {
        model: db.presence,
        // where: { published: true },
        attributes: { exclude: ["createdAt", "updatedAt"] },
      },
      {
        model: db.socialMedia,
        attributes: { exclude: ["createdAt", "updatedAt"] },
      },
      {
        model: db.theme,
        attributes: { exclude: ["createdAt", "updatedAt"] },
      },
      {
        model: db.youtube,
        // where: { published: true },
        attributes: { exclude: ["createdAt", "updatedAt"] },
      },
      {
        model: db.user,
        attributes: ["id", "username", "fullName", "phoneNumber", "email"],
      },
    ],
    attributes: { exclude: ["createdAt", "updatedAt"] },
  })
    .then((data) => {
      if (data) {
        res.status(200).send({
          message: "success",
          data: data,
        });
      } else {
        res.status(404).send({
          message: `Cannot find Invitation with slug=${slug}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Invitation with slug=" + slug,
      });
    });
};

// Update a Invitation by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Invitation.findOne({
    where: { id: id },
    attributes: { exclude: ["createdAt", "updatedAt"] },
  })
    .then((data) => {
      if (req.file !== undefined && data.avatar !== "") {
        fs.unlink("./upload/images/" + data.avatar, (err) => {
          if (err) throw err;
        });
      }
      data
        .update({
          slug: req.body.slug,
          namaPria: req.body.namaPria,
          namaPendekPria: req.body.namaPendekPria,
          namaOrangTuaPria: req.body.namaOrangTuaPria,
          namaWanita: req.body.namaWanita,
          namaPendekWanita: req.body.namaPendekWanita,
          namaOrangTuaWanita: req.body.namaOrangTuaWanita,
          avatar: req.file === undefined ? data.avatar : req.file.filename,
          alamatKado: req.body.alamatKado,
          tanggalNikah: req.body.tanggalNikah,
          jamNikah: req.body.jamNikah,
          alamatNikah: req.body.alamatNikah,
          mapsNikah: req.body.mapsNikah,
          tanggalResepsi: req.body.tanggalResepsi,
          jamResepsi: req.body.jamResepsi,
          alamatResepsi: req.body.alamatResepsi,
          mapsResepsi: req.body.mapsResepsi,
          bissmillah: req.body.bissmillah,
          salamPembuka: req.body.salamPembuka,
          salamPembukaDeskripsi: req.body.salamPembukaDeskripsi,
          salamPenutup: req.body.salamPenutup,
          salamPenutupDeskripsi: req.body.salamPenutupDeskripsi,
          doa: req.body.doa,
          turutMengundang: req.body.turutMengundang,
        })
        .then(() => {
          res.status(200).send({
            message: "success",
            data: data,
          });
        })
        .catch((err) => {
          res.status(500).send({
            message: "Error updating Testimonial with id=" + id,
          });
        });
    })
    .catch((err) => {
      console.log('err', err)
      res.send({
        message: `Cannot update Invitation with id=${id}. Maybe Invitation was not found or req.body is empty!`,
      });
    });
};

// Delete a Invitation with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Invitation.findOne({
    where: { id: id },
    attributes: { exclude: ["createdAt", "updatedAt"] },
  })
    .then((data) => {

      data
        .destroy()
        .then(() => {
          res.status(200).send({
            message: "success",
            data: data,
          });
        })
        .catch((err) => {
          res.status(500).send({
            message: `Cannot delete Invitation with id=${id}. Maybe Invitation was not found!`,
          });
        });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Invitation with id=" + id,
      });
    });
};

// Delete all Invitations from the database.
exports.deleteAll = (req, res) => {
  Invitation.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({
        message: `${nums} Invitations were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all.invitation.",
      });
    });
};
