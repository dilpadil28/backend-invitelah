const db = require("../models");
const Invitation = db.invitation;
const Op = db.Sequelize.Op;

// Create and Save a new Invitation
exports.create = (req, res) => {
  // Create a Invitation
  const invitation = {
    slug: req.body.slug,
    namaPria: req.body.namaPria,
    namaPendekPria: req.body.namaPendekPria,
    namaOrangTuaPria: req.body.namaOrangTuaPria,
    namaWanita: req.body.namaWanita,
    namaPendekWanita: req.body.namaPendekWanita,
    namaOrangTuaWanita: req.body.namaOrangTuaWanita,
    avatar: req.body.avatar,
    alamatKado: req.body.alamatKado,
    tanggalNikah: req.body.tanggalNikah,
    jamNikah: req.body.jamNikah,
    alamatNikah: req.body.alamatNikah,
    mapsNikah: req.body.mapsNikah,
    tanggalResepsi: req.body.tanggalResepsi,
    jamResepsi: req.body.jamResepsi,
    alamatResepsi: req.body.alamatResepsi,
    mapsResepsi: req.body.mapsResepsi,
    namaTema: req.body.namaTema,
    bissmillah: req.body.bissmillah,
    salamPembuka: req.body.salamPembuka,
    salamPembukaDeskripsi: req.body.salamPembukaDeskripsi,
    salamPenutup: req.body.salamPenutup,
    salamPenutupDeskripsi: req.body.salamPenutupDeskripsi,
    doa: req.body.doa,
    tipeGaleri: req.body.tipeGaleri,
    backgroundModal: req.body.backgroundModal,
    turutMengundang: req.body.turutMengundang,
  };

  // Save Invitation in the database
  Invitation.create(invitation)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Invitation.",
      });
    });
};

// Retrieve all Backgrounds from the database.
exports.findAll = (req, res) => {
  const slug = req.query.slug;
  var condition = slug ? { slug: { [Op.like]: `%${slug}%` } } : null;

  Invitation.findAll({ where: condition })
    .then((data) => {
      res.send(data);
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

  Invitation.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
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

// Update a Invitation by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Invitation.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Invitation was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Invitation with id=${id}. Maybe Invitation was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Invitation with id=" + id,
      });
    });
};

// Delete a Invitation with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Invitation.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Invitation was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Invitation with id=${id}. Maybe Invitation was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Invitation with id=" + id,
      });
    });
};

// Delete all Backgrounds from the database.
exports.deleteAll = (req, res) => {
  Invitation.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Backgrounds were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all.invitation.",
      });
    });
};

// find all published Invitation
exports.findAllPublished = (req, res) => {
  Invitation.findAll({ where: { published: true } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving.invitation.",
      });
    });
};
